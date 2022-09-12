---
title: "I use R to (try to) figure out the cost of medical procedures by analyzing insurance data from the Transparency in Coverage Final Rule"
layout: post
comments: false
tags: [R, tutorial, fun, health insurance]
---

<style>
pre code{
  white-space: pre;
}
</style>

As part of my teaching philosophy, I aim to demonstrate by example to my
students how coding is an immensely useful and transferable skill for
lots of other fun things beyond the spatial transcriptomics data
analysis and research we do in lab. In this blog post, I use coding in R
to (try to) figure out the cost of medical procedures by analyzing
insurance data from the [Transparency in Coverage Final Rule](https://www.cms.gov/healthplan-price-transparency).

## Background

On July 1, 2022, the Transparency in Coverage Final Rule went into
effect, requiring insurance providers to publicly display in-network
provider negotiated rates, historical out-of-network and allowed amounts
through Machine-Readable Files on an internet website. According to [the
Centers for Medicare and Medicaid Services
website](https://www.cms.gov/newsroom/fact-sheets/transparency-coverage-final-rule-fact-sheet-cms-9915-f),
“making this information available to the public will drive innovation,
support informed, price-conscious decision-making, and promote
competition in the health care industry.”

I consider myself to be a “price-conscious” consumer. So perhaps I can
use all this data to become more “informed” about the prices of medical
procedures to make more financially savvy decisions regarding my health
care. And since all this data is available, I should be able to do that!
Right?

Well, available is not the same as accessible. And even if data is
accessible, it still needs to be analyzed and interpreted in order to
achieve impact. [Analyzing and interpreting (and even just looking at)
this data has proven very
challenging](https://www.dolthub.com/blog/2022-09-02-a-trillion-prices/)
simply given the its size. There are also a lot of intricacies of the
American healthcare system that I imagine is quite challenging to
systematically encode but then also read out, process, and understand.

But surely, I, as a Harvard-education PhD-trained Hopkins professor in
biomedical research with over 2 decades experience in big data analysis,
am one of the most qualified people to attempt the “informed,
price-conscious decision-making” that this data is supposed to
enable…right?

Let’s go on a journey to find out.

## The journey to accessing the available data

To keep the data size manageable, I elected to focus on one insurance
provider - my insurance provider - Care First Blue Cross Blue Shield.
Further, different insurance plans within Care First Blue Cross Blue
Shield have differing levels of coverage so I will focus on one plan -
the plan I have - the PPO plan. I visited the [Care First Blue Cross
Blue Shield
website](https://individual.carefirst.com/individuals-families/mandates-policies/machine-readable-file.page)
and downloaded the appropriate `Table-Of-Content-Carefirst-PPO.json`
file. I can use the `jsonlite` package to read in the contents.

``` r
library(jsonlite)
file <- '~/Downloads/Table-Of-Content-Carefirst-PPO.json'
toc <- jsonlite::fromJSON(txt=file)

## look at toc
names(toc)
```

    ## [1] "reporting_entity_name" "reporting_entity_type" "reporting_structure"

``` r
toc$reporting_entity_name
```

    ## [1] "CareFirst Inc"

``` r
toc$reporting_entity_type
```

    ## [1] "HEALTH INSURANCE ISSUER"

``` r
names(toc$reporting_structure)
```

    ## [1] "reporting_plans"     "in_network_files"    "allowed_amount_file"

What the heck are these? I just wanted a list of medical procedures and
prices…

To understand these terms, we need to reference the [technical
implementation guides provided by the
CMS](https://github.com/CMSgov/price-transparency-guide/tree/master/schemas/table-of-tocs).
Such a schema allows all insurers to provide data in the same format to
enable machine readability. I can see that the Care First Blue Cross
Blue Shield PPO Table of tocs conforms to this schema.

Based on this schema, the toc I care about is under `in_network_files`,
which will provide links to “a full fully qualified domain name on where
the in-network data can be downloaded”. And [referencing the technical
implementation guides for the in-network
data](https://github.com/CMSgov/price-transparency-guide/tree/master/schemas/in-network-rates),
these files should contain the `negotiated_prices` e.g. “an array of
negotiated price objects defines information about the type of
negotiated rate as well as the dollar amount of the negotiated rate”,
which is what I want.

So how many of these `in_network_files` are there?

``` r
head(toc$reporting_structure$in_network_files[[1]])
```

    ##                     description
    ## 1 Carefirst in-network PPO file
    ## 2 Carefirst in-network PPO file
    ## 3 Carefirst in-network PPO file
    ## 4 Carefirst in-network PPO file
    ## 5 Carefirst in-network PPO file
    ## 6 Carefirst in-network PPO file
    ##                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  location
    ## 1 https://carefirstbcbs.mrf.bcbs.com/2022-09_690_08B0_in-network-rates_10_of_35.json.gz?&Expires=1666122639&Signature=1qDBcaMgCNcLSBKE2Pt7I1dj3hNbscgyeBO5d3cLyzKTyz-~4hrXX0nxsufwQZ-EoS10IDabitBxgoCvna1SiQ7dsdPz3I1knutSR1QHtCWrAqAowcg3pnwPGtOPaxxWNu2ZdTIJH76X065oMYaCt1Ft~dAx04J3ehKsaohWDnDkeFv5n-db51ebF5SEr2Sk~b0v7qOhDFx9bdrmFKAllrVHEDsYYBNu-CC1DElmk5m8lF3uj0yCQiJNew-k7FqAKkkMftaEjryPmocG-dK--bjusG7Tx-6YDuFifZzAXqlwMqLViMe8oNEhJPb~OZUB2z8Xb6vCpUWZgIFWtsnEsA__&Key-Pair-Id=K27TQMT39R1C8A
    ## 2 https://carefirstbcbs.mrf.bcbs.com/2022-09_690_08B0_in-network-rates_11_of_35.json.gz?&Expires=1666122639&Signature=k03X4oF8VTX8zUDQZOvpGySYCEJrUQkogP3rj0Hd8E4oyUKORnkEKQ7QL3jeGwifYra4a11xnWff6M2sOKdI7iQadT0maV16RFkD5GeOGYiHzEa-JWYhX~HjzZhIYyErmqx~qF71Xc4rdvHq4FuPnA~OOE0F2B4bydVQBpLpITvOWhVxfCLWS3Xn5Zm3IjHQJFXofZD86XhBG0F0WLljKWItY0F~6ke93BxmAeBJG5WPeZZO5~8hrgeWuYQAKdz~VF0RfSA8dsR2yfWMbrRec~K4id01zW8q44SVyAtwgAkG-fhiwR7wi2b7VfmApwZfxBvsPjxHHHj-SMwVO1aL9g__&Key-Pair-Id=K27TQMT39R1C8A
    ## 3 https://carefirstbcbs.mrf.bcbs.com/2022-09_690_08B0_in-network-rates_12_of_35.json.gz?&Expires=1666122639&Signature=gfREfcfxVBAXtUGHz73SMdA15D5ZvVQozRAfOGDIg85uB4oaOiEhYzTOUde8~PBrHKKktJjcmYcZoraBolfXSIb8NaP6YOmrjwcKnk~KyH1Ky9yzRJR0Hm4dPEvva40SDQIceds8Z4bPu7OxWlYh7NbbKp5-6WxVAJwq5YNoFY1WlsecDslbGidOvLoQIwDWSMrtZPhg5Tz9uemPq3NOwo74q9w-LRwJseO5M8PFjBFUkCcj~0KiKypNsseO7UxUnIxED-n3llNdd3fY4kLunhIARmaEcL09BPOfrXVFiIUHDKovpZG7wPS-5CHf~vvwxv~qttmZLlM8nKh7vquuJw__&Key-Pair-Id=K27TQMT39R1C8A
    ## 4 https://carefirstbcbs.mrf.bcbs.com/2022-09_690_08B0_in-network-rates_13_of_35.json.gz?&Expires=1666122639&Signature=Kbs~WlLrs2TnUqWCwEZg2KUwaVefXHmGclW4Oj6UUUYk7bwhtuG8WFvCZEIck-uNVDGiZO-TYGlMsVrmZwbPDnk4Z42a1zExminv-uXSbfNjvaa8B1Xxucjy-dwdEum8y5bRQtI-3Tgq8MgakWnt~6hTjBtbvzDzc0wgQj9rcRi2gNc5AKH2qTnFKRDbmtxO6ZzHCFCc99GsEchvBDIzr2k83iFWFt3SB1AXCPbj0txBenWYk7DtTjK~ENkhVtbEZYMZVezLl9Y4LG2jm8u2yLJutllyTpF13q57sy4enzquvliObm0qMRJP2sC8D~WjLzNU0TAaUQs0qOmpR51uDw__&Key-Pair-Id=K27TQMT39R1C8A
    ## 5 https://carefirstbcbs.mrf.bcbs.com/2022-09_690_08B0_in-network-rates_14_of_35.json.gz?&Expires=1666122639&Signature=HQSmq8buudkzXlZUZhwYkhlX5GGCzagOXLr-v1KnJ45BaQzXc-7DptGlHkK8Tr5tM9aWUvvRn0yanuJbw3or89ant9S5SbQ~0sPScjTX~f8v5VeHOP7Xgv4O8851DG3ztYd4nG5BOM2x2hNU~~PZFS02uzhYN4yfkWBf1t5juKCSZPN-AFGz~2H-jtxRPVPC7WXkAOFFsMnGlMrQAIftfkcL2j9G56LSRBAI7ZAD94lKrtUSFyu0zhNPoc82hDbefkPNkB4xeiH4Pm6DXoZlpX-NlOV3VM81actHLIfpQyPoWLAh9tudmLeRYX6TKARUTNgNkEEF9rVkpf3asf-gbQ__&Key-Pair-Id=K27TQMT39R1C8A
    ## 6 https://carefirstbcbs.mrf.bcbs.com/2022-09_690_08B0_in-network-rates_15_of_35.json.gz?&Expires=1666122639&Signature=fhizDdDkdBxsLH-36HyMAqu9yEfomwWlL1OiUPnoxdYPLUPG1kTRKZU89byfPbng1Cslj19spbRptacHSE7oq29zgCzsa7EXGurcmcQNR1pWOqBv6bseGnYU1U-dUcUIOhz~9XeLROU0KP5mjagcXRFq0c2QEpaX3NH1XZzd3u8EV2TRDGBtxlXFxpUpw5Na2Pl-HjKImKhiXQcUzIJZfOXIElsVPBYhqSsPbQm0TbDL7RPDTC-hd7oHIUNuG5zaaRtOzr1Qu~UtSiOsCaBvB7-zboJdVE16m8uDiEv2v9YJd5bJCPosfh4AqkAN2te0Qk07l0R4ZGi7d~ln6L65Ww__&Key-Pair-Id=K27TQMT39R1C8A

``` r
table(toc$reporting_structure$in_network_files[[1]]$description)
```

    ## 
    ## Carefirst in-network PPO file  National in-network PPO file 
    ##                           105                           568

It appears we have 105 `Carefirst in-network PPO file` and 568
`National in-network PPO file`. I am not sure the difference. I
downloaded a couple of these just to see what is the difference between
them. Turns out, they have been compiled by different “reporting
entities” such as `Highmark Blue Shield Pennsylvania` or
`Arkansas Blue Cross and Blue Shield`, etc. For myself as a consumer, I
don’t get to choose which reporting entity’s rates I abide by. For now,
I’ll just focus on the `Carefirst in-network PPO file`s.

``` r
files <- toc$reporting_structure[3,]$in_network_files[[1]]$location
vi <- toc$reporting_structure$in_network_files[[1]]$description == "Carefirst in-network PPO file"
```

So now we have the locations of these files that hopefully will have the
information we want. Let’s start scraping!

## Actually accessing the available data

Ok, let’s first take a peak at one of these `in_network_files` just to
see what we’re dealing with. We can always read about the [in network
file
schema](https://github.com/CMSgov/price-transparency-guide/tree/master/schemas/in-network-rates)
to learn more but often I prefer to just take a look. Since these files
are gzipped, we will use `gzcon` in conjunction with `jsonlite` to read
these files directly from the provided URLs without downloading the
files locally. Note: this can take a few minutes given how large the
file is.

``` r
file = files[1]
content <- jsonlite::fromJSON(gzcon(url(file)))

## look at content
names(content)
```

    ## [1] "reporting_entity_name" "reporting_entity_type" "last_updated_on"       "version"               "provider_references"   "in_network"

``` r
content$reporting_entity_name
```

    ## [1] "CareFirst BlueCross BlueShield"

``` r
content$reporting_entity_type
```

    ## [1] "health insurance issuer"

``` r
content$last_updated_on
```

    ## [1] "2020-08-27"

``` r
content$version
```

    ## [1] "1.0.0"

``` r
dim(content$provider_references)
```

    ## [1] 1764    2

So in this one file, there are 1764 `provider_references`. My
understanding is that the `negotiated_prices` we care about are
different for different providers. In theory, I, as a “informed,
price-conscious” consumer could “shop around” for different providers
based on which provider provides the best “negotiated prices” for the
medical procedures I am interested in. But this takes a lot of time. So
for now, I’m just going to try to get a sense for the range of
negotiated prices across providers. If the price range is small (ie. all
providers have roughly the same negotiated price for the medical
procedure I am interested in), then I can just pick one willy-nilly and
it wouldn’t really matter. If the price range is super large, then
perhaps I will invest more time to find the best provider. So let’s
continue digging into the `in_network` information. It looks like this
one file has in-network cost information 1079 medical procedures.

``` r
dim(content$in_network)
```

    ## [1] 1079    8

``` r
colnames(content$in_network)
```

    ## [1] "negotiation_arrangement"   "name"                      "billing_code_type"         "billing_code_type_version" "billing_code"              "description"               "negotiated_rates"          "bundled_codes"

We can take a look at one medical procedure as an example. Let’s just
look at the first one. So most of the information is about billing codes
and stuff that I as a consumer don’t really care about. What I do care
about is that this is for a “colposcopy entire vagina w/vagina/cervix
bx” or a cerivical exam.

``` r
i = 1
content$in_network[i,]$negotiation_arrangement
```

    ## [1] "bundle"

``` r
content$in_network[i,]$name
```

    ## [1] "Surgery"

``` r
content$in_network[i,]$billing_code_type
```

    ## [1] "CPT"

``` r
content$in_network[i,]$billing_code
```

    ## [1] "57421"

``` r
content$in_network[i,]$description
```

    ## [1] "colposcopy entire vagina w/vagina/cervix bx"

So how much does a cervical exam cost? Let’s take a look at the
`negotiated_rates`. Again we will notice there are around 1700
negotiated rates because different providers have negotiated different
rates. And again, I’m just going to ignore the provider information and
try to get a sense for the range of negotiated prices across providers.

``` r
colnames(content$in_network[i,]$negotiated_rates[[1]])
```

    ## [1] "provider_references" "negotiated_prices"

``` r
dim(content$in_network[i,]$negotiated_rates[[1]])
```

    ## [1] 3 2

Let’s take a look at the `negotiated_prices` for one provider as an
example.

``` r
content$in_network[i,]$negotiated_rates[[1]]$negotiated_prices[[1]]
```

    ##   negotiated_type negotiated_rate expiration_date                                                                                                   service_code billing_class
    ## 1      negotiated          269.01      9999-12-31 24, 05, 06, 07, 08, 13, 14, 15, 16, 19, 21, 22, 23, 25, 26, 31, 32, 34, 41, 42, 51, 52, 53, 55, 56, 57, 61, 65  professional
    ## 2      negotiated          356.56      9999-12-31                                 02, 03, 04, 09, 10, 11, 12, 17, 18, 20, 33, 49, 50, 54, 60, 62, 71, 72, 81, 99  professional
    ## 3      negotiated          277.98      9999-12-31 05, 06, 07, 08, 13, 14, 15, 16, 19, 21, 22, 23, 25, 26, 31, 32, 34, 41, 42, 51, 52, 53, 55, 56, 57, 61, 65, 24  professional
    ## 4      negotiated          345.06      9999-12-31                                 02, 03, 04, 09, 10, 11, 12, 17, 18, 20, 33, 49, 50, 54, 60, 62, 71, 72, 81, 99  professional

It looks like there are two different negotiated prices: 191.70 and
149.45. It is worth noting that according to the [negotiated price file
schema](https://github.com/CMSgov/price-transparency-guide/tree/master/schemas/in-network-rates#negotiated-price-object),
there are a few ways in which negotiated rates can happen: as
“negotiated”, “derived”, “fee schedule”, “percentage”, and “per diem”.
Here, the `negotiated_type` is “negotiated” which means this is “a
dollar amount, for each covered item or service under the plan or
coverage that the plan or issuer has contractually agreed to pay an
in-network provider.”

But these two different negotiated prices correspond to different
`service_code`s. What are service codes? Turns out, beyond variation by
provider, the negotiated rates also differ depending on the place the
medical procedure is conducted, which is encoded by these [service
codes](https://www.cms.gov/Medicare/Coding/place-of-service-codes/Place_of_Service_Code_Set).
For the sake of simplicity, I as a consumer, am just going to assume all
my procedures take place at an “Inpatient Hospital” defined as “A
facility, other than psychiatric, which primarily provides diagnostic,
therapeutic (both surgical and nonsurgical), and rehabilitation services
by, or under, the supervision of physicians to patients admitted for a
variety of medical conditions.” So I will focus on the
`negotiated_prices` for service code “21”.

Finally, to summarize the results for this one procedure of a cervical
exam, I will loop through all the providers and grab the negotiated
price corresponding to the service code of “21”.

``` r
x = content$in_network[i,]$negotiated_rates[[1]]$negotiated_prices
## get prices
prices <- unlist(sapply(x, function(y) y$negotiated_rate))
## which one has service code 21
sc <- unlist(sapply(x, function(y) sapply(y$service_code, function(z) '21' %in% z)))
## which one has negotiated type
nt <- unlist(sapply(x, function(y) sapply(y$negotiated_type, function(z) z == 'negotiated')))
prices[sc & nt]
```

    ## [1] 269.01 277.98 208.48 228.66 236.28

Now I will keep track of the procedure name and summarize these rates as
a minimum and a maximum using `range`.

``` r
code <- paste0(content$in_network[i,]$billing_code_type, '-', content$in_network[i,]$billing_code)
name <- content$in_network[i,]$description
df = data.frame(code, name, t(range(prices[sc & nt])))
colnames(df) = c('code', 'name', 'min_negotiated_price', 'max_negotiated_price')
df
```

    ##        code                                        name min_negotiated_price max_negotiated_price
    ## 1 CPT-57421 colposcopy entire vagina w/vagina/cervix bx               208.48               277.98

So for a cervical exam, my ‘negotiated price’ (the amount my insurance
plan has contractually agreed to pay an in-network provider for covered
items and services) can vary from $208 to $278. So I could in theory
save $70 by going to one provider versus another!
Of course this doesn't account for the potential cost of getting to these cheapest providers,
which for all I know could be in another state or something. 

Anyways, let’s take a look for the rest of the medical procedures!

## Putting it all together

I will loop through all the files and all the medical procedures in each
file and obtain of the negotiated prices. This takes quite a long time.
So [I’ve saved a gzipped version of the results for you in
`Carefirst-PPO_negotiated_price_range.csv` in case you are also
interested in taking a look](/assets/blog/Carefirst-PPO_negotiated_price_range.csv.gz).
You can still use this code to reproduce
the results, make modifications, or tinker on your own. But be
warned…these files are large so you need a computer with ample
memory…and a few hours of runtime.

``` r
library(plyr)

resultsall <- do.call(rbind, lapply(files[vi], function(file) {
  print(file)
  
  content <- jsonlite::fromJSON(gzcon(url(file)))
  
  results <- do.call(rbind, lapply(1:nrow(content$in_network), function(i) {
    #print(i)
    code <- paste0(content$in_network[i,]$billing_code_type, '-', content$in_network[i,]$billing_code)
    name <- content$in_network[i,]$description
    #print(name)
    x = content$in_network[i,]$negotiated_rates[[1]]$negotiated_prices
    ## only want 21 service code for hospital for now
    ## https://www.cms.gov/Medicare/Coding/place-of-service-codes/Place_of_Service_Code_Set
    sc <- unlist(sapply(x, function(y) sapply(y$service_code, function(z) '21' %in% z)))
    ## negotiated prices only
    nt <- unlist(sapply(x, function(y) sapply(y$negotiated_type, function(z) z == 'negotiated')))
    ## get prices
    prices <- unlist(sapply(x, function(y) y$negotiated_rate))
    #length(prices)  
    #range(prices)
    df = data.frame(code, name, t(range(prices[sc & nt])))
    colnames(df) = c('code', 'name', 'min_negotiated_price', 'max_negotiated_price')
    return(df)
  }))
  
  ## seems like there are duplicates with the same code and name
  ## I think this is for bundled vs non-bundled procedures
  results2 <- ddply(results,c("code", "name"), numcolwise(min))
  results3 <- ddply(results,c("code", "name"), numcolwise(max))
  resultsfin <- data.frame(results2$code, results2$name, results2$min_negotiated_price, results3$max_negotiated_price)
  colnames(resultsfin) = c('code', 'name', 'min_negotiated_price', 'max_negotiated_price')
  
  return(resultsfin)
}))

## seems like there are duplicates that occurred across files
resultsall2 <- ddply(resultsall,c("code", "name"), numcolwise(min)) ## collapse by taking min
resultsall3 <- ddply(resultsall,c("code", "name"), numcolwise(max)) ## collapse by taking max
resultsallfin <- data.frame(resultsall2$code, resultsall2$name, resultsall2$min_negotiated_price, resultsall3$max_negotiated_price) ## combine min and max from collapsed
colnames(resultsallfin) = c('code', 'name', 'min_negotiated_price', 'max_negotiated_price')

write.csv(resultsallfin, file="Carefirst-PPO_negotiated_price_range.csv")
```


## Analyzing the data

Let’s read in the results and take a look. So we have around 15,000
medical procedures.

``` r
resultsallfin <- read.csv('Carefirst-PPO_negotiated_price_range.csv')
dim(resultsallfin)
```

    ## [1] 15087     5

I wonder which medical procedures can be the most expensive (e.g. have
the maximum negotiated rates)?

``` r
## focus on max price
rgm <- resultsallfin$max_negotiated_price
names(rgm) <- resultsallfin$name
## sort
rgm <- sort(rgm, decreasing=TRUE)

## focus on top 20
df = data.frame(name=names(rgm)[1:20], max=rgm[1:20])
## format price to nearest dollar
df$price = paste0('$', formatC(df$max, big.mark=',', format = 'fg'))

## plot
library(ggplot2)
p <- ggplot(df, aes(x = reorder(name, max),  y = max)) +
  geom_col(width=0.8, fill='darkred') + 
  scale_y_continuous(limits = c(0,1.8e6), expand = c(0, 0)) +
  geom_text(aes(label = price), size=4, nudge_y = 1.5e5)
p + coord_flip() + theme_classic() +
  theme(axis.text.x = element_blank(), 
        axis.ticks.x = element_blank()) +
  ylab('in-network maximum negotiated price') + 
  xlab('medical procedure description') +
  ggtitle('Most Expensive Medical Procedures')
```

<img src="/assets/blog/insurance12-1.png" width="100%">

So it looks like for “CHIMERIC ANTIGEN RECEPTOR (CAR) T-CELL
IMMUNOTHERAPY” the maximum negotiated price across providers is over a
million dollars!

But how much could I, as an “informed, price-conscious” consumer, in
theory save by “shopping around” (e.g. which procedures have the largest
range in negotiated prices across providers)?

``` r
## order by difference between max and min
rg <- resultsallfin[order(resultsallfin$max_negotiated_price - resultsallfin$min_negotiated_price, decreasing=TRUE),]
## focus on top 20
rg <- rg[1:20,]
## convert to number format
rg$min_price <- paste0('$', formatC(rg$min_negotiated_price, big.mark=',', format = 'fg'))
rg$max_price <- paste0('$', formatC(rg$max_negotiated_price, big.mark=',', format = 'fg'))
## for ordering
rg$range <- rg$max_negotiated_price - rg$min_negotiated_price
rg$range_price <- paste0('<$', formatC(rg$range, big.mark=',', format = 'fg'), '>')

## plot
library(ggplot2)
p <- ggplot(rg, aes(x = reorder(name, range))) +
  geom_linerange(aes(ymin=min_negotiated_price,ymax=max_negotiated_price),linetype=2,color="blue")+
  geom_text(aes(label = range_price, y=(min_negotiated_price + max_negotiated_price)/2), size=2, nudge_x = 0.4) +
  geom_point(aes(y=max_negotiated_price),size=3,color="red") + 
  geom_text(aes(label = max_price, y=max_negotiated_price), size=2, nudge_x = 0.4) +
  geom_point(aes(y=min_negotiated_price),size=3,color="red") + 
  geom_text(aes(label = min_price, y=min_negotiated_price), size=2, nudge_x = 0.4)
p + coord_flip() + theme_classic() +
  ylab('prices') + 
  xlab('medical procedure description') +
  ggtitle('Medical Procedures With The Largest Price Range')
```

<img src="/assets/blog/insurance13-1.png" width="100%">

Oh, so it looks like I as an “informed, price-conscious” consumer could
save nearly a million dollars ($933,231.20) on an [“ECMO OR TRACHEOSTOMY
WITH MV \>96 HOURS OR PDX EXCEPT FACE, MOUTH AND NECK WITH MAJOR O.R.
PROCEDURE”](https://www.cms.gov/icd10m/version37-fullcode-cms/fullcode_cms/P0039.html)
by choosing my provider! Of course, if I really needed [an
extracorporeal membrane oxygenation
(ECMO)](https://www.mayoclinic.org/tests-procedures/ecmo/about/pac-20484615),
I would probably not be in a suitable condition to choose my provider in
the first place….

But anyways, let’s focus on some more practical questions. Consider that
[the average American my age has roughly $3000 in
savings](https://www.forbes.com/advisor/banking/savings/average-savings-by-age/).
Let’s focus on medical procedures with a minimum negotiated price that
is less than $3,000 but the maximum negotiated price could be higher
depending on the provider. So these are the medical procedures for which
I, as an “informed, price-conscious” consumer, could in theory deplete
my savings versus go into bankruptcy if I had to pay out-of-pocket
depending on my choice of providers. Let’s further visualize the
difference between the maximum and minimum negotiated prices using fold
changes, which I like to interpret as how screwed am I. A fold-change of
2 means the maximum negotiated price is 2x the minimum, so I am double
screwed. A fold-change of 4 means the maximum negotiated price is 4x the
minimum, so I am quadruply screwed. And so forth.

``` r
## focus on procedures with a minimum negotiated price < what average folks can afford
rgd <- resultsallfin[resultsallfin$min_negotiated_price < 3000,]
rgd$min_price <- paste0('$', formatC(rgd$min_negotiated_price, big.mark=',', format = 'fg'))
rgd$max_price <- paste0('$', formatC(rgd$max_negotiated_price, big.mark=',', format = 'fg'))

library(ggrepel)
p <- ggplot(rgd, aes(y = max_negotiated_price, x = max_negotiated_price/min_negotiated_price)) +
  geom_point(size = 1) + 
  scale_x_continuous(limits = c(0,100), expand = c(0, 0)) +
  geom_text_repel(data = rgd[rgd$max_negotiated_price > 65000,],
                  aes(y = max_negotiated_price, x = max_negotiated_price/min_negotiated_price, 
                      label = paste0(name, ' (', 
                                     min_price, ' vs ', max_price, ' = ',
                                     round(max_negotiated_price/min_negotiated_price), 'x)')),
                  col='#666666') +
  geom_hline(yintercept = 4000, col='red') +
  geom_text(aes(x = 80, y=10000, label="average American savings: $3,000"), col='red')
p + theme_classic() +
  ylab('maximum in-network negotiated prices') + 
  xlab('fold-change of maximum versus minimum in-network negotiated prices') +
  ggtitle('Medical Procedures With Minimum In-network Negotiated Prices < $3,000')
```

    ## Warning: Removed 13 rows containing missing values (geom_point).

<img src="/assets/blog/insurance132-1.png" width="100%">

Oh, so it looks like I as an “informed, price-conscious” consumer could
in theory avoid bankruptcy by choosing my provider for medical
procedures such as if my baby is born pre-maturely (EXTREME IMMATURITY OR
RESPIRATORY DISTRESS SYNDROME and PREMATURITY WITHOUT MAJOR PROBLEMS) or
if my baby dies (NEONATES, DIED OR TRANSFERRED TO ANOTHER ACUTE CARE
FACILITY). Of course, I’m very doubtful that minimizing the cost of my
baby’s death is going to be the driving factor behind picking a
particular healthcare provider….


## Additional exploration

Anyways, I’m sure there are many other fun questions you can ask with
this data. So try it out for yourself!

Look for a medical procedure you may be curious about. Maybe, like me,
you’ve wondered how much your rabies vaccine costs compared to your
dog’s? We can use `grepl` to find all the medical procedures with 'rabies' as part of its name.

``` r
resultsallfin[grepl('rabies', resultsallfin$name),]
```

    ##         X      code                                          name min_negotiated_price max_negotiated_price
    ## 8685 8685 CPT-90375      rabies immune globulin rig human im/subq               321.81               447.32
    ## 8686 8686 CPT-90376          rabies ig heat-treated human im/subq               332.82               462.62
    ## 8687 8687 CPT-90377 rabies ig heat&solvent/detergent human im&/su               326.71               454.13
    ## 8731 8731 CPT-90675                  rabies vaccine intramuscular               361.30               502.21
    ## 8732 8732 CPT-90676                    rabies vaccine intradermal                90.63               125.98

Or how much does it cost to remove stuff out of you?

``` r
resultsallfin[grepl("foreign body", resultsallfin$name),]
```

    ##         X      code                                          name min_negotiated_price max_negotiated_price
    ## 626   626 CPT-10120 incision&removal foreign body subq tiss simpl                52.58               200.67
    ## 627   627 CPT-10121 incision&removal foreign body subq tiss compl                99.04               377.97
    ## 1047 1047 CPT-20520 removal foreign body muscle/tendon sheath sim               105.73               403.52
    ## 1048 1048 CPT-20525 rmvl foreign body muscle/tendon sheath deep/c               170.73               651.58
    ## 1475 1475 CPT-23330    removal foreign body shoulder subcutaneous                81.87               417.60
    ## 1476 1476 CPT-23333 removal shoulder foreign body deep subfascial               301.56              1150.87
    ## 1576 1576 CPT-24200 rmvl foreign body upper arm/elbow subcutaneou                78.75               378.34
    ## 1577 1577 CPT-24201     removal foreign body upper arm/elbow deep               248.92               949.99
    ## 1706 1706 CPT-25248 expl w/removal deep foreign body forearm/wris               276.14              1053.87
    ## 2035 2035 CPT-27086 rmvl foreign body pelvis/hip subcutaneous tis                95.16               395.14
    ## 2036 2036 CPT-27087          removal foreign body pelvis/hip deep               415.41              1585.36
    ## 2151 2151 CPT-27372          removal foreign body deep thigh/knee               275.92              1053.01
    ## 2434 2434 CPT-28190        removal foreign body foot subcutaneous                88.73               362.41
    ## 2435 2435 CPT-28192                removal foreign body foot deep               213.25               813.86
    ## 2436 2436 CPT-28193         removal foreign body foot complicated               250.44               955.77
    ## 2646 2646 CPT-29874   arthroscopy knee removal loose/foreign body               367.19              1401.36
    ## 2697 2697 CPT-30300 removal foreign body intranasal office proced                93.60               357.23
    ## 2698 2698 CPT-30310  removal foreign body intranasal general anes               139.91               533.94
    ## 2699 2699 CPT-30320 rmvl foreign body intranasal lateral rhinotom               305.16              1164.62
    ## 2795 2795 CPT-31511  laryngoscopy indirect w/removal foreign body                86.93               331.78
    ## 2805 2805 CPT-31530           laryngoscopy w/foreign body removal               136.09               698.40
    ## 2806 2806 CPT-31531 laryngoscopy foreign body rmvl micro/telescop               145.98               776.00
    ## 2826 2826 CPT-31577         laryngoscopy flx rmvl foreign body(s)                96.54               379.06
    ## 2859 2859 CPT-31635           bronchoscopy w/removal foreign body               114.73               495.11
    ## 3004 3004 CPT-33020 pericardiotomy removal clot/foreign body prim               707.39              2699.69
    ## 3980 3980 CPT-42809                  removal foreign body pharynx                95.55               364.67
    ## 4049 4049 CPT-43215   esophagoscopy flexible removal foreign body                97.53               582.00
    ## 4071 4071 CPT-43247             egd flexible foreign body removal               130.00               496.14
    ## 4092 4092 CPT-43275 ercp remove foreign body/stent biliary/panc d               276.12              1053.77
    ## 4143 4143 CPT-43500 gastrotomy w/exploration/foreign body removal               543.81              2075.41
    ## 4210 4210 CPT-44010 duodenotomy exploration/bx/foreign body remov               598.77              2285.15
    ## 4214 4214 CPT-44025 colotomy exploration/biopsy/foreign body remo               682.99              2606.60
    ## 4273 4273 CPT-44363    enteroscopy > 2nd prtn w/rmvl foreign body               130.42               659.60
    ## 4293 4293 CPT-44390         colonoscopy stoma w/rmvl foreign body               140.25               559.81
    ## 4362 4362 CPT-45307        proctosgmdsc rigid w/rmvl foreign body                63.04               253.47
    ## 4372 4372 CPT-45332         sigmoidoscopy flx w/rmvl foreign body                71.03               273.01
    ## 4386 4386 CPT-45379  colonoscopy flx w/removal of foreign body(s)               170.87               661.29
    ## 4458 4458 CPT-46608                  anoscopy w/rmvl foreign body                53.04               202.42
    ## 4644 4644 CPT-49402   removal peritoneal foreign body from cavity               560.35              2138.52
    ## 5071 5071 CPT-54115       removal foreign body deep penile tissue               308.82              1178.60
    ## 5161 5161 CPT-55120                  removal foreign body scrotum               234.60               995.21
    ## 5376 5376 CPT-58562    hysteroscopy removal impacted foreign body               151.85               766.28
    ## 5601 5601 CPT-61570 craniectomy/craniotomy exc foreign body brain              1313.30              5012.12
    ## 5701 5701 CPT-62164  neuroendoscopy icra w/retrieval foreign body              1470.73              5612.92
    ## 6218 6218 CPT-67413  orbitotomy w/o bone flap w/rmvl foreign body               565.76              2167.71
    ## 6270 6270 CPT-67938          removal embedded foreign body eyelid                83.93               320.31
    ## 6746 6746 CPT-76010 radex from nose rectum foreign body 1 view ch                 5.63                67.71
    ## 6770 6770 CPT-76529 ophthalmic ultrasonic foreign body localizati                22.23               220.79

Why not spin the wheel and look at a couple random medical procedures?
You can learn about the costs of things like:

``` r
sample(resultsallfin$name, 30)
```

    ##  [1] "partial excision superficial pelvis"              "open tx tibial fracture proximal unicondylar"     "sgmdsc flx dired sbmcsl njx any sbst"             "dbrdmt subcutaneous tissue ea addl 20 sq cm"      "Cast sup gauntlet fiberglass"                    
    ##  [6] "Behind ear hearing aid"                           "Transport portable x-ray"                         "laps insertion tunneled intraperitoneal cathe"    "Pump for water circulating p"                     "rhytidectomy neck w/platysmal tightening"        
    ## [11] "ct colonography screening image postprocessin"    "arthrodesis knee any technique"                   "rx mntr drugs present lc-ms/ms ur/bld 31 rx p"    "open osteochondral autograft talus"               "excision of bulbourethral gland"                 
    ## [16] "prep site f/s/n/h/f/g/m/d gt 1st 100 sq cm/1p"    "supervision nurs facility patient month 30 mi"    "rp loclzj tum spect 2 area 1d img/1 area img>"    "Room & Board - Semi-private (Two Beds) Pediatric" "rpr blepharoptosis levator rescj/advmnt inter"   
    ## [21] "Fracture frame attached to b"                     "arthroscopy wrist diag w/wo synovial biopsy s"    "fetal congenital abnor assay 3 proteins"          "laps impltj/rplcmt gastric nstim eltrd antrum"    "exploration n/flwd surg upper extremity arter"   
    ## [26] "drs&/dbrdmt prtl-thkns burns 1st/sbsq medium"     "intraoral i&d tongue/floor sublngl supfc"         "mri breast without contrast material bilatera"    "rpr blepharoptosis frontalis musc sutr/oth ma"    "nursing facility discharge management 30 minu"

## Discussion and conclusion

I hope this blog tutorial helps provide an open-source resource to begin
analyzing insurance data from the Transparency in Coverage Final Rule.
I’ve demonstrated an example of obtaining ranges of negotiated prices
for medical procedures for one plan from one insurance company. But
given how well structured the data should be, I would expect these
scripts to be readily adaptable to other plans and other insurance
companies.

Some additional questions I, as an “informed, price-conscious” consumer,
have and may be able to address using this data include:
- How do these negotiate prices compare for a different plan like the Care First Blue Cross Blue Shield
HMO?  
- How do these negotiate prices compare for a different insurance
altogether?  
- How do in-network prices compare to out-of-network?  
- For
a particular medical procedure, which provider provides the best
negotiated prices?
- For
a particular medical procedure, which provider within a 30 mile radius of my zip code provides the best
negotiated prices?  
- For a particular medical procedure, what is the
geographical distribution of negotiated pricess by provider? Are some
providers in certain states or counties/cities generally offering better
negotiated prices for example?  
- Anything else you can think of!

And more philosophically:
- What is the level of agency I can exercise in this choice of my healthcare provider?
- What is the cost (in terms of my time) it takes to be able to make this choice?
- Who do we expect to be able to exercise this choice?
- Is it really a choice? Can it really be a choice? Should it be a choice?

Of course, with any set of summary statistics like ranges, we should
take a look back at the raw data and double check to ensure there have
not been any misinterpretations of the data or propagation of errors
such as typos from data entry and all the other caveats that come with
data encoding.

Finally, it is worth noting that [negotiated rate is not the same as
what I as a consumer and patient may expect to pay out of
pocket](https://blog.turquoise.health/negotiated-rate-vs-out-of-pocket/).

So despite all this effort, I, as a
Harvard-education PhD-trained Hopkins professor in biomedical research
with over 2 decades experience in big data analysis, despite now having
access to this available insurance data, have still not been able to
make an “informed, price-conscious decision” regarding my health care.
