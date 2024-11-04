# Scrape Google Scholar to find heterogeneous speakers for a scientific discipline
# Note: outputs may contain errors, always double check
# @authors: Jean Fan, Claude.ai
# @date: Nov 1, 2024

########################### Main functions
# Install packages if needed
library(rvest)
library(dplyr)
library(predictrace) # Kaplan, J (2023). predictrace: Predict the Race and Gender of a Given Name Using Census and Social Security Administration Data. Version 2.0.1. URL: https://github.com/jacobkap/predictrace, https://jacobkap.github.io/predictrace/.

# Function to scrape Google Scholar authors
scrape_google_scholar <- function(label, max_pages = 10) {
  
  # clean up input
  label = gsub(' ', '_', label)
  
  base_url <- "https://scholar.google.com/citations"
  results <- data.frame()
  next_token <- ""
  page <- 1
  
  while(page <= max_pages) {
    # Construct URL with proper pagination
    if(next_token == "") {
      url <- sprintf(
        "%s?view_op=search_authors&hl=en&mauthors=label:%s",
        base_url,
        label
      )
    } else {
      url <- sprintf(
        "%s?view_op=search_authors&hl=en&mauthors=label:%s&after_author=%s&astart=%d",
        base_url,
        label,
        next_token,
        (page - 1) * 10
      )
    }
    
    # Add delay; please don't ban me Google
    Sys.sleep(3)
    
    tryCatch({
      # Read the page
      page_html <- read_html(url)
      
      # Extract author names
      names <- page_html %>%
        html_nodes(".gs_ai_name a") %>%
        html_text()
      
      # Extract institutions
      institutions <- page_html %>%
        html_nodes(".gs_ai_aff") %>%
        html_text()
      
      # Extract citation counts
      citations <- page_html %>%
        html_nodes(".gs_ai_cby") %>%
        html_text() %>%
        gsub("Cited by ", "", .) %>%
        as.numeric()
      
      # Extract author IDs for pagination
      author_links <- page_html %>%
        html_nodes(".gs_ai_name a") %>%
        html_attr("href")
      
      # Extract next page token
      next_button <- page_html %>%
        html_nodes(".gs_btnPR") %>%
        html_attr("onclick")
      
      if(length(next_button) > 0) {
        # Extract the after_author parameter from the encoded URL string
        # First decode the URL-encoded string
        decoded_url <- gsub("\\\\x26", "&", gsub("\\\\x3d", "=", next_button))
        # Then extract the after_author parameter
        next_token <- regmatches(
          decoded_url,
          regexpr("after_author=[^&]*", decoded_url)
        )
        next_token <- gsub("after_author=", "", next_token)
      } else {
        # No next button found, we've reached the end
        next_token <- NULL
      }
      
      # Create temporary dataframe for this page
      page_df <- data.frame(
        Author = names,
        Institution = institutions,
        Citations = citations,
        AuthorID = gsub("/citations\\?.*user=(.*)&.*", "\\1", author_links),
        stringsAsFactors = FALSE
      )
      
      # Append to results
      results <- rbind(results, page_df)
      
      # Break if no next token or no results on current page
      if(is.null(next_token) || length(names) == 0) {
        message(sprintf("Reached end of results at page %d", page))
        break
      }
      
      page <- page + 1
      
    }, error = function(e) {
      message(sprintf("Error on page %d: %s", page, e$message))
      return(NULL)
    })
  }
  
  return(results)
}

