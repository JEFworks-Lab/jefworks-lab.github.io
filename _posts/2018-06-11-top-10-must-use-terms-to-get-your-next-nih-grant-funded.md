---
layout: post
comments: false
tags: [visualization, javascript, career, grants, lists]
---

<script src="https://code.highcharts.com/highcharts.js"></script>

Continuing on our theme of [click-bait-y Buzz-feed inspired blog
titles](https://github.com/JEFworks/buzzfeed-title), I am taking a
data-driven approach to writing my next grant by analyzing 10 years of
US federal grant data from the Federal RePORTER.

While I have my own personal research interests (in computational
methods development for precision medicine and cancer treatment), I
wonder: what are funding agencies interested in? Are there certain hot
topics I should consider looking into? Also, I’ve heard from others who
have served on study commitees that it is difficult to read all of these
grants word for word. So are there certain words grant reviewers may
look for that end up becoming really common in funded grants?

As mentioned in [my previous blog
post](https://jef.works/blog/2018/06/07/data-driven-faculty-job-search/),
the NIH has an excellent database of all the federally funded grants in
the past decade. This database includes nicely parsed `Project Terms`
related to every funded project! Thanks to this database, we can now
take a data driven approach to addressing our questions!

Read in the last 10 years of US federal grant data from Federal RePORTER
========================================================================

First, let’s read in all the data. You can download the data here:
<https://federalreporter.nih.gov/FileDownload>

``` r
# Read in all data
data <- rbind(
  read.csv('FedRePORTER_PRJ_C_FY2017.csv.gz', stringsAsFactors = FALSE),
  read.csv('FedRePORTER_PRJ_C_FY2016.csv.gz', stringsAsFactors = FALSE),
  read.csv('FedRePORTER_PRJ_C_FY2015.csv.gz', stringsAsFactors = FALSE),
  read.csv('FedRePORTER_PRJ_C_FY2014.csv.gz', stringsAsFactors = FALSE),
  read.csv('FedRePORTER_PRJ_C_FY2013.csv.gz', stringsAsFactors = FALSE),
  read.csv('FedRePORTER_PRJ_C_FY2012.csv.gz', stringsAsFactors = FALSE),
  read.csv('FedRePORTER_PRJ_C_FY2011.csv.gz', stringsAsFactors = FALSE),
  read.csv('FedRePORTER_PRJ_C_FY2010.csv.gz', stringsAsFactors = FALSE),
  read.csv('FedRePORTER_PRJ_C_FY2009.csv.gz', stringsAsFactors = FALSE),
  read.csv('FedRePORTER_PRJ_C_FY2008.csv.gz', stringsAsFactors = FALSE)
)
```

For the purposes of this blog post, I will restrict to new R-series
grants (Research grants as opposed to training or program and center
grants), which always start with 1R in their project names.

``` r
# Restrict to new R-series grants
vi <- grepl('^1R', data$PROJECT_NUMBER)
table(vi)
```

    ## vi
    ##  FALSE   TRUE 
    ## 888420  88365

``` r
data <- data[vi,]
```

Now, let’s parse out the project terms.

``` r
# Get project terms
trim <- function (x) gsub("^\\s+|\\s+$", "", x)
terms <- lapply(data$PROJECT_TERMS, function(x) {
  sapply(strsplit(x, ';')[[1]], trim)
})
```

Question 1: What are the most common project terms?
===================================================

``` r
# Most common terms
mct <- table(unlist(terms))
mct <- mct/nrow(data) # normalize
mct <- sort(mct, decreasing=TRUE)
length(mct)
```

    ## [1] 45227

``` r
head(mct, n=10)
```

    ## 
    ##                 Testing                    base             Development 
    ##               0.6626379               0.6594127               0.5905053 
    ##                   Goals                    Data                Research 
    ##               0.5819499               0.5762915               0.5411758 
    ##                   novel public health relevance                    Role 
    ##               0.5117863               0.4999717               0.4860069 
    ##                 Disease 
    ##               0.4772138

It looks like there are over 45k different terms represented. However,
the most common terms are quite boring. Almost every grant talks about
‘Testing’, ‘Research’, ‘Goals’, ‘Data’, and ‘Disease’…as expected.

Question 2: What project terms are becoming more common?
========================================================

Let’s instead look for terms that are becoming more common. We may
interpret these are up-and-coming hot topics that we should keep an eye
out on.

``` r
# Frequency of terms by year
freq <- lapply(2008:2017, function(year){
  vi <- data$FY == year
  universe <- table(unlist(terms[vi]))
  universe <- sort(universe, decreasing=TRUE)
})

# normalizing factor, grants per year
norm <- sapply(2008:2017, function(year){
    sum(data$FY == year)
})

# look at a union of the top 2000 most common terms per year
# just so we don't have to look through >45k terms
top.words <- unique(unlist(lapply(freq, function(x) names(x)[1:2000])))
length(top.words)
```

    ## [1] 2675

``` r
# Look at slope of trend
slopes <- sapply(top.words, function(word) {
  word.freq <- unlist(lapply(freq, function(x) {
    x[word]
  }))
  df <- data.frame(x = 2008:2017, y=word.freq)
  # plot(df, type='l', main=i)
  # get slope
  lm(y~x, df)$coefficients[[2]]
})
names(slopes) <- top.words
slopes <- sort(slopes, decreasing=TRUE)
head(slopes, n=10)
```

    ##                    novel               innovation       targeted treatment 
    ##                174.43636                145.75152                139.00000 
    ## transcriptome sequencing               Zika Virus                     Data 
    ##                126.20000                124.00000                106.18182 
    ##              Therapeutic              mouse model                    Human 
    ##                 92.40000                 87.66667                 87.38788 
    ##    CRISPR/Cas technology 
    ##                 87.00000

Let’s [interactively visualize a few of these trends using
`highcharter`](https://jef.works/blog/2018/02/10/interactive-visualizations-with-highcharter/)!

``` r
words <- names(head(slopes, n=10))
df <- do.call(cbind, lapply(words, function(word) {
  word.freq <- unlist(lapply(freq, function(x) {
    x[word]
  }))
  word.freq/norm
}))
rownames(df) <- 2008:2017
colnames(df) <- words

library(reshape2)
dfm <- melt(df)

# Adapted from highcharter::export_hc() to not write to file
library(jsonlite)
library(stringr)
write_hc <- function(hc, name) {
    JS_to_json <- function(x) {
        class(x) <- "json"
        return(x)
    }
    hc$x$hc_opts <- rapply(object = hc$x$hc_opts, f = JS_to_json, 
        classes = "JS_EVAL", how = "replace")
    js <- toJSON(x = hc$x$hc_opts, pretty = TRUE, auto_unbox = TRUE, 
        json_verbatim = TRUE, force = TRUE, null = "null", na = "null")
    js <- sprintf("$(function(){\n\t$('#%s').highcharts(\n%s\n);\n});", 
            name, js)
    return(js)
}
# Helper function to write javascript in Rmd
# Thanks so http://livefreeordichotomize.com/2017/01/24/custom-javascript-visualizations-in-rmarkdown/
send_hc_to_js <- function(hc, hcid){
  cat(
    paste(
      '<span id=\"', hcid, '\"></span>',
      '<script>',
      write_hc(hc, hcid),
      '</script>', 
      sep="")
  )
}


library(highcharter)
hc1 <- highchart() %>% 
  hc_add_series(dfm, "line", hcaes(x = Var1, y = value, group = Var2)) %>%
  hc_title(text = 'Frequency of Top 10 Up-and-Coming Project Terms in New Funded R-series Grants') %>%
  hc_legend(align = "right", layout = "vertical")
```

``` r
send_hc_to_js(hc1, 'hc1')
```

<span id="hc1"></span>
<script>$(function(){
    $('#hc1').highcharts(
{
  "title": {
    "text": "Frequency of Top 10 Up-and-Coming Project Terms in New Funded R-series Grants"
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
      "name": "novel",
      "data": [
        {
          "Var1": 2008,
          "Var2": "novel",
          "value": 0.4145,
          "x": 2008,
          "y": 0.4145
        },
        {
          "Var1": 2009,
          "Var2": "novel",
          "value": 0.4458,
          "x": 2009,
          "y": 0.4458
        },
        {
          "Var1": 2010,
          "Var2": "novel",
          "value": 0.4552,
          "x": 2010,
          "y": 0.4552
        },
        {
          "Var1": 2011,
          "Var2": "novel",
          "value": 0.5037,
          "x": 2011,
          "y": 0.5037
        },
        {
          "Var1": 2012,
          "Var2": "novel",
          "value": 0.5155,
          "x": 2012,
          "y": 0.5155
        },
        {
          "Var1": 2013,
          "Var2": "novel",
          "value": 0.5363,
          "x": 2013,
          "y": 0.5363
        },
        {
          "Var1": 2014,
          "Var2": "novel",
          "value": 0.5452,
          "x": 2014,
          "y": 0.5452
        },
        {
          "Var1": 2015,
          "Var2": "novel",
          "value": 0.5661,
          "x": 2015,
          "y": 0.5661
        },
        {
          "Var1": 2016,
          "Var2": "novel",
          "value": 0.5732,
          "x": 2016,
          "y": 0.5732
        },
        {
          "Var1": 2017,
          "Var2": "novel",
          "value": 0.5679,
          "x": 2017,
          "y": 0.5679
        }
      ],
      "type": "line"
    },
    {
      "name": "innovation",
      "data": [
        {
          "Var1": 2008,
          "Var2": "innovation",
          "value": 0.1465,
          "x": 2008,
          "y": 0.1465
        },
        {
          "Var1": 2009,
          "Var2": "innovation",
          "value": 0.1602,
          "x": 2009,
          "y": 0.1602
        },
        {
          "Var1": 2010,
          "Var2": "innovation",
          "value": 0.1885,
          "x": 2010,
          "y": 0.1885
        },
        {
          "Var1": 2011,
          "Var2": "innovation",
          "value": 0.2446,
          "x": 2011,
          "y": 0.2446
        },
        {
          "Var1": 2012,
          "Var2": "innovation",
          "value": 0.2613,
          "x": 2012,
          "y": 0.2613
        },
        {
          "Var1": 2013,
          "Var2": "innovation",
          "value": 0.2638,
          "x": 2013,
          "y": 0.2638
        },
        {
          "Var1": 2014,
          "Var2": "innovation",
          "value": 0.2722,
          "x": 2014,
          "y": 0.2722
        },
        {
          "Var1": 2015,
          "Var2": "innovation",
          "value": 0.2761,
          "x": 2015,
          "y": 0.2761
        },
        {
          "Var1": 2016,
          "Var2": "innovation",
          "value": 0.2741,
          "x": 2016,
          "y": 0.2741
        },
        {
          "Var1": 2017,
          "Var2": "innovation",
          "value": 0.2783,
          "x": 2017,
          "y": 0.2783
        }
      ],
      "type": "line"
    },
    {
      "name": "targeted treatment",
      "data": [
        {
          "Var1": 2008,
          "Var2": "targeted treatment",
          "value": null,
          "x": 2008,
          "y": null
        },
        {
          "Var1": 2009,
          "Var2": "targeted treatment",
          "value": null,
          "x": 2009,
          "y": null
        },
        {
          "Var1": 2010,
          "Var2": "targeted treatment",
          "value": null,
          "x": 2010,
          "y": null
        },
        {
          "Var1": 2011,
          "Var2": "targeted treatment",
          "value": null,
          "x": 2011,
          "y": null
        },
        {
          "Var1": 2012,
          "Var2": "targeted treatment",
          "value": null,
          "x": 2012,
          "y": null
        },
        {
          "Var1": 2013,
          "Var2": "targeted treatment",
          "value": null,
          "x": 2013,
          "y": null
        },
        {
          "Var1": 2014,
          "Var2": "targeted treatment",
          "value": null,
          "x": 2014,
          "y": null
        },
        {
          "Var1": 2015,
          "Var2": "targeted treatment",
          "value": 0.0467,
          "x": 2015,
          "y": 0.0467
        },
        {
          "Var1": 2016,
          "Var2": "targeted treatment",
          "value": 0.0679,
          "x": 2016,
          "y": 0.0679
        },
        {
          "Var1": 2017,
          "Var2": "targeted treatment",
          "value": 0.0711,
          "x": 2017,
          "y": 0.0711
        }
      ],
      "type": "line"
    },
    {
      "name": "transcriptome sequencing",
      "data": [
        {
          "Var1": 2008,
          "Var2": "transcriptome sequencing",
          "value": null,
          "x": 2008,
          "y": null
        },
        {
          "Var1": 2009,
          "Var2": "transcriptome sequencing",
          "value": null,
          "x": 2009,
          "y": null
        },
        {
          "Var1": 2010,
          "Var2": "transcriptome sequencing",
          "value": null,
          "x": 2010,
          "y": null
        },
        {
          "Var1": 2011,
          "Var2": "transcriptome sequencing",
          "value": null,
          "x": 2011,
          "y": null
        },
        {
          "Var1": 2012,
          "Var2": "transcriptome sequencing",
          "value": null,
          "x": 2012,
          "y": null
        },
        {
          "Var1": 2013,
          "Var2": "transcriptome sequencing",
          "value": 0.0214,
          "x": 2013,
          "y": 0.0214
        },
        {
          "Var1": 2014,
          "Var2": "transcriptome sequencing",
          "value": 0.0225,
          "x": 2014,
          "y": 0.0225
        },
        {
          "Var1": 2015,
          "Var2": "transcriptome sequencing",
          "value": 0.0503,
          "x": 2015,
          "y": 0.0503
        },
        {
          "Var1": 2016,
          "Var2": "transcriptome sequencing",
          "value": 0.053,
          "x": 2016,
          "y": 0.053
        },
        {
          "Var1": 2017,
          "Var2": "transcriptome sequencing",
          "value": 0.065,
          "x": 2017,
          "y": 0.065
        }
      ],
      "type": "line"
    },
    {
      "name": "Zika Virus",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Zika Virus",
          "value": null,
          "x": 2008,
          "y": null
        },
        {
          "Var1": 2009,
          "Var2": "Zika Virus",
          "value": null,
          "x": 2009,
          "y": null
        },
        {
          "Var1": 2010,
          "Var2": "Zika Virus",
          "value": null,
          "x": 2010,
          "y": null
        },
        {
          "Var1": 2011,
          "Var2": "Zika Virus",
          "value": null,
          "x": 2011,
          "y": null
        },
        {
          "Var1": 2012,
          "Var2": "Zika Virus",
          "value": null,
          "x": 2012,
          "y": null
        },
        {
          "Var1": 2013,
          "Var2": "Zika Virus",
          "value": null,
          "x": 2013,
          "y": null
        },
        {
          "Var1": 2014,
          "Var2": "Zika Virus",
          "value": null,
          "x": 2014,
          "y": null
        },
        {
          "Var1": 2015,
          "Var2": "Zika Virus",
          "value": null,
          "x": 2015,
          "y": null
        },
        {
          "Var1": 2016,
          "Var2": "Zika Virus",
          "value": 0.0028,
          "x": 2016,
          "y": 0.0028
        },
        {
          "Var1": 2017,
          "Var2": "Zika Virus",
          "value": 0.0157,
          "x": 2017,
          "y": 0.0157
        }
      ],
      "type": "line"
    },
    {
      "name": "Data",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Data",
          "value": 0.5252,
          "x": 2008,
          "y": 0.5252
        },
        {
          "Var1": 2009,
          "Var2": "Data",
          "value": 0.5581,
          "x": 2009,
          "y": 0.5581
        },
        {
          "Var1": 2010,
          "Var2": "Data",
          "value": 0.5349,
          "x": 2010,
          "y": 0.5349
        },
        {
          "Var1": 2011,
          "Var2": "Data",
          "value": 0.5611,
          "x": 2011,
          "y": 0.5611
        },
        {
          "Var1": 2012,
          "Var2": "Data",
          "value": 0.5625,
          "x": 2012,
          "y": 0.5625
        },
        {
          "Var1": 2013,
          "Var2": "Data",
          "value": 0.5828,
          "x": 2013,
          "y": 0.5828
        },
        {
          "Var1": 2014,
          "Var2": "Data",
          "value": 0.5833,
          "x": 2014,
          "y": 0.5833
        },
        {
          "Var1": 2015,
          "Var2": "Data",
          "value": 0.6015,
          "x": 2015,
          "y": 0.6015
        },
        {
          "Var1": 2016,
          "Var2": "Data",
          "value": 0.6134,
          "x": 2016,
          "y": 0.6134
        },
        {
          "Var1": 2017,
          "Var2": "Data",
          "value": 0.6314,
          "x": 2017,
          "y": 0.6314
        }
      ],
      "type": "line"
    },
    {
      "name": "Therapeutic",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Therapeutic",
          "value": 0.1929,
          "x": 2008,
          "y": 0.1929
        },
        {
          "Var1": 2009,
          "Var2": "Therapeutic",
          "value": 0.1956,
          "x": 2009,
          "y": 0.1956
        },
        {
          "Var1": 2010,
          "Var2": "Therapeutic",
          "value": 0.2096,
          "x": 2010,
          "y": 0.2096
        },
        {
          "Var1": 2011,
          "Var2": "Therapeutic",
          "value": 0.2226,
          "x": 2011,
          "y": 0.2226
        },
        {
          "Var1": 2012,
          "Var2": "Therapeutic",
          "value": 0.2272,
          "x": 2012,
          "y": 0.2272
        },
        {
          "Var1": 2013,
          "Var2": "Therapeutic",
          "value": 0.2425,
          "x": 2013,
          "y": 0.2425
        },
        {
          "Var1": 2014,
          "Var2": "Therapeutic",
          "value": 0.2692,
          "x": 2014,
          "y": 0.2692
        },
        {
          "Var1": 2015,
          "Var2": "Therapeutic",
          "value": 0.2586,
          "x": 2015,
          "y": 0.2586
        },
        {
          "Var1": 2016,
          "Var2": "Therapeutic",
          "value": 0.2659,
          "x": 2016,
          "y": 0.2659
        },
        {
          "Var1": 2017,
          "Var2": "Therapeutic",
          "value": 0.2684,
          "x": 2017,
          "y": 0.2684
        }
      ],
      "type": "line"
    },
    {
      "name": "mouse model",
      "data": [
        {
          "Var1": 2008,
          "Var2": "mouse model",
          "value": 0.1145,
          "x": 2008,
          "y": 0.1145
        },
        {
          "Var1": 2009,
          "Var2": "mouse model",
          "value": 0.1218,
          "x": 2009,
          "y": 0.1218
        },
        {
          "Var1": 2010,
          "Var2": "mouse model",
          "value": 0.1259,
          "x": 2010,
          "y": 0.1259
        },
        {
          "Var1": 2011,
          "Var2": "mouse model",
          "value": 0.1308,
          "x": 2011,
          "y": 0.1308
        },
        {
          "Var1": 2012,
          "Var2": "mouse model",
          "value": 0.138,
          "x": 2012,
          "y": 0.138
        },
        {
          "Var1": 2013,
          "Var2": "mouse model",
          "value": 0.1419,
          "x": 2013,
          "y": 0.1419
        },
        {
          "Var1": 2014,
          "Var2": "mouse model",
          "value": 0.1581,
          "x": 2014,
          "y": 0.1581
        },
        {
          "Var1": 2015,
          "Var2": "mouse model",
          "value": 0.1695,
          "x": 2015,
          "y": 0.1695
        },
        {
          "Var1": 2016,
          "Var2": "mouse model",
          "value": 0.1925,
          "x": 2016,
          "y": 0.1925
        },
        {
          "Var1": 2017,
          "Var2": "mouse model",
          "value": 0.1929,
          "x": 2017,
          "y": 0.1929
        }
      ],
      "type": "line"
    },
    {
      "name": "Human",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Human",
          "value": 0.4336,
          "x": 2008,
          "y": 0.4336
        },
        {
          "Var1": 2009,
          "Var2": "Human",
          "value": 0.4385,
          "x": 2009,
          "y": 0.4385
        },
        {
          "Var1": 2010,
          "Var2": "Human",
          "value": 0.4426,
          "x": 2010,
          "y": 0.4426
        },
        {
          "Var1": 2011,
          "Var2": "Human",
          "value": 0.4444,
          "x": 2011,
          "y": 0.4444
        },
        {
          "Var1": 2012,
          "Var2": "Human",
          "value": 0.4642,
          "x": 2012,
          "y": 0.4642
        },
        {
          "Var1": 2013,
          "Var2": "Human",
          "value": 0.4566,
          "x": 2013,
          "y": 0.4566
        },
        {
          "Var1": 2014,
          "Var2": "Human",
          "value": 0.4766,
          "x": 2014,
          "y": 0.4766
        },
        {
          "Var1": 2015,
          "Var2": "Human",
          "value": 0.4945,
          "x": 2015,
          "y": 0.4945
        },
        {
          "Var1": 2016,
          "Var2": "Human",
          "value": 0.5114,
          "x": 2016,
          "y": 0.5114
        },
        {
          "Var1": 2017,
          "Var2": "Human",
          "value": 0.4963,
          "x": 2017,
          "y": 0.4963
        }
      ],
      "type": "line"
    },
    {
      "name": "CRISPR/Cas technology",
      "data": [
        {
          "Var1": 2008,
          "Var2": "CRISPR/Cas technology",
          "value": null,
          "x": 2008,
          "y": null
        },
        {
          "Var1": 2009,
          "Var2": "CRISPR/Cas technology",
          "value": null,
          "x": 2009,
          "y": null
        },
        {
          "Var1": 2010,
          "Var2": "CRISPR/Cas technology",
          "value": null,
          "x": 2010,
          "y": null
        },
        {
          "Var1": 2011,
          "Var2": "CRISPR/Cas technology",
          "value": null,
          "x": 2011,
          "y": null
        },
        {
          "Var1": 2012,
          "Var2": "CRISPR/Cas technology",
          "value": null,
          "x": 2012,
          "y": null
        },
        {
          "Var1": 2013,
          "Var2": "CRISPR/Cas technology",
          "value": null,
          "x": 2013,
          "y": null
        },
        {
          "Var1": 2014,
          "Var2": "CRISPR/Cas technology",
          "value": null,
          "x": 2014,
          "y": null
        },
        {
          "Var1": 2015,
          "Var2": "CRISPR/Cas technology",
          "value": null,
          "x": 2015,
          "y": null
        },
        {
          "Var1": 2016,
          "Var2": "CRISPR/Cas technology",
          "value": 0.026,
          "x": 2016,
          "y": 0.026
        },
        {
          "Var1": 2017,
          "Var2": "CRISPR/Cas technology",
          "value": 0.0355,
          "x": 2017,
          "y": 0.0355
        }
      ],
      "type": "line"
    }
  ],
  "legend": {
    "align": "right",
    "layout": "vertical"
  }
}
);
});</script>
First thought: Wow! In 2008, only 40% of new funded NIH R-series grants
had ‘novel’ as a Project Term and now nearly 57% do. So if you want to
get your grant funded, throw a few mentions of ‘novel’ in there ;)

