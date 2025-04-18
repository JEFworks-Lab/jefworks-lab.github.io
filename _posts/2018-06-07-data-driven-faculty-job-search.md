---
layout: post
comments: false
tags: [visualization, javascript, career, grants]
---

<script src="https://code.highcharts.com/highcharts.js"></script>

For many post-docs, the next step will be to apply to a faculty position. But which schools should we look into? Let's take a data-driven approach to our job search!

Let's say I am looking for a faculty position in the United States. I am primarily interested in doing research and writing grants to get funding to do this research. One data-driven approach to help narrow down the list of schools I may consider is to look for institutions that have been successful in getting grants. 

Luckily, the [NIH has an excellent database](https://federalreporter.nih.gov/) of all the federally funded grants in the past decade! They even have an API! But the data is actually small enough that I just downloaded everything within a few minutes. So let's read it in and start parsing! 

# Read in the last 10 years of US federal grant data from Federal RePORTER

Download the data here: [https://federalreporter.nih.gov/FileDownload](https://federalreporter.nih.gov/FileDownload)

```{r}
data <- rbind(
	read.csv('FedRePORTER_PRJ_C_FY2017.csv.gz', stringsAsFactors = FALSE),
	read.csv('FedRePORTER_PRJ_C_FY2016.csv.gz', stringsAsFactors = FALSE),
	read.csv('FedRePORTER_PRJ_C_FY2015.csv.gz', stringsAsFactors = FALSE),
	read.csv('FedRePORTER_PRJ_C_FY2014.csv.gz', stringsAsFactors = FALSE),
	read.csv('FedRePORTER_PRJ_C_FY2013.csv.gz', stringsAsFactors = FALSE),
	read.csv('FedRePORTER_PRJ_C_FY2012.csv.gz', stringsAsFactors = FALSE),
	read.csv('FedRePORTER_PRJ_C_FY2010.csv.gz', stringsAsFactors = FALSE),
	read.csv('FedRePORTER_PRJ_C_FY2009.csv.gz', stringsAsFactors = FALSE),
	read.csv('FedRePORTER_PRJ_C_FY2008.csv.gz', stringsAsFactors = FALSE)
)
```

Of course, there are some know issues with this data in terms of consistency of organization names, lack of information from private foundation grants, yada yada. Certain institutions like Harvard vs. Harvard Medical vs. Brigham and Women's Hospital vs. Children's Hospital vs. MGH vs. Dana Farber etc are all broken up and therefore any statistics computed on an individual institution may not be an accurate reflection of the broader network's capacity to win grants. But it's what we have. So we will work with it.
				  
# Question 1: Do R1 institutions really get more grants than R2 and R3 institutions?

What institutions should you look into? Well, if you are interested in writing grants and doing research, most people will tell you: an R1 institution (R1 is a category that the Carnegie Classification of Institutions of Higher Education uses to indicate universities in the United States that engage in extensive research activity). But is it really true that R1 institutions do 'better' funding-wise than R2 institutions? Let's let the data speak for itself!

I got my list of institution names from Wikipedia: [https://en.wikipedia.org/wiki/List_of_research_universities_in_the_United_States](https://en.wikipedia.org/wiki/List_of_research_universities_in_the_United_States)

```{r}
R1uni.info <- read.csv('R1_Institutions.csv', stringsAsFactors = FALSE)
R1uni <- toupper(R1uni.info$Institution)
R2uni.info <- read.csv('R2_Institutions.csv', stringsAsFactors = FALSE)
R2uni <- toupper(R2uni.info$Institution)
R3uni.info <- read.csv('R3_Institutions.csv', stringsAsFactors = FALSE)
R3uni <- toupper(R3uni.info$Institution)
```

Note the Wiki institution names don't match up perfectly with the database organization names.

```{r}
# Clean up organization names (still some errors but this captures most of them)
data$ORGANIZATION_NAME <- gsub('THE ', '', data$ORGANIZATION_NAME)

numGrants <- table(data$ORGANIZATION_NAME)
```

We can use [`highcharter` to create interactive visualizations](https://jef.works/blog/2018/02/10/interactive-visualizations-with-highcharter/). 

```{r}
d1 <- sort(numGrants[R1uni], decreasing=TRUE)
df1 <- data.frame(
	'uni' = names(d1),
    'grants' = as.numeric(d1)
)
d2 <- sort(numGrants[R2uni], decreasing=TRUE)
df2 <- data.frame(
	'uni' = names(d2),
	'grants' = as.numeric(d2)
)
d3 <- sort(numGrants[R3uni], decreasing=TRUE)
df3 <- data.frame(
	'uni' = names(d3),
	'grants' = as.numeric(d3)
)
			
library(highcharter)
highchart() %>% 
	hc_add_series(df1, "column", hcaes(x = uni, y = grants), name='R1') %>%
	hc_add_series(df2, "column", hcaes(x = uni, y = grants), name='R2') %>%
	hc_add_series(df3, "column", hcaes(x = uni, y = grants), name='R3') %>%
	hc_title(text = "Number of Grants per Institution") 
```

<span id='plot1'></span>

<script> $(function () {
  $('#plot1').highcharts(
{
  "title": {
    "text": "Number of Grants per Institution"
  },
  "yAxis": {
    "title": {
      "text": null
    }
  },
  "credits": {
    "enabled": false
  },
  "exporting": {
    "enabled": false
  },
  "plotOptions": {
    "series": {
      "label": {
        "enabled": false
      },
      "turboThreshold": 0
    },
    "treemap": {
      "layoutAlgorithm": "squarified"
    }
  },
  "series": [
    {
      "group": "group",
      "data": [
        {
          "uni": "STANFORD UNIVERSITY",
          "grants": 2621,
          "y": 2621,
          "name": "STANFORD UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF WASHINGTON",
          "grants": 2115,
          "y": 2115,
          "name": "UNIVERSITY OF WASHINGTON"
        },
        {
          "uni": "JOHNS HOPKINS UNIVERSITY",
          "grants": 1701,
          "y": 1701,
          "name": "JOHNS HOPKINS UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF PENNSYLVANIA",
          "grants": 1616,
          "y": 1616,
          "name": "UNIVERSITY OF PENNSYLVANIA"
        },
        {
          "uni": "EMORY UNIVERSITY",
          "grants": 1508,
          "y": 1508,
          "name": "EMORY UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF PITTSBURGH",
          "grants": 1419,
          "y": 1419,
          "name": "UNIVERSITY OF PITTSBURGH"
        },
        {
          "uni": "DUKE UNIVERSITY",
          "grants": 1394,
          "y": 1394,
          "name": "DUKE UNIVERSITY"
        },
        {
          "uni": "YALE UNIVERSITY",
          "grants": 1190,
          "y": 1190,
          "name": "YALE UNIVERSITY"
        },
        {
          "uni": "CARNEGIE MELLON UNIVERSITY",
          "grants": 993,
          "y": 993,
          "name": "CARNEGIE MELLON UNIVERSITY"
        },
        {
          "uni": "VANDERBILT UNIVERSITY",
          "grants": 933,
          "y": 933,
          "name": "VANDERBILT UNIVERSITY"
        },
        {
          "uni": "HARVARD UNIVERSITY",
          "grants": 881,
          "y": 881,
          "name": "HARVARD UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF SOUTHERN CALIFORNIA",
          "grants": 807,
          "y": 807,
          "name": "UNIVERSITY OF SOUTHERN CALIFORNIA"
        },
        {
          "uni": "OHIO STATE UNIVERSITY",
          "grants": 796,
          "y": 796,
          "name": "OHIO STATE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF CHICAGO",
          "grants": 755,
          "y": 755,
          "name": "UNIVERSITY OF CHICAGO"
        },
        {
          "uni": "UNIVERSITY OF FLORIDA",
          "grants": 706,
          "y": 706,
          "name": "UNIVERSITY OF FLORIDA"
        },
        {
          "uni": "UNIVERSITY OF GEORGIA",
          "grants": 698,
          "y": 698,
          "name": "UNIVERSITY OF GEORGIA"
        },
        {
          "uni": "UNIVERSITY OF ALABAMA AT BIRMINGHAM",
          "grants": 687,
          "y": 687,
          "name": "UNIVERSITY OF ALABAMA AT BIRMINGHAM"
        },
        {
          "uni": "CASE WESTERN RESERVE UNIVERSITY",
          "grants": 659,
          "y": 659,
          "name": "CASE WESTERN RESERVE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF UTAH",
          "grants": 617,
          "y": 617,
          "name": "UNIVERSITY OF UTAH"
        },
        {
          "uni": "UNIVERSITY OF ROCHESTER",
          "grants": 586,
          "y": 586,
          "name": "UNIVERSITY OF ROCHESTER"
        },
        {
          "uni": "UNIVERSITY OF IOWA",
          "grants": 557,
          "y": 557,
          "name": "UNIVERSITY OF IOWA"
        },
        {
          "uni": "VIRGINIA COMMONWEALTH UNIVERSITY",
          "grants": 544,
          "y": 544,
          "name": "VIRGINIA COMMONWEALTH UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF ILLINOIS AT CHICAGO",
          "grants": 525,
          "y": 525,
          "name": "UNIVERSITY OF ILLINOIS AT CHICAGO"
        },
        {
          "uni": "UNIVERSITY OF KENTUCKY",
          "grants": 433,
          "y": 433,
          "name": "UNIVERSITY OF KENTUCKY"
        },
        {
          "uni": "MASSACHUSETTS INSTITUTE OF TECHNOLOGY",
          "grants": 358,
          "y": 358,
          "name": "MASSACHUSETTS INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "UNIVERSITY OF ARIZONA",
          "grants": 327,
          "y": 327,
          "name": "UNIVERSITY OF ARIZONA"
        },
        {
          "uni": "GEORGETOWN UNIVERSITY",
          "grants": 324,
          "y": 324,
          "name": "GEORGETOWN UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF NEW MEXICO",
          "grants": 297,
          "y": 297,
          "name": "UNIVERSITY OF NEW MEXICO"
        },
        {
          "uni": "UNIVERSITY OF CINCINNATI",
          "grants": 270,
          "y": 270,
          "name": "UNIVERSITY OF CINCINNATI"
        },
        {
          "uni": "TEMPLE UNIVERSITY",
          "grants": 270,
          "y": 270,
          "name": "TEMPLE UNIVERSITY"
        },
        {
          "uni": "WAYNE STATE UNIVERSITY",
          "grants": 263,
          "y": 263,
          "name": "WAYNE STATE UNIVERSITY"
        },
        {
          "uni": "MICHIGAN STATE UNIVERSITY",
          "grants": 255,
          "y": 255,
          "name": "MICHIGAN STATE UNIVERSITY"
        },
        {
          "uni": "BROWN UNIVERSITY",
          "grants": 250,
          "y": 250,
          "name": "BROWN UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF LOUISVILLE",
          "grants": 232,
          "y": 232,
          "name": "UNIVERSITY OF LOUISVILLE"
        },
        {
          "uni": "PURDUE UNIVERSITY",
          "grants": 228,
          "y": 228,
          "name": "PURDUE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF SOUTH FLORIDA",
          "grants": 187,
          "y": 187,
          "name": "UNIVERSITY OF SOUTH FLORIDA"
        },
        {
          "uni": "NEW YORK UNIVERSITY",
          "grants": 174,
          "y": 174,
          "name": "NEW YORK UNIVERSITY"
        },
        {
          "uni": "INDIANA UNIVERSITY BLOOMINGTON",
          "grants": 161,
          "y": 161,
          "name": "INDIANA UNIVERSITY BLOOMINGTON"
        },
        {
          "uni": "BOSTON UNIVERSITY",
          "grants": 158,
          "y": 158,
          "name": "BOSTON UNIVERSITY"
        },
        {
          "uni": "COLUMBIA UNIVERSITY",
          "grants": 144,
          "y": 144,
          "name": "COLUMBIA UNIVERSITY"
        },
        {
          "uni": "NORTHWESTERN UNIVERSITY",
          "grants": 137,
          "y": 137,
          "name": "NORTHWESTERN UNIVERSITY"
        },
        {
          "uni": "WASHINGTON STATE UNIVERSITY",
          "grants": 135,
          "y": 135,
          "name": "WASHINGTON STATE UNIVERSITY"
        },
        {
          "uni": "GEORGE WASHINGTON UNIVERSITY",
          "grants": 123,
          "y": 123,
          "name": "GEORGE WASHINGTON UNIVERSITY"
        },
        {
          "uni": "CALIFORNIA INSTITUTE OF TECHNOLOGY",
          "grants": 115,
          "y": 115,
          "name": "CALIFORNIA INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "UNIVERSITY OF MASSACHUSETTS AMHERST",
          "grants": 111,
          "y": 111,
          "name": "UNIVERSITY OF MASSACHUSETTS AMHERST"
        },
        {
          "uni": "NORTHEASTERN UNIVERSITY",
          "grants": 110,
          "y": 110,
          "name": "NORTHEASTERN UNIVERSITY"
        },
        {
          "uni": "FLORIDA STATE UNIVERSITY",
          "grants": 107,
          "y": 107,
          "name": "FLORIDA STATE UNIVERSITY"
        },
        {
          "uni": "WEST VIRGINIA UNIVERSITY",
          "grants": 106,
          "y": 106,
          "name": "WEST VIRGINIA UNIVERSITY"
        },
        {
          "uni": "PRINCETON UNIVERSITY",
          "grants": 105,
          "y": 105,
          "name": "PRINCETON UNIVERSITY"
        },
        {
          "uni": "OREGON STATE UNIVERSITY",
          "grants": 98,
          "y": 98,
          "name": "OREGON STATE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF HOUSTON",
          "grants": 96,
          "y": 96,
          "name": "UNIVERSITY OF HOUSTON"
        },
        {
          "uni": "GEORGIA STATE UNIVERSITY",
          "grants": 91,
          "y": 91,
          "name": "GEORGIA STATE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF HAWAII AT MANOA",
          "grants": 91,
          "y": 91,
          "name": "UNIVERSITY OF HAWAII AT MANOA"
        },
        {
          "uni": "UNIVERSITY OF DELAWARE",
          "grants": 82,
          "y": 82,
          "name": "UNIVERSITY OF DELAWARE"
        },
        {
          "uni": "IOWA STATE UNIVERSITY",
          "grants": 81,
          "y": 81,
          "name": "IOWA STATE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF OREGON",
          "grants": 79,
          "y": 79,
          "name": "UNIVERSITY OF OREGON"
        },
        {
          "uni": "BRANDEIS UNIVERSITY",
          "grants": 77,
          "y": 77,
          "name": "BRANDEIS UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF NOTRE DAME",
          "grants": 75,
          "y": 75,
          "name": "UNIVERSITY OF NOTRE DAME"
        },
        {
          "uni": "FLORIDA INTERNATIONAL UNIVERSITY",
          "grants": 75,
          "y": 75,
          "name": "FLORIDA INTERNATIONAL UNIVERSITY"
        },
        {
          "uni": "RICE UNIVERSITY",
          "grants": 66,
          "y": 66,
          "name": "RICE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF CENTRAL FLORIDA",
          "grants": 66,
          "y": 66,
          "name": "UNIVERSITY OF CENTRAL FLORIDA"
        },
        {
          "uni": "CLEMSON UNIVERSITY",
          "grants": 64,
          "y": 64,
          "name": "CLEMSON UNIVERSITY"
        },
        {
          "uni": "KANSAS STATE UNIVERSITY",
          "grants": 63,
          "y": 63,
          "name": "KANSAS STATE UNIVERSITY"
        },
        {
          "uni": "BOSTON COLLEGE",
          "grants": 53,
          "y": 53,
          "name": "BOSTON COLLEGE"
        },
        {
          "uni": "SYRACUSE UNIVERSITY",
          "grants": 45,
          "y": 45,
          "name": "SYRACUSE UNIVERSITY"
        },
        {
          "uni": "GEORGE MASON UNIVERSITY",
          "grants": 43,
          "y": 43,
          "name": "GEORGE MASON UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF TEXAS AT ARLINGTON",
          "grants": 32,
          "y": 32,
          "name": "UNIVERSITY OF TEXAS AT ARLINGTON"
        },
        {
          "uni": "TEXAS TECH UNIVERSITY",
          "grants": 30,
          "y": 30,
          "name": "TEXAS TECH UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF MISSISSIPPI",
          "grants": 16,
          "y": 16,
          "name": "UNIVERSITY OF MISSISSIPPI"
        },
        {
          "uni": "UNIVERSITY OF NORTH TEXAS",
          "grants": 8,
          "y": 8,
          "name": "UNIVERSITY OF NORTH TEXAS"
        },
        {
          "uni": "UNIVERSITY OF MIAMI",
          "grants": 1,
          "y": 1,
          "name": "UNIVERSITY OF MIAMI"
        }
      ],
      "type": "column",
      "name": "R1"
    },
    {
      "group": "group",
      "data": [
        {
          "uni": "UNIVERSITY OF COLORADO DENVER",
          "grants": 864,
          "y": 864,
          "name": "UNIVERSITY OF COLORADO DENVER"
        },
        {
          "uni": "ROCKEFELLER UNIVERSITY",
          "grants": 466,
          "y": 466,
          "name": "ROCKEFELLER UNIVERSITY"
        },
        {
          "uni": "DARTMOUTH COLLEGE",
          "grants": 257,
          "y": 257,
          "name": "DARTMOUTH COLLEGE"
        },
        {
          "uni": "ILLINOIS INSTITUTE OF TECHNOLOGY",
          "grants": 179,
          "y": 179,
          "name": "ILLINOIS INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "DREXEL UNIVERSITY",
          "grants": 161,
          "y": 161,
          "name": "DREXEL UNIVERSITY"
        },
        {
          "uni": "SAINT LOUIS UNIVERSITY",
          "grants": 111,
          "y": 111,
          "name": "SAINT LOUIS UNIVERSITY"
        },
        {
          "uni": "HOWARD UNIVERSITY",
          "grants": 99,
          "y": 99,
          "name": "HOWARD UNIVERSITY"
        },
        {
          "uni": "SAN DIEGO STATE UNIVERSITY",
          "grants": 89,
          "y": 89,
          "name": "SAN DIEGO STATE UNIVERSITY"
        },
        {
          "uni": "LOYOLA UNIVERSITY CHICAGO",
          "grants": 82,
          "y": 82,
          "name": "LOYOLA UNIVERSITY CHICAGO"
        },
        {
          "uni": "EAST CAROLINA UNIVERSITY",
          "grants": 64,
          "y": 64,
          "name": "EAST CAROLINA UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF MONTANA",
          "grants": 60,
          "y": 60,
          "name": "UNIVERSITY OF MONTANA"
        },
        {
          "uni": "MARQUETTE UNIVERSITY",
          "grants": 57,
          "y": 57,
          "name": "MARQUETTE UNIVERSITY"
        },
        {
          "uni": "RENSSELAER POLYTECHNIC INSTITUTE",
          "grants": 49,
          "y": 49,
          "name": "RENSSELAER POLYTECHNIC INSTITUTE"
        },
        {
          "uni": "UNIVERSITY OF SOUTH ALABAMA",
          "grants": 49,
          "y": 49,
          "name": "UNIVERSITY OF SOUTH ALABAMA"
        },
        {
          "uni": "UNIVERSITY OF NORTH CAROLINA AT CHARLOTTE",
          "grants": 45,
          "y": 45,
          "name": "UNIVERSITY OF NORTH CAROLINA AT CHARLOTTE"
        },
        {
          "uni": "FLORIDA ATLANTIC UNIVERSITY",
          "grants": 42,
          "y": 42,
          "name": "FLORIDA ATLANTIC UNIVERSITY"
        },
        {
          "uni": "SOUTHERN ILLINOIS UNIVERSITY CARBONDALE",
          "grants": 42,
          "y": 42,
          "name": "SOUTHERN ILLINOIS UNIVERSITY CARBONDALE"
        },
        {
          "uni": "UNIVERSITY OF TOLEDO",
          "grants": 41,
          "y": 41,
          "name": "UNIVERSITY OF TOLEDO"
        },
        {
          "uni": "KENT STATE UNIVERSITY AT KENT",
          "grants": 36,
          "y": 36,
          "name": "KENT STATE UNIVERSITY AT KENT"
        },
        {
          "uni": "UNIVERSITY OF NORTH DAKOTA",
          "grants": 36,
          "y": 36,
          "name": "UNIVERSITY OF NORTH DAKOTA"
        },
        {
          "uni": "MICHIGAN TECHNOLOGICAL UNIVERSITY",
          "grants": 35,
          "y": 35,
          "name": "MICHIGAN TECHNOLOGICAL UNIVERSITY"
        },
        {
          "uni": "MISSISSIPPI STATE UNIVERSITY",
          "grants": 34,
          "y": 34,
          "name": "MISSISSIPPI STATE UNIVERSITY"
        },
        {
          "uni": "PORTLAND STATE UNIVERSITY",
          "grants": 34,
          "y": 34,
          "name": "PORTLAND STATE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF RHODE ISLAND",
          "grants": 34,
          "y": 34,
          "name": "UNIVERSITY OF RHODE ISLAND"
        },
        {
          "uni": "UNIVERSITY OF WYOMING",
          "grants": 33,
          "y": 33,
          "name": "UNIVERSITY OF WYOMING"
        },
        {
          "uni": "UTAH STATE UNIVERSITY",
          "grants": 32,
          "y": 32,
          "name": "UTAH STATE UNIVERSITY"
        },
        {
          "uni": "LEHIGH UNIVERSITY",
          "grants": 31,
          "y": 31,
          "name": "LEHIGH UNIVERSITY"
        },
        {
          "uni": "OLD DOMINION UNIVERSITY",
          "grants": 29,
          "y": 29,
          "name": "OLD DOMINION UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF SOUTH DAKOTA",
          "grants": 27,
          "y": 27,
          "name": "UNIVERSITY OF SOUTH DAKOTA"
        },
        {
          "uni": "DUQUESNE UNIVERSITY",
          "grants": 25,
          "y": 25,
          "name": "DUQUESNE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF MEMPHIS",
          "grants": 23,
          "y": 23,
          "name": "UNIVERSITY OF MEMPHIS"
        },
        {
          "uni": "SOUTHERN METHODIST UNIVERSITY",
          "grants": 20,
          "y": 20,
          "name": "SOUTHERN METHODIST UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF MISSOURI-ST LOUIS",
          "grants": 20,
          "y": 20,
          "name": "UNIVERSITY OF MISSOURI-ST LOUIS"
        },
        {
          "uni": "WORCESTER POLYTECHNIC INSTITUTE",
          "grants": 20,
          "y": 20,
          "name": "WORCESTER POLYTECHNIC INSTITUTE"
        },
        {
          "uni": "UNIVERSITY OF ALASKA FAIRBANKS",
          "grants": 18,
          "y": 18,
          "name": "UNIVERSITY OF ALASKA FAIRBANKS"
        },
        {
          "uni": "UNIVERSITY OF SOUTHERN MISSISSIPPI",
          "grants": 18,
          "y": 18,
          "name": "UNIVERSITY OF SOUTHERN MISSISSIPPI"
        },
        {
          "uni": "COLLEGE OF WILLIAM AND MARY",
          "grants": 17,
          "y": 17,
          "name": "COLLEGE OF WILLIAM AND MARY"
        },
        {
          "uni": "ILLINOIS STATE UNIVERSITY",
          "grants": 16,
          "y": 16,
          "name": "ILLINOIS STATE UNIVERSITY"
        },
        {
          "uni": "NORTHERN ILLINOIS UNIVERSITY",
          "grants": 16,
          "y": 16,
          "name": "NORTHERN ILLINOIS UNIVERSITY"
        },
        {
          "uni": "SOUTH DAKOTA STATE UNIVERSITY",
          "grants": 16,
          "y": 16,
          "name": "SOUTH DAKOTA STATE UNIVERSITY"
        },
        {
          "uni": "NEW JERSEY INSTITUTE OF TECHNOLOGY",
          "grants": 15,
          "y": 15,
          "name": "NEW JERSEY INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "AMERICAN UNIVERSITY",
          "grants": 14,
          "y": 14,
          "name": "AMERICAN UNIVERSITY"
        },
        {
          "uni": "FORDHAM UNIVERSITY",
          "grants": 14,
          "y": 14,
          "name": "FORDHAM UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF IDAHO",
          "grants": 14,
          "y": 14,
          "name": "UNIVERSITY OF IDAHO"
        },
        {
          "uni": "NOVA SOUTHEASTERN UNIVERSITY",
          "grants": 13,
          "y": 13,
          "name": "NOVA SOUTHEASTERN UNIVERSITY"
        },
        {
          "uni": "CENTRAL MICHIGAN UNIVERSITY",
          "grants": 12,
          "y": 12,
          "name": "CENTRAL MICHIGAN UNIVERSITY"
        },
        {
          "uni": "CLAREMONT GRADUATE UNIVERSITY",
          "grants": 12,
          "y": 12,
          "name": "CLAREMONT GRADUATE UNIVERSITY"
        },
        {
          "uni": "CLEVELAND STATE UNIVERSITY",
          "grants": 12,
          "y": 12,
          "name": "CLEVELAND STATE UNIVERSITY"
        },
        {
          "uni": "NORTHERN ARIZONA UNIVERSITY",
          "grants": 12,
          "y": 12,
          "name": "NORTHERN ARIZONA UNIVERSITY"
        },
        {
          "uni": "STEVENS INSTITUTE OF TECHNOLOGY",
          "grants": 11,
          "y": 11,
          "name": "STEVENS INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "CATHOLIC UNIVERSITY OF AMERICA",
          "grants": 10,
          "y": 10,
          "name": "CATHOLIC UNIVERSITY OF AMERICA"
        },
        {
          "uni": "COLORADO SCHOOL OF MINES",
          "grants": 10,
          "y": 10,
          "name": "COLORADO SCHOOL OF MINES"
        },
        {
          "uni": "WESTERN MICHIGAN UNIVERSITY",
          "grants": 9,
          "y": 9,
          "name": "WESTERN MICHIGAN UNIVERSITY"
        },
        {
          "uni": "BAYLOR UNIVERSITY",
          "grants": 8,
          "y": 8,
          "name": "BAYLOR UNIVERSITY"
        },
        {
          "uni": "BALL STATE UNIVERSITY",
          "grants": 7,
          "y": 7,
          "name": "BALL STATE UNIVERSITY"
        },
        {
          "uni": "YESHIVA UNIVERSITY",
          "grants": 7,
          "y": 7,
          "name": "YESHIVA UNIVERSITY"
        },
        {
          "uni": "WAKE FOREST UNIVERSITY",
          "grants": 6,
          "y": 6,
          "name": "WAKE FOREST UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF ALABAMA IN HUNTSVILLE",
          "grants": 5,
          "y": 5,
          "name": "UNIVERSITY OF ALABAMA IN HUNTSVILLE"
        },
        {
          "uni": "TEXAS CHRISTIAN UNIVERSITY",
          "grants": 4,
          "y": 4,
          "name": "TEXAS CHRISTIAN UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF NEW ORLEANS",
          "grants": 4,
          "y": 4,
          "name": "UNIVERSITY OF NEW ORLEANS"
        },
        {
          "uni": "UNIVERSITY OF NORTHERN COLORADO",
          "grants": 4,
          "y": 4,
          "name": "UNIVERSITY OF NORTHERN COLORADO"
        },
        {
          "uni": "UNIVERSITY OF TULSA",
          "grants": 4,
          "y": 4,
          "name": "UNIVERSITY OF TULSA"
        },
        {
          "uni": "CLARK ATLANTA UNIVERSITY",
          "grants": 3,
          "y": 3,
          "name": "CLARK ATLANTA UNIVERSITY"
        },
        {
          "uni": "FLORIDA INSTITUTE OF TECHNOLOGY",
          "grants": 2,
          "y": 2,
          "name": "FLORIDA INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "UNIVERSITY OF DAYTON",
          "grants": 2,
          "y": 2,
          "name": "UNIVERSITY OF DAYTON"
        },
        {
          "uni": "WICHITA STATE UNIVERSITY",
          "grants": 2,
          "y": 2,
          "name": "WICHITA STATE UNIVERSITY"
        },
        {
          "uni": "JACKSON STATE UNIVERSITY",
          "grants": 1,
          "y": 1,
          "name": "JACKSON STATE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF LOUISIANA AT LAFAYETTE",
          "grants": 1,
          "y": 1,
          "name": "UNIVERSITY OF LOUISIANA AT LAFAYETTE"
        }
      ],
      "type": "column",
      "name": "R2"
    },
    {
      "group": "group",
      "data": [
        {
          "uni": "EAST TENNESSEE STATE UNIVERSITY",
          "grants": 51,
          "y": 51,
          "name": "EAST TENNESSEE STATE UNIVERSITY"
        },
        {
          "uni": "OAKLAND UNIVERSITY",
          "grants": 26,
          "y": 26,
          "name": "OAKLAND UNIVERSITY"
        },
        {
          "uni": "SAN FRANCISCO STATE UNIVERSITY",
          "grants": 21,
          "y": 21,
          "name": "SAN FRANCISCO STATE UNIVERSITY"
        },
        {
          "uni": "ROCHESTER INSTITUTE OF TECHNOLOGY",
          "grants": 19,
          "y": 19,
          "name": "ROCHESTER INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "ROWAN UNIVERSITY",
          "grants": 18,
          "y": 18,
          "name": "ROWAN UNIVERSITY"
        },
        {
          "uni": "IDAHO STATE UNIVERSITY",
          "grants": 15,
          "y": 15,
          "name": "IDAHO STATE UNIVERSITY"
        },
        {
          "uni": "BOISE STATE UNIVERSITY",
          "grants": 13,
          "y": 13,
          "name": "BOISE STATE UNIVERSITY"
        },
        {
          "uni": "CLARK UNIVERSITY",
          "grants": 10,
          "y": 10,
          "name": "CLARK UNIVERSITY"
        },
        {
          "uni": "SETON HALL UNIVERSITY",
          "grants": 10,
          "y": 10,
          "name": "SETON HALL UNIVERSITY"
        },
        {
          "uni": "KENNESAW STATE UNIVERSITY",
          "grants": 9,
          "y": 9,
          "name": "KENNESAW STATE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF LOUISIANA AT MONROE",
          "grants": 9,
          "y": 9,
          "name": "UNIVERSITY OF LOUISIANA AT MONROE"
        },
        {
          "uni": "CLARKSON UNIVERSITY",
          "grants": 6,
          "y": 6,
          "name": "CLARKSON UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF ARKANSAS AT LITTLE ROCK",
          "grants": 6,
          "y": 6,
          "name": "UNIVERSITY OF ARKANSAS AT LITTLE ROCK"
        },
        {
          "uni": "VILLANOVA UNIVERSITY",
          "grants": 6,
          "y": 6,
          "name": "VILLANOVA UNIVERSITY"
        },
        {
          "uni": "EASTERN MICHIGAN UNIVERSITY",
          "grants": 5,
          "y": 5,
          "name": "EASTERN MICHIGAN UNIVERSITY"
        },
        {
          "uni": "PACE UNIVERSITY",
          "grants": 5,
          "y": 5,
          "name": "PACE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF SAN DIEGO",
          "grants": 5,
          "y": 5,
          "name": "UNIVERSITY OF SAN DIEGO"
        },
        {
          "uni": "UNIVERSITY OF SAN FRANCISCO",
          "grants": 5,
          "y": 5,
          "name": "UNIVERSITY OF SAN FRANCISCO"
        },
        {
          "uni": "GEORGIA SOUTHERN UNIVERSITY",
          "grants": 4,
          "y": 4,
          "name": "GEORGIA SOUTHERN UNIVERSITY"
        },
        {
          "uni": "LOUISIANA TECH UNIVERSITY",
          "grants": 4,
          "y": 4,
          "name": "LOUISIANA TECH UNIVERSITY"
        },
        {
          "uni": "MIDDLE TENNESSEE STATE UNIVERSITY",
          "grants": 4,
          "y": 4,
          "name": "MIDDLE TENNESSEE STATE UNIVERSITY"
        },
        {
          "uni": "ADELPHI UNIVERSITY",
          "grants": 3,
          "y": 3,
          "name": "ADELPHI UNIVERSITY"
        },
        {
          "uni": "INDIANA STATE UNIVERSITY",
          "grants": 3,
          "y": 3,
          "name": "INDIANA STATE UNIVERSITY"
        },
        {
          "uni": "MORGAN STATE UNIVERSITY",
          "grants": 3,
          "y": 3,
          "name": "MORGAN STATE UNIVERSITY"
        },
        {
          "uni": "TEXAS WOMAN'S UNIVERSITY",
          "grants": 3,
          "y": 3,
          "name": "TEXAS WOMAN'S UNIVERSITY"
        },
        {
          "uni": "LAMAR UNIVERSITY",
          "grants": 2,
          "y": 2,
          "name": "LAMAR UNIVERSITY"
        },
        {
          "uni": "SAM HOUSTON STATE UNIVERSITY",
          "grants": 2,
          "y": 2,
          "name": "SAM HOUSTON STATE UNIVERSITY"
        },
        {
          "uni": "TENNESSEE STATE UNIVERSITY",
          "grants": 2,
          "y": 2,
          "name": "TENNESSEE STATE UNIVERSITY"
        },
        {
          "uni": "BENEDICTINE UNIVERSITY",
          "grants": 1,
          "y": 1,
          "name": "BENEDICTINE UNIVERSITY"
        },
        {
          "uni": "HOFSTRA UNIVERSITY",
          "grants": 1,
          "y": 1,
          "name": "HOFSTRA UNIVERSITY"
        },
        {
          "uni": "SEATTLE PACIFIC UNIVERSITY",
          "grants": 1,
          "y": 1,
          "name": "SEATTLE PACIFIC UNIVERSITY"
        },
        {
          "uni": "SHENANDOAH UNIVERSITY",
          "grants": 1,
          "y": 1,
          "name": "SHENANDOAH UNIVERSITY"
        },
        {
          "uni": "TENNESSEE TECHNOLOGICAL UNIVERSITY",
          "grants": 1,
          "y": 1,
          "name": "TENNESSEE TECHNOLOGICAL UNIVERSITY"
        },
        {
          "uni": "TEXAS SOUTHERN UNIVERSITY",
          "grants": 1,
          "y": 1,
          "name": "TEXAS SOUTHERN UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF HARTFORD",
          "grants": 1,
          "y": 1,
          "name": "UNIVERSITY OF HARTFORD"
        },
        {
          "uni": "UNIVERSITY OF LA VERNE",
          "grants": 1,
          "y": 1,
          "name": "UNIVERSITY OF LA VERNE"
        },
        {
          "uni": "UNIVERSITY OF MARYLAND EASTERN SHORE",
          "grants": 1,
          "y": 1,
          "name": "UNIVERSITY OF MARYLAND EASTERN SHORE"
        },
        {
          "uni": "VALDOSTA STATE UNIVERSITY",
          "grants": 1,
          "y": 1,
          "name": "VALDOSTA STATE UNIVERSITY"
        }
      ],
      "type": "column",
      "name": "R3"
    }
  ]
}
  
  )
})
</script>

So as we can see, in general, R1 institutions do get more grants. However, there is a wide distribution! And there are definitely R2 institutions with more grants than a lot of R1 institutions! Of course, this is just looking at the number of grants per institution without normalizing for the number of professors. 

For the time being, let's restrict our remaining analysis to the R1 or R2 institutions with more than 2000 grants.

```{r}
uni <- na.omit(c(R1uni[numGrants[R1uni]>2000], R2uni[numGrants[R2uni]>2000]))
```

# Question 2: How many research grants does each professor have on average? 

Does 1 person have a lot of grants, or is it well distributed across many people? To be more accurate, let's restrict to new R-series grants (Research grants as opposed to training or program and center grants), which always start with `1R` in their project names. Basically, we want to know, within the past decade, how many of these R-series grants a 'typical' professor gets at each institution so we may better gauge our expectations and their expectations for us.

```{r}
npi <- lapply(uni, function(school) {
  # limit to R-series grants
  vi1 <- grepl('^1R', data$PROJECT_NUMBER)
  # limit to school
  vi2 <- data$ORGANIZATION_NAME==school
  # get primary PI name
  npi <- na.omit(data[vi1&vi2,]$CONTACT_PI_PROJECT_LEADER)
  # compute how often name occurs
  table(npi)
})
names(npi) <- uni
d <- sort(sapply(npi, mean), decreasing=TRUE)
df <- data.frame(
  'uni' = names(d),
  'grants' = as.numeric(d)
)

library(highcharter)
highchart() %>% 
  hc_add_series(df, "column", hcaes(x = uni, y = grants)) %>%
  hc_title(text = "Average number of New R1 Grants per Professor per Institution")
```
<span id='plot2'></span>

<script> $(function () {
  $('#plot2').highcharts(
{
  "title": {
    "text": "Average number of New R1 Grants per Professor per Institution"
  },
  "yAxis": {
    "title": {
      "text": null
    }
  },
  "credits": {
    "enabled": false
  },
  "exporting": {
    "enabled": false
  },
  "plotOptions": {
    "series": {
      "label": {
        "enabled": false
      },
      "turboThreshold": 0
    },
    "treemap": {
      "layoutAlgorithm": "squarified"
    }
  },
  "series": [
    {
      "group": "group",
      "data": [
        {
          "uni": "STANFORD UNIVERSITY",
          "grants": 2.0246,
          "y": 2.0246,
          "name": "STANFORD UNIVERSITY"
        },
        {
          "uni": "CALIFORNIA INSTITUTE OF TECHNOLOGY",
          "grants": 1.9167,
          "y": 1.9167,
          "name": "CALIFORNIA INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "YALE UNIVERSITY",
          "grants": 1.8985,
          "y": 1.8985,
          "name": "YALE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF CHICAGO",
          "grants": 1.8642,
          "y": 1.8642,
          "name": "UNIVERSITY OF CHICAGO"
        },
        {
          "uni": "UNIVERSITY OF PENNSYLVANIA",
          "grants": 1.8635,
          "y": 1.8635,
          "name": "UNIVERSITY OF PENNSYLVANIA"
        },
        {
          "uni": "DUKE UNIVERSITY",
          "grants": 1.8434,
          "y": 1.8434,
          "name": "DUKE UNIVERSITY"
        },
        {
          "uni": "HARVARD UNIVERSITY",
          "grants": 1.7807,
          "y": 1.7807,
          "name": "HARVARD UNIVERSITY"
        },
        {
          "uni": "MASSACHUSETTS INSTITUTE OF TECHNOLOGY",
          "grants": 1.7786,
          "y": 1.7786,
          "name": "MASSACHUSETTS INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "JOHNS HOPKINS UNIVERSITY",
          "grants": 1.7683,
          "y": 1.7683,
          "name": "JOHNS HOPKINS UNIVERSITY"
        },
        {
          "uni": "EMORY UNIVERSITY",
          "grants": 1.758,
          "y": 1.758,
          "name": "EMORY UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF WASHINGTON",
          "grants": 1.702,
          "y": 1.702,
          "name": "UNIVERSITY OF WASHINGTON"
        },
        {
          "uni": "UNIVERSITY OF KENTUCKY",
          "grants": 1.6848,
          "y": 1.6848,
          "name": "UNIVERSITY OF KENTUCKY"
        },
        {
          "uni": "OHIO STATE UNIVERSITY",
          "grants": 1.6594,
          "y": 1.6594,
          "name": "OHIO STATE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF PITTSBURGH",
          "grants": 1.6559,
          "y": 1.6559,
          "name": "UNIVERSITY OF PITTSBURGH"
        },
        {
          "uni": "TEMPLE UNIVERSITY",
          "grants": 1.6503,
          "y": 1.6503,
          "name": "TEMPLE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF ROCHESTER",
          "grants": 1.645,
          "y": 1.645,
          "name": "UNIVERSITY OF ROCHESTER"
        },
        {
          "uni": "UNIVERSITY OF SOUTHERN CALIFORNIA",
          "grants": 1.6431,
          "y": 1.6431,
          "name": "UNIVERSITY OF SOUTHERN CALIFORNIA"
        },
        {
          "uni": "COLUMBIA UNIVERSITY",
          "grants": 1.6364,
          "y": 1.6364,
          "name": "COLUMBIA UNIVERSITY"
        },
        {
          "uni": "CASE WESTERN RESERVE UNIVERSITY",
          "grants": 1.633,
          "y": 1.633,
          "name": "CASE WESTERN RESERVE UNIVERSITY"
        },
        {
          "uni": "DARTMOUTH COLLEGE",
          "grants": 1.6139,
          "y": 1.6139,
          "name": "DARTMOUTH COLLEGE"
        },
        {
          "uni": "BROWN UNIVERSITY",
          "grants": 1.6129,
          "y": 1.6129,
          "name": "BROWN UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF IOWA",
          "grants": 1.5946,
          "y": 1.5946,
          "name": "UNIVERSITY OF IOWA"
        },
        {
          "uni": "UNIVERSITY OF COLORADO DENVER",
          "grants": 1.5854,
          "y": 1.5854,
          "name": "UNIVERSITY OF COLORADO DENVER"
        },
        {
          "uni": "UNIVERSITY OF ALABAMA AT BIRMINGHAM",
          "grants": 1.5827,
          "y": 1.5827,
          "name": "UNIVERSITY OF ALABAMA AT BIRMINGHAM"
        },
        {
          "uni": "VIRGINIA COMMONWEALTH UNIVERSITY",
          "grants": 1.5702,
          "y": 1.5702,
          "name": "VIRGINIA COMMONWEALTH UNIVERSITY"
        },
        {
          "uni": "PRINCETON UNIVERSITY",
          "grants": 1.5672,
          "y": 1.5672,
          "name": "PRINCETON UNIVERSITY"
        },
        {
          "uni": "CARNEGIE MELLON UNIVERSITY",
          "grants": 1.5652,
          "y": 1.5652,
          "name": "CARNEGIE MELLON UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF GEORGIA",
          "grants": 1.5625,
          "y": 1.5625,
          "name": "UNIVERSITY OF GEORGIA"
        },
        {
          "uni": "VANDERBILT UNIVERSITY",
          "grants": 1.5618,
          "y": 1.5618,
          "name": "VANDERBILT UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF UTAH",
          "grants": 1.5224,
          "y": 1.5224,
          "name": "UNIVERSITY OF UTAH"
        },
        {
          "uni": "UNIVERSITY OF ARIZONA",
          "grants": 1.5163,
          "y": 1.5163,
          "name": "UNIVERSITY OF ARIZONA"
        },
        {
          "uni": "NORTHWESTERN UNIVERSITY",
          "grants": 1.5055,
          "y": 1.5055,
          "name": "NORTHWESTERN UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF FLORIDA",
          "grants": 1.4958,
          "y": 1.4958,
          "name": "UNIVERSITY OF FLORIDA"
        },
        {
          "uni": "PURDUE UNIVERSITY",
          "grants": 1.4934,
          "y": 1.4934,
          "name": "PURDUE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF CINCINNATI",
          "grants": 1.4852,
          "y": 1.4852,
          "name": "UNIVERSITY OF CINCINNATI"
        },
        {
          "uni": "UNIVERSITY OF ILLINOIS AT CHICAGO",
          "grants": 1.4655,
          "y": 1.4655,
          "name": "UNIVERSITY OF ILLINOIS AT CHICAGO"
        },
        {
          "uni": "MICHIGAN STATE UNIVERSITY",
          "grants": 1.377,
          "y": 1.377,
          "name": "MICHIGAN STATE UNIVERSITY"
        },
        {
          "uni": "WAYNE STATE UNIVERSITY",
          "grants": 1.377,
          "y": 1.377,
          "name": "WAYNE STATE UNIVERSITY"
        }
      ],
      "type": "column"
    }
  ]
}

   )
})
</script>


The distribution doesn't look as wide as I would've expected! It seems like at almost all institutions, professors get on average 1 to 2 new R-series grants in the past decade.

Just out of curiousity, what is the maximum number of new R-series grants a professor has gotten within the past decade at an institution? It'll be left as an exercise to the reader to stalk these super stars and learn their secrets. 

```{r}
d <- sort(sapply(npi, max), decreasing=TRUE)
df <- data.frame(
  'uni' = names(d),
  'grants' = as.numeric(d)
)

library(highcharter)
highchart() %>% 
  hc_add_series(df, "column", hcaes(x = uni, y = grants)) %>%
  hc_title(text = "Max number of New R1 Grants per Professor per Institution")
```

<span id='plot3'></span>

<script> $(function () {
  $('#plot3').highcharts(
{
  "title": {
    "text": "Max number of New R1 Grants per Professor per Institution"
  },
  "yAxis": {
    "title": {
      "text": null
    }
  },
  "credits": {
    "enabled": false
  },
  "exporting": {
    "enabled": false
  },
  "plotOptions": {
    "series": {
      "label": {
        "enabled": false
      },
      "turboThreshold": 0
    },
    "treemap": {
      "layoutAlgorithm": "squarified"
    }
  },
  "series": [
    {
      "group": "group",
      "data": [
        {
          "uni": "STANFORD UNIVERSITY",
          "grants": 15,
          "y": 15,
          "name": "STANFORD UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF PENNSYLVANIA",
          "grants": 15,
          "y": 15,
          "name": "UNIVERSITY OF PENNSYLVANIA"
        },
        {
          "uni": "HARVARD UNIVERSITY",
          "grants": 11,
          "y": 11,
          "name": "HARVARD UNIVERSITY"
        },
        {
          "uni": "JOHNS HOPKINS UNIVERSITY",
          "grants": 10,
          "y": 10,
          "name": "JOHNS HOPKINS UNIVERSITY"
        },
        {
          "uni": "DUKE UNIVERSITY",
          "grants": 10,
          "y": 10,
          "name": "DUKE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF PITTSBURGH",
          "grants": 10,
          "y": 10,
          "name": "UNIVERSITY OF PITTSBURGH"
        },
        {
          "uni": "EMORY UNIVERSITY",
          "grants": 9,
          "y": 9,
          "name": "EMORY UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF CHICAGO",
          "grants": 9,
          "y": 9,
          "name": "UNIVERSITY OF CHICAGO"
        },
        {
          "uni": "BROWN UNIVERSITY",
          "grants": 9,
          "y": 9,
          "name": "BROWN UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF IOWA",
          "grants": 9,
          "y": 9,
          "name": "UNIVERSITY OF IOWA"
        },
        {
          "uni": "UNIVERSITY OF KENTUCKY",
          "grants": 9,
          "y": 9,
          "name": "UNIVERSITY OF KENTUCKY"
        },
        {
          "uni": "VIRGINIA COMMONWEALTH UNIVERSITY",
          "grants": 9,
          "y": 9,
          "name": "VIRGINIA COMMONWEALTH UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF WASHINGTON",
          "grants": 9,
          "y": 9,
          "name": "UNIVERSITY OF WASHINGTON"
        },
        {
          "uni": "CALIFORNIA INSTITUTE OF TECHNOLOGY",
          "grants": 8,
          "y": 8,
          "name": "CALIFORNIA INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "UNIVERSITY OF SOUTHERN CALIFORNIA",
          "grants": 8,
          "y": 8,
          "name": "UNIVERSITY OF SOUTHERN CALIFORNIA"
        },
        {
          "uni": "YALE UNIVERSITY",
          "grants": 8,
          "y": 8,
          "name": "YALE UNIVERSITY"
        },
        {
          "uni": "MASSACHUSETTS INSTITUTE OF TECHNOLOGY",
          "grants": 8,
          "y": 8,
          "name": "MASSACHUSETTS INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "UNIVERSITY OF ROCHESTER",
          "grants": 8,
          "y": 8,
          "name": "UNIVERSITY OF ROCHESTER"
        },
        {
          "uni": "UNIVERSITY OF ALABAMA AT BIRMINGHAM",
          "grants": 8,
          "y": 8,
          "name": "UNIVERSITY OF ALABAMA AT BIRMINGHAM"
        },
        {
          "uni": "UNIVERSITY OF GEORGIA",
          "grants": 8,
          "y": 8,
          "name": "UNIVERSITY OF GEORGIA"
        },
        {
          "uni": "UNIVERSITY OF ILLINOIS AT CHICAGO",
          "grants": 8,
          "y": 8,
          "name": "UNIVERSITY OF ILLINOIS AT CHICAGO"
        },
        {
          "uni": "OHIO STATE UNIVERSITY",
          "grants": 8,
          "y": 8,
          "name": "OHIO STATE UNIVERSITY"
        },
        {
          "uni": "VANDERBILT UNIVERSITY",
          "grants": 7,
          "y": 7,
          "name": "VANDERBILT UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF FLORIDA",
          "grants": 7,
          "y": 7,
          "name": "UNIVERSITY OF FLORIDA"
        },
        {
          "uni": "DARTMOUTH COLLEGE",
          "grants": 7,
          "y": 7,
          "name": "DARTMOUTH COLLEGE"
        },
        {
          "uni": "UNIVERSITY OF COLORADO DENVER",
          "grants": 7,
          "y": 7,
          "name": "UNIVERSITY OF COLORADO DENVER"
        },
        {
          "uni": "COLUMBIA UNIVERSITY",
          "grants": 6,
          "y": 6,
          "name": "COLUMBIA UNIVERSITY"
        },
        {
          "uni": "CASE WESTERN RESERVE UNIVERSITY",
          "grants": 6,
          "y": 6,
          "name": "CASE WESTERN RESERVE UNIVERSITY"
        },
        {
          "uni": "CARNEGIE MELLON UNIVERSITY",
          "grants": 6,
          "y": 6,
          "name": "CARNEGIE MELLON UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF ARIZONA",
          "grants": 6,
          "y": 6,
          "name": "UNIVERSITY OF ARIZONA"
        },
        {
          "uni": "WAYNE STATE UNIVERSITY",
          "grants": 6,
          "y": 6,
          "name": "WAYNE STATE UNIVERSITY"
        },
        {
          "uni": "TEMPLE UNIVERSITY",
          "grants": 6,
          "y": 6,
          "name": "TEMPLE UNIVERSITY"
        },
        {
          "uni": "NORTHWESTERN UNIVERSITY",
          "grants": 5,
          "y": 5,
          "name": "NORTHWESTERN UNIVERSITY"
        },
        {
          "uni": "PURDUE UNIVERSITY",
          "grants": 5,
          "y": 5,
          "name": "PURDUE UNIVERSITY"
        },
        {
          "uni": "MICHIGAN STATE UNIVERSITY",
          "grants": 5,
          "y": 5,
          "name": "MICHIGAN STATE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF CINCINNATI",
          "grants": 5,
          "y": 5,
          "name": "UNIVERSITY OF CINCINNATI"
        },
        {
          "uni": "UNIVERSITY OF UTAH",
          "grants": 5,
          "y": 5,
          "name": "UNIVERSITY OF UTAH"
        },
        {
          "uni": "PRINCETON UNIVERSITY",
          "grants": 4,
          "y": 4,
          "name": "PRINCETON UNIVERSITY"
        }
      ],
      "type": "column"
    }
  ]
}

   )
})
</script>

# Question 3: How often do PIs write grants together?

Research often take teamwork! We can gauge the collaborativeness of an institution based on how frequently its professors write grants together. So let's count how frequently there is more than 1 PI on a single grant.

```{r}
nopis <- unlist(lapply(uni, function(school) {
  vi <- data$ORGANIZATION_NAME==school
  opis <- data[vi,]$OTHER_PIS
  sum(opis!='')/length(opis) # count how often other PIs is not empty
}))
names(nopis) <- uni

d <- sort(nopis, decreasing=TRUE)
df <- data.frame(
  'uni' = names(d),
  'collabs' = as.numeric(d)
)

library(highcharter)
highchart() %>% 
  hc_add_series(df, "column", hcaes(x = uni, y = collabs)) %>%
  hc_title(text = "Percentage of grants with >1 PI per Institution")
```

<span id='plot4'></span>

<script> $(function () {
  $('#plot4').highcharts(
{
  "title": {
    "text": "Percentage of grants with >1 PI per Institution"
  },
  "yAxis": {
    "title": {
      "text": null
    }
  },
  "credits": {
    "enabled": false
  },
  "exporting": {
    "enabled": false
  },
  "plotOptions": {
    "series": {
      "label": {
        "enabled": false
      },
      "turboThreshold": 0
    },
    "treemap": {
      "layoutAlgorithm": "squarified"
    }
  },
  "series": [
    {
      "group": "group",
      "data": [
        {
          "uni": "MICHIGAN STATE UNIVERSITY",
          "collabs": 0.2516,
          "y": 0.2516,
          "name": "MICHIGAN STATE UNIVERSITY"
        },
        {
          "uni": "PURDUE UNIVERSITY",
          "collabs": 0.2139,
          "y": 0.2139,
          "name": "PURDUE UNIVERSITY"
        },
        {
          "uni": "COLUMBIA UNIVERSITY",
          "collabs": 0.2122,
          "y": 0.2122,
          "name": "COLUMBIA UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF GEORGIA",
          "collabs": 0.1923,
          "y": 0.1923,
          "name": "UNIVERSITY OF GEORGIA"
        },
        {
          "uni": "UNIVERSITY OF FLORIDA",
          "collabs": 0.1864,
          "y": 0.1864,
          "name": "UNIVERSITY OF FLORIDA"
        },
        {
          "uni": "UNIVERSITY OF ARIZONA",
          "collabs": 0.1792,
          "y": 0.1792,
          "name": "UNIVERSITY OF ARIZONA"
        },
        {
          "uni": "NORTHWESTERN UNIVERSITY",
          "collabs": 0.1783,
          "y": 0.1783,
          "name": "NORTHWESTERN UNIVERSITY"
        },
        {
          "uni": "CARNEGIE MELLON UNIVERSITY",
          "collabs": 0.1703,
          "y": 0.1703,
          "name": "CARNEGIE MELLON UNIVERSITY"
        },
        {
          "uni": "OHIO STATE UNIVERSITY",
          "collabs": 0.1649,
          "y": 0.1649,
          "name": "OHIO STATE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF KENTUCKY",
          "collabs": 0.1367,
          "y": 0.1367,
          "name": "UNIVERSITY OF KENTUCKY"
        },
        {
          "uni": "UNIVERSITY OF ILLINOIS AT CHICAGO",
          "collabs": 0.134,
          "y": 0.134,
          "name": "UNIVERSITY OF ILLINOIS AT CHICAGO"
        },
        {
          "uni": "UNIVERSITY OF UTAH",
          "collabs": 0.1333,
          "y": 0.1333,
          "name": "UNIVERSITY OF UTAH"
        },
        {
          "uni": "UNIVERSITY OF SOUTHERN CALIFORNIA",
          "collabs": 0.1301,
          "y": 0.1301,
          "name": "UNIVERSITY OF SOUTHERN CALIFORNIA"
        },
        {
          "uni": "BROWN UNIVERSITY",
          "collabs": 0.1287,
          "y": 0.1287,
          "name": "BROWN UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF CINCINNATI",
          "collabs": 0.1119,
          "y": 0.1119,
          "name": "UNIVERSITY OF CINCINNATI"
        },
        {
          "uni": "YALE UNIVERSITY",
          "collabs": 0.1077,
          "y": 0.1077,
          "name": "YALE UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF WASHINGTON",
          "collabs": 0.1073,
          "y": 0.1073,
          "name": "UNIVERSITY OF WASHINGTON"
        },
        {
          "uni": "CALIFORNIA INSTITUTE OF TECHNOLOGY",
          "collabs": 0.1067,
          "y": 0.1067,
          "name": "CALIFORNIA INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "TEMPLE UNIVERSITY",
          "collabs": 0.105,
          "y": 0.105,
          "name": "TEMPLE UNIVERSITY"
        },
        {
          "uni": "PRINCETON UNIVERSITY",
          "collabs": 0.1027,
          "y": 0.1027,
          "name": "PRINCETON UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF CHICAGO",
          "collabs": 0.1,
          "y": 0.1,
          "name": "UNIVERSITY OF CHICAGO"
        },
        {
          "uni": "CASE WESTERN RESERVE UNIVERSITY",
          "collabs": 0.0986,
          "y": 0.0986,
          "name": "CASE WESTERN RESERVE UNIVERSITY"
        },
        {
          "uni": "VANDERBILT UNIVERSITY",
          "collabs": 0.0951,
          "y": 0.0951,
          "name": "VANDERBILT UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF PITTSBURGH",
          "collabs": 0.0949,
          "y": 0.0949,
          "name": "UNIVERSITY OF PITTSBURGH"
        },
        {
          "uni": "UNIVERSITY OF ROCHESTER",
          "collabs": 0.0947,
          "y": 0.0947,
          "name": "UNIVERSITY OF ROCHESTER"
        },
        {
          "uni": "VIRGINIA COMMONWEALTH UNIVERSITY",
          "collabs": 0.0935,
          "y": 0.0935,
          "name": "VIRGINIA COMMONWEALTH UNIVERSITY"
        },
        {
          "uni": "WAYNE STATE UNIVERSITY",
          "collabs": 0.0919,
          "y": 0.0919,
          "name": "WAYNE STATE UNIVERSITY"
        },
        {
          "uni": "MASSACHUSETTS INSTITUTE OF TECHNOLOGY",
          "collabs": 0.0902,
          "y": 0.0902,
          "name": "MASSACHUSETTS INSTITUTE OF TECHNOLOGY"
        },
        {
          "uni": "DUKE UNIVERSITY",
          "collabs": 0.0895,
          "y": 0.0895,
          "name": "DUKE UNIVERSITY"
        },
        {
          "uni": "EMORY UNIVERSITY",
          "collabs": 0.0893,
          "y": 0.0893,
          "name": "EMORY UNIVERSITY"
        },
        {
          "uni": "JOHNS HOPKINS UNIVERSITY",
          "collabs": 0.0851,
          "y": 0.0851,
          "name": "JOHNS HOPKINS UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF IOWA",
          "collabs": 0.0843,
          "y": 0.0843,
          "name": "UNIVERSITY OF IOWA"
        },
        {
          "uni": "UNIVERSITY OF COLORADO DENVER",
          "collabs": 0.0842,
          "y": 0.0842,
          "name": "UNIVERSITY OF COLORADO DENVER"
        },
        {
          "uni": "UNIVERSITY OF PENNSYLVANIA",
          "collabs": 0.0802,
          "y": 0.0802,
          "name": "UNIVERSITY OF PENNSYLVANIA"
        },
        {
          "uni": "STANFORD UNIVERSITY",
          "collabs": 0.077,
          "y": 0.077,
          "name": "STANFORD UNIVERSITY"
        },
        {
          "uni": "UNIVERSITY OF ALABAMA AT BIRMINGHAM",
          "collabs": 0.0743,
          "y": 0.0743,
          "name": "UNIVERSITY OF ALABAMA AT BIRMINGHAM"
        },
        {
          "uni": "DARTMOUTH COLLEGE",
          "collabs": 0.0733,
          "y": 0.0733,
          "name": "DARTMOUTH COLLEGE"
        },
        {
          "uni": "HARVARD UNIVERSITY",
          "collabs": 0.0728,
          "y": 0.0728,
          "name": "HARVARD UNIVERSITY"
        }
      ],
      "type": "column"
    }
  ]
}

   )
})
</script>

Of course there are other ways to collaboration without necessarily being on each others' grants as co-PIs. 

Anyways, could this data-driven approach help us focus on some schools that maybe weren't originally in our consideration? Seems like it could be a useful exploratory analysis! More to come!

# Some additional fun questions left to the reader as an exercise

- What is the distribution of funding amounts at each institution based on `FY_TOTAL_COST`? 
- Does an institution's total funding amount or number of grants increase with time or is it relatively stable?
- What research topics are the most popular among funded R-series grants based on `PROJECT_TERMS`? Is there any enrichment? Similarly, have any funded research topics increased in frequency over the past decade?
- Can we integrate additional datasets and connect PIs to departments to calculate department-level statistics?