# Function to parse names into first and last name components
parse_names <- function(names) {
  # Remove titles and degrees
  names <- gsub("MD|PhD|Dr\\.|Prof\\.", "", names)
  names <- trimws(names)  # Remove extra whitespace
  
  # Initialize vectors
  firstname <- character(length(names))
  lastname <- character(length(names))
  
  for (i in seq_along(names)) {
    # Split name into parts
    parts <- strsplit(names[i], "\\s+")[[1]]
    
    if (length(parts) == 1) {
      # Single name
      firstname[i] <- parts[1]
      lastname[i] <- NA
    } else if (length(parts) == 2) {
      # Standard "First Last" format
      firstname[i] <- parts[1]
      lastname[i] <- parts[2]
    } else if (length(parts) == 3) {
      # Handle cases like "First Middle Last" or "First B Last"
      if (nchar(parts[2]) == 1 || grepl("^[A-Z]\\.$", parts[2])) {
        # If middle part is initial
        firstname[i] <- parts[1]
        lastname[i] <- parts[3]
      } else if (grepl("^[A-Z][a-z]+$", parts[1]) && grepl("^[A-Z][a-z]+$", parts[2])) {
        # If first two parts look like a double first name
        firstname[i] <- paste(parts[1], parts[2])
        lastname[i] <- parts[3]
      } else {
        # Default to first part as first name, rest as last name
        firstname[i] <- parts[1]
        lastname[i] <- paste(parts[2:length(parts)], collapse = " ")
      }
    } else {
      # For longer names, take first part as first name and rest as last name
      firstname[i] <- parts[1]
      lastname[i] <- paste(parts[2:length(parts)], collapse = " ")
    }
  }
  
  return(list(firstname = firstname, lastname = lastname))
}

# Function to calculate entropy of a categorical vector
calculate_entropy <- function(x) {
  # Get probability distribution
  prob_dist <- table(x) / length(x)
  # Calculate entropy: -sum(p * log(p))
  -sum(prob_dist * log(prob_dist))
}

# Function to calculate combined entropy for multiple categorical variables
calculate_combined_entropy <- function(df, columns) {
  # Sum the entropy of each column
  sum(sapply(df[columns], calculate_entropy))
}

# Function to find diverse subset using entropy
find_diverse_subset <- function(df, feature_cols, subset_size, max_iterations = 1000) {
  n <- nrow(df)
  best_entropy <- -Inf
  best_subset <- NULL
  
  # Run multiple iterations with random starting points
  for(i in 1:max_iterations) {
    # Start with random subset
    current_indices <- sample(1:n, subset_size)
    current_subset <- df[current_indices, ]
    current_entropy <- calculate_combined_entropy(current_subset, feature_cols)
    
    # Try to improve the subset
    improved <- TRUE
    while(improved) {
      improved <- FALSE
      
      # For each item in the subset
      for(j in 1:subset_size) {
        # Try replacing it with each item not in the subset
        other_indices <- setdiff(1:n, current_indices)
        for(new_idx in other_indices) {
          # Create temporary subset with the replacement
          temp_indices <- current_indices
          temp_indices[j] <- new_idx
          temp_subset <- df[temp_indices, ]
          temp_entropy <- calculate_combined_entropy(temp_subset, feature_cols)
          
          # If this improves entropy, keep the change
          if(temp_entropy > current_entropy) {
            current_indices <- temp_indices
            current_entropy <- temp_entropy
            improved <- TRUE
            break
          }
        }
        if(improved) break
      }
    }
    
    # Update best result if this iteration found a better solution
    if(current_entropy > best_entropy) {
      best_entropy <- current_entropy
      best_subset <- current_indices
    }
  }
  
  return(list(
    subset = df[best_subset, ],
    indices = best_subset,
    entropy = best_entropy
  ))
}

########################### Example usage
label <- "computational biology"
authors_data <- scrape_google_scholar(label, max_pages = 10) # change max_pages as needed
# Parse names
names <- parse_names(authors_data$Author)
# Predict race
gender <- predict_gender(names$firstname)
race <- predict_race(names$lastname, surname = TRUE)
table(gender$likely_gender)
table(race$likely_race)
# Combine results
results <- cbind(authors_data, gender = gender$likely_gender, race = race$likely_race)
# Note there are quite a few mistakes, especially with respect to race inferences 
# but also just people moving and not updating their Google Scholars

# For reproducibility
set.seed(1)  
# Find diverse subset
final <- find_diverse_subset(
  df = results,
  feature_cols = c("Institution", "gender", "race"), # change as needed
  subset_size = 10 # change as needed
)
# Print results
print(final$subset)
print(paste("Combined entropy:", round(final$entropy, 3)))