Second thought: some of the less frequent terms the most interesting. In
2013, only 2% of funded funded NIH R-series grants had ‘transcriptome
sequencing’ as a Project Term but this has steadily increased to now
over 6%! Similarly, CRISPR/Cas technology increased from 2.6% to 3.6%
from 2016 to 2017. Most interestingly, in my opinion, is the rise in
Zika Virus related projects following the [2015-2016 Zika
epidemic](https://en.wikipedia.org/wiki/2015%E2%80%9316_Zika_virus_epidemic).

Question 3: Is my research field fundable?
==========================================

I’m going to look through a few terms related to my own work.

``` r
words <- c('Computer software', 'Statistical Methods', 'open source', 'single cell technology', 'tumor microenvironment', 'precision medicine')
df <- do.call(cbind, lapply(words, function(word) {
  word.freq <- unlist(lapply(freq, function(x) {
    x[word]
  }))
  word.freq/norm
}))
rownames(df) <- 2008:2017
colnames(df) <- words

library(reshape2)
dfm <- melt(df)

library(highcharter)
hc2 <- highchart() %>% 
  hc_add_series(dfm, "line", hcaes(x = Var1, y = value, group = Var2)) %>%
  hc_title(text = 'Frequency of Jean\'s Project Terms in New Funded R-series Grants') %>%
  hc_legend(align = "right", layout = "vertical")
```

``` r
send_hc_to_js(hc2, 'hc2')
```

<span id="hc2"></span>
<script>$(function(){
    $('#hc2').highcharts(
{
  "title": {
    "text": "Frequency of Jean's Project Terms in New Funded R-series Grants"
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
      "name": "Computer software",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Computer software",
          "value": 0.0458,
          "x": 2008,
          "y": 0.0458
        },
        {
          "Var1": 2009,
          "Var2": "Computer software",
          "value": 0.0449,
          "x": 2009,
          "y": 0.0449
        },
        {
          "Var1": 2010,
          "Var2": "Computer software",
          "value": 0.0476,
          "x": 2010,
          "y": 0.0476
        },
        {
          "Var1": 2011,
          "Var2": "Computer software",
          "value": 0.0407,
          "x": 2011,
          "y": 0.0407
        },
        {
          "Var1": 2012,
          "Var2": "Computer software",
          "value": 0.0496,
          "x": 2012,
          "y": 0.0496
        },
        {
          "Var1": 2013,
          "Var2": "Computer software",
          "value": 0.0449,
          "x": 2013,
          "y": 0.0449
        },
        {
          "Var1": 2014,
          "Var2": "Computer software",
          "value": 0.0393,
          "x": 2014,
          "y": 0.0393
        },
        {
          "Var1": 2015,
          "Var2": "Computer software",
          "value": 0.0378,
          "x": 2015,
          "y": 0.0378
        },
        {
          "Var1": 2016,
          "Var2": "Computer software",
          "value": 0.0405,
          "x": 2016,
          "y": 0.0405
        },
        {
          "Var1": 2017,
          "Var2": "Computer software",
          "value": 0.0414,
          "x": 2017,
          "y": 0.0414
        }
      ],
      "type": "line"
    },
    {
      "name": "Statistical Methods",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Statistical Methods",
          "value": 0.0122,
          "x": 2008,
          "y": 0.0122
        },
        {
          "Var1": 2009,
          "Var2": "Statistical Methods",
          "value": 0.0129,
          "x": 2009,
          "y": 0.0129
        },
        {
          "Var1": 2010,
          "Var2": "Statistical Methods",
          "value": 0.0128,
          "x": 2010,
          "y": 0.0128
        },
        {
          "Var1": 2011,
          "Var2": "Statistical Methods",
          "value": 0.0111,
          "x": 2011,
          "y": 0.0111
        },
        {
          "Var1": 2012,
          "Var2": "Statistical Methods",
          "value": 0.0142,
          "x": 2012,
          "y": 0.0142
        },
        {
          "Var1": 2013,
          "Var2": "Statistical Methods",
          "value": 0.0143,
          "x": 2013,
          "y": 0.0143
        },
        {
          "Var1": 2014,
          "Var2": "Statistical Methods",
          "value": 0.0126,
          "x": 2014,
          "y": 0.0126
        },
        {
          "Var1": 2015,
          "Var2": "Statistical Methods",
          "value": 0.0138,
          "x": 2015,
          "y": 0.0138
        },
        {
          "Var1": 2016,
          "Var2": "Statistical Methods",
          "value": 0.0127,
          "x": 2016,
          "y": 0.0127
        },
        {
          "Var1": 2017,
          "Var2": "Statistical Methods",
          "value": 0.0136,
          "x": 2017,
          "y": 0.0136
        }
      ],
      "type": "line"
    },
    {
      "name": "open source",
      "data": [
        {
          "Var1": 2008,
          "Var2": "open source",
          "value": 0.0067,
          "x": 2008,
          "y": 0.0067
        },
        {
          "Var1": 2009,
          "Var2": "open source",
          "value": 0.0076,
          "x": 2009,
          "y": 0.0076
        },
        {
          "Var1": 2010,
          "Var2": "open source",
          "value": 0.0078,
          "x": 2010,
          "y": 0.0078
        },
        {
          "Var1": 2011,
          "Var2": "open source",
          "value": 0.0067,
          "x": 2011,
          "y": 0.0067
        },
        {
          "Var1": 2012,
          "Var2": "open source",
          "value": 0.0064,
          "x": 2012,
          "y": 0.0064
        },
        {
          "Var1": 2013,
          "Var2": "open source",
          "value": 0.0088,
          "x": 2013,
          "y": 0.0088
        },
        {
          "Var1": 2014,
          "Var2": "open source",
          "value": 0.0075,
          "x": 2014,
          "y": 0.0075
        },
        {
          "Var1": 2015,
          "Var2": "open source",
          "value": 0.0084,
          "x": 2015,
          "y": 0.0084
        },
        {
          "Var1": 2016,
          "Var2": "open source",
          "value": 0.0092,
          "x": 2016,
          "y": 0.0092
        },
        {
          "Var1": 2017,
          "Var2": "open source",
          "value": 0.0091,
          "x": 2017,
          "y": 0.0091
        }
      ],
      "type": "line"
    },
    {
      "name": "single cell technology",
      "data": [
        {
          "Var1": 2008,
          "Var2": "single cell technology",
          "value": null,
          "x": 2008,
          "y": null
        },
        {
          "Var1": 2009,
          "Var2": "single cell technology",
          "value": null,
          "x": 2009,
          "y": null
        },
        {
          "Var1": 2010,
          "Var2": "single cell technology",
          "value": null,
          "x": 2010,
          "y": null
        },
        {
          "Var1": 2011,
          "Var2": "single cell technology",
          "value": null,
          "x": 2011,
          "y": null
        },
        {
          "Var1": 2012,
          "Var2": "single cell technology",
          "value": null,
          "x": 2012,
          "y": null
        },
        {
          "Var1": 2013,
          "Var2": "single cell technology",
          "value": null,
          "x": 2013,
          "y": null
        },
        {
          "Var1": 2014,
          "Var2": "single cell technology",
          "value": null,
          "x": 2014,
          "y": null
        },
        {
          "Var1": 2015,
          "Var2": "single cell technology",
          "value": null,
          "x": 2015,
          "y": null
        },
        {
          "Var1": 2016,
          "Var2": "single cell technology",
          "value": 0.0002,
          "x": 2016,
          "y": 0.0002
        },
        {
          "Var1": 2017,
          "Var2": "single cell technology",
          "value": 0.0016,
          "x": 2017,
          "y": 0.0016
        }
      ],
      "type": "line"
    },
    {
      "name": "tumor microenvironment",
      "data": [
        {
          "Var1": 2008,
          "Var2": "tumor microenvironment",
          "value": null,
          "x": 2008,
          "y": null
        },
        {
          "Var1": 2009,
          "Var2": "tumor microenvironment",
          "value": null,
          "x": 2009,
          "y": null
        },
        {
          "Var1": 2010,
          "Var2": "tumor microenvironment",
          "value": null,
          "x": 2010,
          "y": null
        },
        {
          "Var1": 2011,
          "Var2": "tumor microenvironment",
          "value": null,
          "x": 2011,
          "y": null
        },
        {
          "Var1": 2012,
          "Var2": "tumor microenvironment",
          "value": null,
          "x": 2012,
          "y": null
        },
        {
          "Var1": 2013,
          "Var2": "tumor microenvironment",
          "value": 0.0132,
          "x": 2013,
          "y": 0.0132
        },
        {
          "Var1": 2014,
          "Var2": "tumor microenvironment",
          "value": 0.0123,
          "x": 2014,
          "y": 0.0123
        },
        {
          "Var1": 2015,
          "Var2": "tumor microenvironment",
          "value": 0.0137,
          "x": 2015,
          "y": 0.0137
        },
        {
          "Var1": 2016,
          "Var2": "tumor microenvironment",
          "value": 0.015,
          "x": 2016,
          "y": 0.015
        },
        {
          "Var1": 2017,
          "Var2": "tumor microenvironment",
          "value": 0.0182,
          "x": 2017,
          "y": 0.0182
        }
      ],
      "type": "line"
    },
    {
      "name": "precision medicine",
      "data": [
        {
          "Var1": 2008,
          "Var2": "precision medicine",
          "value": null,
          "x": 2008,
          "y": null
        },
        {
          "Var1": 2009,
          "Var2": "precision medicine",
          "value": null,
          "x": 2009,
          "y": null
        },
        {
          "Var1": 2010,
          "Var2": "precision medicine",
          "value": null,
          "x": 2010,
          "y": null
        },
        {
          "Var1": 2011,
          "Var2": "precision medicine",
          "value": null,
          "x": 2011,
          "y": null
        },
        {
          "Var1": 2012,
          "Var2": "precision medicine",
          "value": null,
          "x": 2012,
          "y": null
        },
        {
          "Var1": 2013,
          "Var2": "precision medicine",
          "value": null,
          "x": 2013,
          "y": null
        },
        {
          "Var1": 2014,
          "Var2": "precision medicine",
          "value": null,
          "x": 2014,
          "y": null
        },
        {
          "Var1": 2015,
          "Var2": "precision medicine",
          "value": 0.0031,
          "x": 2015,
          "y": 0.0031
        },
        {
          "Var1": 2016,
          "Var2": "precision medicine",
          "value": 0.0121,
          "x": 2016,
          "y": 0.0121
        },
        {
          "Var1": 2017,
          "Var2": "precision medicine",
          "value": 0.0183,
          "x": 2017,
          "y": 0.0183
        }
      ],
      "type": "line"
    }
  ],
  "legend": {
    "align": "right",
    "layout": "vertical"
  }
}
);
});</script>
Unfortunately, looking at the y-axis, fairly few grants with
computational and statistical project terms get funded each year and
there does not seem to be an increasing trend. This is not so say that a
grant with computational and statistical aims can’t get funded. But
perhaps the primary emphasis of your grant should be on the
precision-medicine-related biological applications rather than the
open-source nature of your project ;)

