---
layout: post
comments: false
tags: [visualization, tutorial, single cell, R, interactive]
---

<script src="https://code.highcharts.com/highcharts.js"></script>

So you aligned and quantified your single cell RNA-seq data. You QC-ed,
normalized, and even batch corrected as needed. Now you want to identify
transcriptional clusters. What clustering algorithm do you use?

Many [specialized clustering methods for single cell RNA-seq
data](https://github.com/seandavi/awesome-single-cell) have been
developed. Most come with sophisticated error modeling and other
innovations. Still, they are generally grounded in some type of general
k-means, graph-based, density-based, or hierarchical clustering.

So in this blog post, I will test out a few different general apporaches
for identifying clusters in single cell RNA-seq data, namely: k-means,
graph-based community detection, dbscan, and hierachical clustering. For
demonstration, we will use the [Patient B PBMC single cell RNA-seq data
from
10X](https://support.10xgenomics.com/single-cell-gene-expression/datasets/1.1.0/frozen_pbmc_donor_b).
PBMCs are nice because we have an expectation of what cell-types must be
present and we know a number of markers for these cell-types (CD3E for
T-cells, CD19 and CD20 for B-cells, etc). We can then compare the
different clusters identified by various clustering approaches to
what we know must be a cluster based on our knowledge of these cell
markers.

Preparing the data
------------------

Let’s first quickly clean, normalize, and perform some dimensionality
reduction on our PBMCs to get it into shape for clustering detection. We
can then visualize a few of these known cell markers.

``` r
set.seed(0)

############# Sample data
library(MUDAN)
data(pbmcB)
## filter out poor genes and cells
cd <- cleanCounts(pbmcB, 
                  min.reads = 10, 
                  min.detected = 10, 
                  verbose=FALSE)
## CPM normalization
mat <- normalizeCounts(cd, 
                       verbose=FALSE) 
## variance normalize, identify overdispersed genes
matnorm.info <- normalizeVariance(mat, 
                                  details=TRUE, 
                                  verbose=FALSE,
                                  alpha=0.2) 
## log transform
matnorm <- log10(matnorm.info$mat+1) 
## dimensionality reduction on overdispersed genes
pcs <- getPcs(matnorm[matnorm.info$ods,], 
              nGenes=length(matnorm.info$ods), 
              nPcs=30, 
              verbose=FALSE) 
## get tSNE embedding 
emb <- Rtsne::Rtsne(pcs, 
                    is_distance=FALSE, 
                    perplexity=30, 
                    num_threads=parallel::detectCores(), 
                    verbose=FALSE)$Y 
rownames(emb) <- rownames(pcs)
```

Based on our prior knowledge of marker genes, we can already tell that
there must be distinct clusters corresponding to B-cells, T-cells
subtypes, monocytes, and so forth. Indeed, we can see that CD20 (MS4A1)
expression marks a distinct group of cells, presumably B-cells. And
similarly, CD3E marks our T-cells, and so forth.

``` r
par(mfrow=c(3,3), mar=rep(2,4))
markers <- c('MS4A1', 'CD3E', 'IL7R', 'CCR7', 'CD8A', 'FCGR3A', 'CD14', 'HLA-DRA', "XCL1")
invisible(lapply(markers, function(g) {
  # plot binarized expression (on or off)
  plotEmbedding(emb, colors=(cd[g,]>0)*1, 
              main=g, xlab=NA, ylab=NA, 
              verbose=FALSE) 
}))
```

![](/assets/blog/markers-1.png)

We can now try various cluster detection approaches and see if the
identified clusters match what we expect based on marker expression.

K-Means
-------

First, we will use a simple [k-means clustering
approach](https://en.wikipedia.org/wiki/K-means_clustering) on our PCs.
With k-means clustering, a `k` must be provided a-priori to partition
your cells into k groups. Thus, the results rely heavily on your choice
of k. To be extra generous in our comparison, I tried a number of ks and
picked the best (as least visually) one to plot.

``` r
## k-means
set.seed(0)
com.km <- kmeans(pcs, centers=10)$cluster
par(mfrow=c(1,1), mar=rep(2,4))
plotEmbedding(emb, com.km, 
              main='K-Means', xlab=NA, ylab=NA, 
              mark.clusters=TRUE, alpha=0.1, mark.cluster.cex=1,
              verbose=FALSE) 
```

![](/assets/blog/kmeans-1.png)

Graph-based community detection
-------------------------------

Next, we will build a graph based on the nearest neighbor relationships
in PC space. We can then apply graph-based community detection,
specifically the [Infomap method](http://www.mapequation.org/code.html),
to identify putative clusters. There are a number of other graph-based
community detection algorithms you can use (Louvain, Walktrap, etc) but
all will require building a graph. Here, I elected to build a graph from
the 30 nearest neighbors in PC space for each cell.

``` r
## graph-based community detection
set.seed(0)
com.graph <- MUDAN::getComMembership(pcs, 
                        k=30, method=igraph::cluster_infomap, 
                        verbose=FALSE) 
par(mfrow=c(1,1), mar=rep(2,4))
plotEmbedding(emb, com.graph, 
              main='Graph-based Community Detection', xlab=NA, ylab=NA, 
              mark.clusters=TRUE, alpha=0.1, mark.cluster.cex=1,
              verbose=FALSE) 
```

![](/assets/blog/graphcom-1.png)

HDBSCAN
-------

DBSCAN (or in this case, the hierarchical version) is nice in that it
doesn’t require any expected number of clusters, such as k-mean’s k
parameter, to be specified a priori. But I had a hard time getting
sensible results using all PCs (too high dimensional) so I tried to
reduce the dimensions considered to only PCS 1 to 5. 

``` r
## Hierarchical DBSCAN
library(dbscan)
set.seed(0)
com.db <- hdbscan(pcs[,1:5], minPts=5)$cluster
names(com.db) <- rownames(pcs)
par(mfrow=c(1,1), mar=rep(2,4))
plotEmbedding(emb, com.db, 
              main='HDBSCAN', xlab=NA, ylab=NA, 
              mark.clusters=TRUE, alpha=0.1, mark.cluster.cex=1,
              verbose=FALSE)
```

![](/assets/blog/hdbscan-1.png)

Hierarchical clustering
-----------------------

[Hierarchical
clustering](https://en.wikipedia.org/wiki/Hierarchical_clustering) or,
alternatively biclustering (not shown) that clusters both cells and
genes, builds tree relationship among cells that can then be cut at
various heights to form clusters. Rather than choosing a cut height, I
will use [dynamic tree
cutting](https://labs.genetics.ucla.edu/horvath/CoexpressionNetwork/BranchCutting/).
Of course, the choice of distance metric and agglomeration method for
hierarchical clustering will still impact results. Here, I am using a 1
minus correlation in PC space to define the distance between cells and the
Ward agglomeration method.

``` r
## Hierarchical clustering with dynamic tree cutting
library(dynamicTreeCut)
set.seed(0)
d <- as.dist(1-cor(t(pcs)))
hc <- hclust(d, method='ward.D')
com.hc <- cutreeDynamic(hc, distM=as.matrix(d), deepSplit=4, verbose=FALSE)
names(com.hc) <- rownames(pcs)
par(mfrow=c(1,1), mar=rep(2,4))
plotEmbedding(emb, com.hc, 
              main='Hclust', xlab=NA, ylab=NA, 
              mark.clusters=TRUE, alpha=0.1, mark.cluster.cex=1,
              verbose=FALSE) 
```

![](/assets/blog/hclust-1.png)

In my own work, I am reaching the point where I must now consider not
only the accuracy of a clustering algorithm but also its runtime and
memory usage (primarily during software testing and development where I
really value being able to iterate quickly). So we will also benchmark
the runtime and memory usage of each cluster detection approach to get a
sense of how well each method may scale as our datasets increase in
size.

First, let’s benchmark runtime.

``` r
## try for different number of cells
ncells <- c(100, 200, 400, 800, 1600, 3200, 6400)

## k-means
rt.km <- sapply(ncells, function(vi) {
  start_time <- Sys.time()
  kmeans(pcs[1:vi,], centers=10)$cluster
  end_time <- Sys.time()
  return(end_time - start_time)
})

## graph-based community detection
rt.graph <- sapply(ncells, function(vi) {
  start_time <- Sys.time()
  getComMembership(pcs[1:vi,], 
                   k=30, method=igraph::cluster_infomap, 
                   verbose=FALSE) 
  end_time <- Sys.time()
  return(end_time - start_time)
})

## HDBSCAN
rt.db <- sapply(ncells, function(vi) {
  start_time <- Sys.time()
  hdbscan(pcs[1:vi,1:5], minPts=10)$cluster
  end_time <- Sys.time()
  return(end_time - start_time)
})

## Hclust w/ dynamic tree cutting
library(dynamicTreeCut)
rt.hc <- sapply(ncells, function(vi) {
  start_time <- Sys.time()
  d <- as.dist(1-cor(t(pcs[1:vi,])))
  hc <- hclust(d, method='ward.D')
  com.hc <- cutreeDynamic(hc, distM=as.matrix(d), deepSplit=4, verbose=FALSE)
  names(com.hc) <- rownames(pcs)[1:vi]
  end_time <- Sys.time()
  return(end_time - start_time)
})
```

We will make an [interactive plot here using
`highcharter`](http://jef.works/blog/2018/02/10/interactive-visualizations-with-highcharter/).

``` r
############# Highercharter
library(highcharter)
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

# Melt into appropriate format
df <- data.frame('graph'=rt.graph,
                 'km'=rt.km,
                 'db'=rt.db,
                 'hc'=rt.hc
                 )
dfm <- reshape2::melt(df)
dfm$ncell <- rep(ncells, 4)

# Plot
hcRT <- highchart() %>% 
  hc_add_series(dfm, "line", hcaes(x = ncell, y = value, group = variable)) %>%
  hc_title(text = 'Runtime Comparison') %>%
  hc_legend(align = "right", layout = "vertical") %>%
  hc_xAxis(title = list(text = 'number of cells')) %>%
  hc_yAxis(title = list(text = 'runtime in seconds'))
```

``` r
send_hc_to_js(hcRT, 'hcRT')
```

<span id="hcRT"></span>
<script>$(function(){
    $('#hcRT').highcharts(
{
  "title": {
    "text": "Runtime Comparison"
  },
  "yAxis": {
    "title": {
      "text": "runtime in seconds"
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
      "name": "graph",
      "data": [
        {
          "variable": "graph",
          "value": 0.03,
          "ncell": 100,
          "x": 100,
          "y": 0.03
        },
        {
          "variable": "graph",
          "value": 0.0684,
          "ncell": 200,
          "x": 200,
          "y": 0.0684
        },
        {
          "variable": "graph",
          "value": 0.2209,
          "ncell": 400,
          "x": 400,
          "y": 0.2209
        },
        {
          "variable": "graph",
          "value": 0.7464,
          "ncell": 800,
          "x": 800,
          "y": 0.7464
        },
        {
          "variable": "graph",
          "value": 3.0594,
          "ncell": 1600,
          "x": 1600,
          "y": 3.0594
        },
        {
          "variable": "graph",
          "value": 10.3862,
          "ncell": 3200,
          "x": 3200,
          "y": 10.3862
        },
        {
          "variable": "graph",
          "value": 40.6416,
          "ncell": 6400,
          "x": 6400,
          "y": 40.6416
        }
      ],
      "type": "line"
    },
    {
      "name": "km",
      "data": [
        {
          "variable": "km",
          "value": 0.0026,
          "ncell": 100,
          "x": 100,
          "y": 0.0026
        },
        {
          "variable": "km",
          "value": 0.0021,
          "ncell": 200,
          "x": 200,
          "y": 0.0021
        },
        {
          "variable": "km",
          "value": 0.0028,
          "ncell": 400,
          "x": 400,
          "y": 0.0028
        },
        {
          "variable": "km",
          "value": 0.0056,
          "ncell": 800,
          "x": 800,
          "y": 0.0056
        },
        {
          "variable": "km",
          "value": 0.0103,
          "ncell": 1600,
          "x": 1600,
          "y": 0.0103
        },
        {
          "variable": "km",
          "value": 0.0455,
          "ncell": 3200,
          "x": 3200,
          "y": 0.0455
        },
        {
          "variable": "km",
          "value": 0.0351,
          "ncell": 6400,
          "x": 6400,
          "y": 0.0351
        }
      ],
      "type": "line"
    },
    {
      "name": "db",
      "data": [
        {
          "variable": "db",
          "value": 0.0146,
          "ncell": 100,
          "x": 100,
          "y": 0.0146
        },
        {
          "variable": "db",
          "value": 0.0299,
          "ncell": 200,
          "x": 200,
          "y": 0.0299
        },
        {
          "variable": "db",
          "value": 0.0719,
          "ncell": 400,
          "x": 400,
          "y": 0.0719
        },
        {
          "variable": "db",
          "value": 0.1898,
          "ncell": 800,
          "x": 800,
          "y": 0.1898
        },
        {
          "variable": "db",
          "value": 0.6742,
          "ncell": 1600,
          "x": 1600,
          "y": 0.6742
        },
        {
          "variable": "db",
          "value": 3.1616,
          "ncell": 3200,
          "x": 3200,
          "y": 3.1616
        },
        {
          "variable": "db",
          "value": 4.9644,
          "ncell": 6400,
          "x": 6400,
          "y": 4.9644
        }
      ],
      "type": "line"
    },
    {
      "name": "hc",
      "data": [
        {
          "variable": "hc",
          "value": 0.0479,
          "ncell": 100,
          "x": 100,
          "y": 0.0479
        },
        {
          "variable": "hc",
          "value": 0.2309,
          "ncell": 200,
          "x": 200,
          "y": 0.2309
        },
        {
          "variable": "hc",
          "value": 0.2403,
          "ncell": 400,
          "x": 400,
          "y": 0.2403
        },
        {
          "variable": "hc",
          "value": 0.5806,
          "ncell": 800,
          "x": 800,
          "y": 0.5806
        },
        {
          "variable": "hc",
          "value": 1.53,
          "ncell": 1600,
          "x": 1600,
          "y": 1.53
        },
        {
          "variable": "hc",
          "value": 4.3116,
          "ncell": 3200,
          "x": 3200,
          "y": 4.3116
        },
        {
          "variable": "hc",
          "value": 13.5932,
          "ncell": 6400,
          "x": 6400,
          "y": 13.5932
        }
      ],
      "type": "line"
    }
  ],
  "legend": {
    "align": "right",
    "layout": "vertical"
  },
  "xAxis": {
    "title": {
      "text": "number of cells"
    }
  }
}
);
});</script>

K-means is quite fast! Graph-based community detection, which requires building a graph, is currently somewhat slow, though that may just be my poor implementation of the graph-construction approach from nearest neighbors. Similarly for hierarchical clustering, there may be faster C-based algorithms for calculating the distance matrices that could speed things up.

We can do the same for memory usage.

``` r
library(pryr)
## graph-based community detection
mem.graph <- sapply(ncells, function(vi) {
  return(mem_change(
  com <- getComMembership(pcs[1:vi,], 
                   k=30, method=igraph::cluster_infomap, 
                   verbose=FALSE) 
  ))
})

## k-means
mem.km <- sapply(ncells, function(vi) {
  return(mem_change(
  com <- kmeans(pcs[1:vi,], centers=10)$cluster
  ))
})

## HDBSCAN
mem.db <- sapply(ncells, function(vi) {
  return(mem_change(
  com <- hdbscan(pcs[1:vi,1:5], minPts=5)$cluster
  ))
})

## Hclust w/ dynamic tree cutting
mem.hc <- sapply(ncells, function(vi) {
  return(
    mem_change(d <- as.dist(1-cor(t(pcs[1:vi,])))) +
    mem_change(hc <- hclust(d, method='ward.D')) +
    mem_change(com <- cutreeDynamic(hc, distM=as.matrix(d), deepSplit=4, verbose=FALSE))
  )
})
```

``` r
# Melt into appropriate format
df <- data.frame('graph'=mem.graph,
                 'km'=mem.km,
                 'db'=mem.db,
                 'hc'=mem.hc
                 )
dfm <- reshape2::melt(df)
dfm$ncell <- rep(ncells, 4)

# Plot
hcMem <- highchart() %>% 
  hc_add_series(dfm, "line", hcaes(x = ncell, y = value, group = variable)) %>%
  hc_title(text = 'Memory Comparison') %>%
  hc_legend(align = "right", layout = "vertical") %>%
  hc_xAxis(title = list(text = 'number of cells')) %>%
  hc_yAxis(title = list(text = 'memory usage (log)'), type = "logarithmic")
```

``` r
send_hc_to_js(hcMem, 'hcMem')
```

<span id="hcMem"></span>
<script>$(function(){
    $('#hcMem').highcharts(
{
  "title": {
    "text": "Memory Comparison"
  },
  "yAxis": {
    "title": {
      "text": "memory usage (log)"
    },
    "type": "logarithmic"
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
      "name": "graph",
      "data": [
        {
          "variable": "graph",
          "value": 132016,
          "ncell": 100,
          "x": 100,
          "y": 132016
        },
        {
          "variable": "graph",
          "value": 268328,
          "ncell": 200,
          "x": 200,
          "y": 268328
        },
        {
          "variable": "graph",
          "value": 551912,
          "ncell": 400,
          "x": 400,
          "y": 551912
        },
        {
          "variable": "graph",
          "value": 1153000,
          "ncell": 800,
          "x": 800,
          "y": 1153000
        },
        {
          "variable": "graph",
          "value": 2369704,
          "ncell": 1600,
          "x": 1600,
          "y": 2369704
        },
        {
          "variable": "graph",
          "value": 4861992,
          "ncell": 3200,
          "x": 3200,
          "y": 4861992
        },
        {
          "variable": "graph",
          "value": 9876992,
          "ncell": 6400,
          "x": 6400,
          "y": 9876992
        }
      ],
      "type": "line"
    },
    {
      "name": "km",
      "data": [
        {
          "variable": "km",
          "value": 2728,
          "ncell": 100,
          "x": 100,
          "y": 2728
        },
        {
          "variable": "km",
          "value": 4136,
          "ncell": 200,
          "x": 200,
          "y": 4136
        },
        {
          "variable": "km",
          "value": 6536,
          "ncell": 400,
          "x": 400,
          "y": 6536
        },
        {
          "variable": "km",
          "value": 11336,
          "ncell": 800,
          "x": 800,
          "y": 11336
        },
        {
          "variable": "km",
          "value": 20936,
          "ncell": 1600,
          "x": 1600,
          "y": 20936
        },
        {
          "variable": "km",
          "value": 40136,
          "ncell": 3200,
          "x": 3200,
          "y": 40136
        },
        {
          "variable": "km",
          "value": 78536,
          "ncell": 6400,
          "x": 6400,
          "y": 78536
        }
      ],
      "type": "line"
    },
    {
      "name": "db",
      "data": [
        {
          "variable": "db",
          "value": 2216,
          "ncell": 100,
          "x": 100,
          "y": 2216
        },
        {
          "variable": "db",
          "value": 3224,
          "ncell": 200,
          "x": 200,
          "y": 3224
        },
        {
          "variable": "db",
          "value": 4824,
          "ncell": 400,
          "x": 400,
          "y": 4824
        },
        {
          "variable": "db",
          "value": 8024,
          "ncell": 800,
          "x": 800,
          "y": 8024
        },
        {
          "variable": "db",
          "value": 14424,
          "ncell": 1600,
          "x": 1600,
          "y": 14424
        },
        {
          "variable": "db",
          "value": 27224,
          "ncell": 3200,
          "x": 3200,
          "y": 27224
        },
        {
          "variable": "db",
          "value": 52824,
          "ncell": 6400,
          "x": 6400,
          "y": 52824
        }
      ],
      "type": "line"
    },
    {
      "name": "hc",
      "data": [
        {
          "variable": "hc",
          "value": 50576,
          "ncell": 100,
          "x": 100,
          "y": 50576
        },
        {
          "variable": "hc",
          "value": 174384,
          "ncell": 200,
          "x": 200,
          "y": 174384
        },
        {
          "variable": "hc",
          "value": 661584,
          "ncell": 400,
          "x": 400,
          "y": 661584
        },
        {
          "variable": "hc",
          "value": 2595984,
          "ncell": 800,
          "x": 800,
          "y": 2595984
        },
        {
          "variable": "hc",
          "value": 10304784,
          "ncell": 1600,
          "x": 1600,
          "y": 10304784
        },
        {
          "variable": "hc",
          "value": 41082384,
          "ncell": 3200,
          "x": 3200,
          "y": 41082384
        },
        {
          "variable": "hc",
          "value": 164077584,
          "ncell": 6400,
          "x": 6400,
          "y": 164077584
        }
      ],
      "type": "line"
    }
  ],
  "legend": {
    "align": "right",
    "layout": "vertical"
  },
  "xAxis": {
    "title": {
      "text": "number of cells"
    }
  }
}
);
});</script>

Note that the y-axis is on the log scale! You definitely wouldn't want to use hierachical clustering if you have millions of cells! 

# Conclusion 

Judge for yourself! Which method did ‘better’? To really judge,
we would want to check which method is better at identifying
[‘stable’](https://jef.works/blog/2018/02/28/stability-testing/)
clusters with truely differentially expressed genes. Only by looking for differentially expressed genes distinguishing each cluster would we be able to clarify which method properly split up the monocytes (marked by CD14) into putative subtypes. While k-means split monocytes into groups annotated 4, 6, and 7, graph-based community detection split into groups annotated as 4 and 5 which are not consistent with k-means, while the other methods did not identify any subtypes. DBSCAN appears to be better suited for identifying super small/rare populations such as groups marked 1, 8, and 9 as subtypes of B-cells (marked by CD20/MS4A1) but fails to distinguish between the large known T-cell subtypes (CD4, CD8 for example) at least using current settings. Hiearchical clustering is just too slow and memory intensive to be worthwhile in my opinion moving forward unless cells are downsampled or merged prior to clustering to reduce N.

What happens if we use different `k`s in our various cluster detection
approaches? Are some approaches more sensitive to parameter choices than
others? What if instead of PC space, we do our community detection in
the original expression space (using the entire normalized expression
matrix instead of PCs)? Try it out for yourself!  