Other observations
==================

``` r
words <- c("follow-up", "Surveys", "Questionnaires", "Small Interfering RNA", "Mental Health", "depressive symptoms", "Drug abuse", "Substance abuse problem")
df <- do.call(cbind, lapply(words, function(word) {
  word.freq <- unlist(lapply(freq, function(x) {
    x[word]
  }))
  word.freq/norm
}))
rownames(df) <- 2008:2017
colnames(df) <- words

library(reshape2)
dfm <- melt(df)

library(highcharter)
hc3 <- highchart() %>% 
  hc_add_series(dfm, "line", hcaes(x = Var1, y = value, group = Var2)) %>%
  hc_title(text = 'Frequency of Select Project Terms in New Funded R-series Grants') %>%
  hc_legend(align = "right", layout = "vertical")
```

``` r
send_hc_to_js(hc3, 'hc3')
```

<span id="hc3"></span>
<script>$(function(){
    $('#hc3').highcharts(
{
  "title": {
    "text": "Frequency of Select Project Terms in New Funded R-series Grants"
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
      "name": "follow-up",
      "data": [
        {
          "Var1": 2008,
          "Var2": "follow-up",
          "value": 0.0767,
          "x": 2008,
          "y": 0.0767
        },
        {
          "Var1": 2009,
          "Var2": "follow-up",
          "value": 0.0794,
          "x": 2009,
          "y": 0.0794
        },
        {
          "Var1": 2010,
          "Var2": "follow-up",
          "value": 0.0735,
          "x": 2010,
          "y": 0.0735
        },
        {
          "Var1": 2011,
          "Var2": "follow-up",
          "value": 0.0793,
          "x": 2011,
          "y": 0.0793
        },
        {
          "Var1": 2012,
          "Var2": "follow-up",
          "value": 0.0794,
          "x": 2012,
          "y": 0.0794
        },
        {
          "Var1": 2013,
          "Var2": "follow-up",
          "value": 0.0782,
          "x": 2013,
          "y": 0.0782
        },
        {
          "Var1": 2014,
          "Var2": "follow-up",
          "value": 0.0767,
          "x": 2014,
          "y": 0.0767
        },
        {
          "Var1": 2015,
          "Var2": "follow-up",
          "value": 0.0751,
          "x": 2015,
          "y": 0.0751
        },
        {
          "Var1": 2016,
          "Var2": "follow-up",
          "value": 0.0735,
          "x": 2016,
          "y": 0.0735
        },
        {
          "Var1": 2017,
          "Var2": "follow-up",
          "value": 0.0678,
          "x": 2017,
          "y": 0.0678
        }
      ],
      "type": "line"
    },
    {
      "name": "Surveys",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Surveys",
          "value": 0.0569,
          "x": 2008,
          "y": 0.0569
        },
        {
          "Var1": 2009,
          "Var2": "Surveys",
          "value": 0.0572,
          "x": 2009,
          "y": 0.0572
        },
        {
          "Var1": 2010,
          "Var2": "Surveys",
          "value": 0.0545,
          "x": 2010,
          "y": 0.0545
        },
        {
          "Var1": 2011,
          "Var2": "Surveys",
          "value": 0.0519,
          "x": 2011,
          "y": 0.0519
        },
        {
          "Var1": 2012,
          "Var2": "Surveys",
          "value": 0.0532,
          "x": 2012,
          "y": 0.0532
        },
        {
          "Var1": 2013,
          "Var2": "Surveys",
          "value": 0.0515,
          "x": 2013,
          "y": 0.0515
        },
        {
          "Var1": 2014,
          "Var2": "Surveys",
          "value": 0.0502,
          "x": 2014,
          "y": 0.0502
        },
        {
          "Var1": 2015,
          "Var2": "Surveys",
          "value": 0.0438,
          "x": 2015,
          "y": 0.0438
        },
        {
          "Var1": 2016,
          "Var2": "Surveys",
          "value": 0.0414,
          "x": 2016,
          "y": 0.0414
        },
        {
          "Var1": 2017,
          "Var2": "Surveys",
          "value": 0.0447,
          "x": 2017,
          "y": 0.0447
        }
      ],
      "type": "line"
    },
    {
      "name": "Questionnaires",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Questionnaires",
          "value": 0.0269,
          "x": 2008,
          "y": 0.0269
        },
        {
          "Var1": 2009,
          "Var2": "Questionnaires",
          "value": 0.0277,
          "x": 2009,
          "y": 0.0277
        },
        {
          "Var1": 2010,
          "Var2": "Questionnaires",
          "value": 0.0242,
          "x": 2010,
          "y": 0.0242
        },
        {
          "Var1": 2011,
          "Var2": "Questionnaires",
          "value": 0.021,
          "x": 2011,
          "y": 0.021
        },
        {
          "Var1": 2012,
          "Var2": "Questionnaires",
          "value": 0.0233,
          "x": 2012,
          "y": 0.0233
        },
        {
          "Var1": 2013,
          "Var2": "Questionnaires",
          "value": 0.0184,
          "x": 2013,
          "y": 0.0184
        },
        {
          "Var1": 2014,
          "Var2": "Questionnaires",
          "value": 0.0157,
          "x": 2014,
          "y": 0.0157
        },
        {
          "Var1": 2015,
          "Var2": "Questionnaires",
          "value": 0.0152,
          "x": 2015,
          "y": 0.0152
        },
        {
          "Var1": 2016,
          "Var2": "Questionnaires",
          "value": 0.0162,
          "x": 2016,
          "y": 0.0162
        },
        {
          "Var1": 2017,
          "Var2": "Questionnaires",
          "value": 0.0165,
          "x": 2017,
          "y": 0.0165
        }
      ],
      "type": "line"
    },
    {
      "name": "Small Interfering RNA",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Small Interfering RNA",
          "value": 0.034,
          "x": 2008,
          "y": 0.034
        },
        {
          "Var1": 2009,
          "Var2": "Small Interfering RNA",
          "value": 0.0292,
          "x": 2009,
          "y": 0.0292
        },
        {
          "Var1": 2010,
          "Var2": "Small Interfering RNA",
          "value": 0.0305,
          "x": 2010,
          "y": 0.0305
        },
        {
          "Var1": 2011,
          "Var2": "Small Interfering RNA",
          "value": 0.0244,
          "x": 2011,
          "y": 0.0244
        },
        {
          "Var1": 2012,
          "Var2": "Small Interfering RNA",
          "value": 0.0259,
          "x": 2012,
          "y": 0.0259
        },
        {
          "Var1": 2013,
          "Var2": "Small Interfering RNA",
          "value": 0.0204,
          "x": 2013,
          "y": 0.0204
        },
        {
          "Var1": 2014,
          "Var2": "Small Interfering RNA",
          "value": 0.0217,
          "x": 2014,
          "y": 0.0217
        },
        {
          "Var1": 2015,
          "Var2": "Small Interfering RNA",
          "value": 0.0231,
          "x": 2015,
          "y": 0.0231
        },
        {
          "Var1": 2016,
          "Var2": "Small Interfering RNA",
          "value": 0.019,
          "x": 2016,
          "y": 0.019
        },
        {
          "Var1": 2017,
          "Var2": "Small Interfering RNA",
          "value": 0.0204,
          "x": 2017,
          "y": 0.0204
        }
      ],
      "type": "line"
    },
    {
      "name": "Mental Health",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Mental Health",
          "value": 0.0331,
          "x": 2008,
          "y": 0.0331
        },
        {
          "Var1": 2009,
          "Var2": "Mental Health",
          "value": 0.0343,
          "x": 2009,
          "y": 0.0343
        },
        {
          "Var1": 2010,
          "Var2": "Mental Health",
          "value": 0.0336,
          "x": 2010,
          "y": 0.0336
        },
        {
          "Var1": 2011,
          "Var2": "Mental Health",
          "value": 0.0315,
          "x": 2011,
          "y": 0.0315
        },
        {
          "Var1": 2012,
          "Var2": "Mental Health",
          "value": 0.032,
          "x": 2012,
          "y": 0.032
        },
        {
          "Var1": 2013,
          "Var2": "Mental Health",
          "value": 0.0398,
          "x": 2013,
          "y": 0.0398
        },
        {
          "Var1": 2014,
          "Var2": "Mental Health",
          "value": 0.029,
          "x": 2014,
          "y": 0.029
        },
        {
          "Var1": 2015,
          "Var2": "Mental Health",
          "value": 0.027,
          "x": 2015,
          "y": 0.027
        },
        {
          "Var1": 2016,
          "Var2": "Mental Health",
          "value": 0.0273,
          "x": 2016,
          "y": 0.0273
        },
        {
          "Var1": 2017,
          "Var2": "Mental Health",
          "value": 0.0327,
          "x": 2017,
          "y": 0.0327
        }
      ],
      "type": "line"
    },
    {
      "name": "depressive symptoms",
      "data": [
        {
          "Var1": 2008,
          "Var2": "depressive symptoms",
          "value": 0.015,
          "x": 2008,
          "y": 0.015
        },
        {
          "Var1": 2009,
          "Var2": "depressive symptoms",
          "value": 0.0183,
          "x": 2009,
          "y": 0.0183
        },
        {
          "Var1": 2010,
          "Var2": "depressive symptoms",
          "value": 0.0146,
          "x": 2010,
          "y": 0.0146
        },
        {
          "Var1": 2011,
          "Var2": "depressive symptoms",
          "value": 0.0146,
          "x": 2011,
          "y": 0.0146
        },
        {
          "Var1": 2012,
          "Var2": "depressive symptoms",
          "value": 0.0166,
          "x": 2012,
          "y": 0.0166
        },
        {
          "Var1": 2013,
          "Var2": "depressive symptoms",
          "value": 0.0143,
          "x": 2013,
          "y": 0.0143
        },
        {
          "Var1": 2014,
          "Var2": "depressive symptoms",
          "value": 0.0124,
          "x": 2014,
          "y": 0.0124
        },
        {
          "Var1": 2015,
          "Var2": "depressive symptoms",
          "value": 0.0126,
          "x": 2015,
          "y": 0.0126
        },
        {
          "Var1": 2016,
          "Var2": "depressive symptoms",
          "value": 0.0148,
          "x": 2016,
          "y": 0.0148
        },
        {
          "Var1": 2017,
          "Var2": "depressive symptoms",
          "value": 0.0167,
          "x": 2017,
          "y": 0.0167
        }
      ],
      "type": "line"
    },
    {
      "name": "Drug abuse",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Drug abuse",
          "value": 0.0177,
          "x": 2008,
          "y": 0.0177
        },
        {
          "Var1": 2009,
          "Var2": "Drug abuse",
          "value": 0.0189,
          "x": 2009,
          "y": 0.0189
        },
        {
          "Var1": 2010,
          "Var2": "Drug abuse",
          "value": 0.0145,
          "x": 2010,
          "y": 0.0145
        },
        {
          "Var1": 2011,
          "Var2": "Drug abuse",
          "value": 0.0132,
          "x": 2011,
          "y": 0.0132
        },
        {
          "Var1": 2012,
          "Var2": "Drug abuse",
          "value": 0.0151,
          "x": 2012,
          "y": 0.0151
        },
        {
          "Var1": 2013,
          "Var2": "Drug abuse",
          "value": 0.0136,
          "x": 2013,
          "y": 0.0136
        },
        {
          "Var1": 2014,
          "Var2": "Drug abuse",
          "value": 0.012,
          "x": 2014,
          "y": 0.012
        },
        {
          "Var1": 2015,
          "Var2": "Drug abuse",
          "value": 0.0085,
          "x": 2015,
          "y": 0.0085
        },
        {
          "Var1": 2016,
          "Var2": "Drug abuse",
          "value": 0.01,
          "x": 2016,
          "y": 0.01
        },
        {
          "Var1": 2017,
          "Var2": "Drug abuse",
          "value": 0.0081,
          "x": 2017,
          "y": 0.0081
        }
      ],
      "type": "line"
    },
    {
      "name": "Substance abuse problem",
      "data": [
        {
          "Var1": 2008,
          "Var2": "Substance abuse problem",
          "value": 0.0203,
          "x": 2008,
          "y": 0.0203
        },
        {
          "Var1": 2009,
          "Var2": "Substance abuse problem",
          "value": 0.0208,
          "x": 2009,
          "y": 0.0208
        },
        {
          "Var1": 2010,
          "Var2": "Substance abuse problem",
          "value": 0.0202,
          "x": 2010,
          "y": 0.0202
        },
        {
          "Var1": 2011,
          "Var2": "Substance abuse problem",
          "value": 0.0126,
          "x": 2011,
          "y": 0.0126
        },
        {
          "Var1": 2012,
          "Var2": "Substance abuse problem",
          "value": 0.0145,
          "x": 2012,
          "y": 0.0145
        },
        {
          "Var1": 2013,
          "Var2": "Substance abuse problem",
          "value": 0.0143,
          "x": 2013,
          "y": 0.0143
        },
        {
          "Var1": 2014,
          "Var2": "Substance abuse problem",
          "value": 0.0138,
          "x": 2014,
          "y": 0.0138
        },
        {
          "Var1": 2015,
          "Var2": "Substance abuse problem",
          "value": 0.0116,
          "x": 2015,
          "y": 0.0116
        },
        {
          "Var1": 2016,
          "Var2": "Substance abuse problem",
          "value": 0.0115,
          "x": 2016,
          "y": 0.0115
        },
        {
          "Var1": 2017,
          "Var2": "Substance abuse problem",
          "value": 0.0084,
          "x": 2017,
          "y": 0.0084
        }
      ],
      "type": "line"
    }
  ],
  "legend": {
    "align": "right",
    "layout": "vertical"
  }
}
);
});</script>
Projects related to follow-up studies seems to be going down slightly.
This is consistent with the increasing important of innovation and
novelty. Similarly, projects related to surveys and questionaires is
going down. This is consistent with the increasing emphasis on mouse
modules and molecular mechanisms. Likewise, projects related to siRNAs
is going down, consistent with the increasing preference to CRISPR/Cas.

Unfortunately, unlike Zika, we are not seeing a substantial increase in
the proportion of funded projects related to mental health or drug abuse
despite recent epidemics in these areas.

Discussion
==========

So in conclusion, if you want your next NIH R-series grant to get
funded, all you have to do is write a project about a ‘novel’
‘CRISPR/Cas’ ‘mouse model’ to discover ‘targeted treatment’
‘Therapeutics’s for the ’Zika virus’ in ’Human’s! Just kidding. But
hopefully the availability of this kind of data can at least help guide our grant
writing with more informed word-choices and research topics.

Keep in mind that this analysis is by no means exhaustive. Certain terms
and topics may be represented differently across different years,
confounding trends. It is also unclear how these Project Terms are
auto-generated for each grant and if biases may be introduced during
that stage.

Other potentially interesting questions:
- Are certain topics more common in R1 vs. R2 vs. R3 institutions?
- Which schools are getting lots of grants in your research area of interest?
- Can we intergrate natural language processing and topic modeling to see if certain groups
of terms (rather than individual terms) are enriched in the most
commonly funded grants or are super hot and increasing in frequency over
time?
