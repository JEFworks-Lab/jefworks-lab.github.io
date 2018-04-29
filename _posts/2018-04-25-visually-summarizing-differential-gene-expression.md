---
layout: post
comments: false
tags: [visualization, javascript, single cell, R, interactive]
---

<script src="//code.highcharts.com/highcharts.js"></script>
<script src="//code.highcharts.com/highcharts-more.js"></script>
<script src="//code.highcharts.com/modules/heatmap.js"></script>
<script type="text/javascript" src="{{ "/js/heatmap1.js" | prepend: site.baseurl }}"></script>
<script type="text/javascript" src="{{ "/js/heatmap2.js" | prepend: site.baseurl }}"></script>

# Summarizing differential gene expression in large single cell datasets

So you're analyzing a large single cell dataset. After you identify transcriptionally distinct clusters, you identify a set of differentially expressed genes marking each cluster. There could be hundreds of significantly upregulated genes in each cluster and hundreds of cells per cluster. How do you visually peruse through all this data? 

``` r
library(MUDAN)
## load built in 10X pbmcA dataset
data(pbmcA) 
pbmcA <- as.matrix(pbmcA) 
cd <- cleanCounts(pbmcA, min.reads = 10, min.detected = 10, verbose=FALSE)
mat <- normalizeCounts(cd, verbose=FALSE) 
matnorm.info <- normalizeVariance(mat, details=TRUE, verbose=FALSE) 
matnorm <- log10(matnorm.info$mat+1) 
pcs <- getPcs(matnorm[matnorm.info$ods,], nGenes=length(matnorm.info$ods), nPcs=30, verbose=FALSE) 
d <- dist(pcs, method='man')
emb <- Rtsne::Rtsne(d, is_distance=TRUE, perplexity=50, num_threads=parallel::detectCores(), verbose=FALSE)$Y 
rownames(emb) <- rownames(pcs)
com <- getComMembership(pcs, k=30, method=igraph::cluster_infomap, verbose=FALSE) 
dg <- getDifferentialGenes(cd, com)
plotEmbedding(emb, com, xlab=NA, ylab=NA, mark.clusters=TRUE, alpha=0.1, mark.cluster.cex=0.5, verbose=FALSE)
```

<img src="{{ "/images/pbmcA_cluster.png" | prepend: site.baseurl }}">

Plotting all significantly differentially expressed genes in all cells is too messy. Plus, each cluster may have very different numbers of cells such that plotting all cells visually overwhelms small clusters. We will probably want to summarize the expression of genes within clusters. So let's summarize using the average expression and fraction of cells expressing the gene (ie. non-zero detection) per cluster. 

``` r
## Summarize gene expression within groups
## average expression
mat.summary <- do.call(cbind, lapply(levels(com), function(ct) {
  cells <- which(com==ct)
  if(length(cells) > 1) {
    Matrix::rowMeans(matnorm[, cells])
  } else {
    matnorm[,cells]
  }
}))
colnames(mat.summary) <- levels(com)
## fraction expressing
fe.summary <- do.call(cbind, lapply(levels(com), function(ct) {
  cells <- which(com==ct)
  if(length(cells) > 1) {
    Matrix::rowMeans(matnorm[, cells]>0)
  } else {
    matnorm[,cells]>0
  }
}))
colnames(fe.summary) <- levels(com)
```

For the sake of demonstration, we will just select a handful of significantly differentially expressed genes to visualize. 

``` r
## Order groups
dend <- hclust(dist(t(mat.summary)), method='ward.D')

## Select a few differential genes
dg.sig <- lapply(dg, function(x) {
  x <- x[x$Z>1.96,] ## significant z-score
  x <- x[x$highest,] 
  x <- head(na.omit(x))
  return(x)
})
names(dg.sig) <- levels(com)

## Get summary matrices for differential genes only
select.groups <- dend$labels[dend$order]
dg.genes <- unlist(lapply(dg.sig[select.groups], rownames))
m <- mat.summary[dg.genes, select.groups]
m <- t(scale(t(m)))
fe <- fe.summary[dg.genes, select.groups]
```

We could plot just a conventional heatmap of the average gene expression per cluster for all our differentially expressed genes.

``` r
library(highcharter)
library(magrittr)

## Visualize as a regular heatmap
hc = hchart(t(m), "heatmap", hcaes(x = group, y = gene, value = value)) %>% 
  hc_colorAxis(stops = color_stops(10, colorRampPalette(c("steelblue", "white", "red"), space = "Lab")(10))) %>% 
  hc_title(text = "Differentially Expressed Genes Heatmap") %>% 
  hc_plotOptions(series = list(dataLabels = list(enabled = FALSE))) 
export_hc(filename='heatmap1', hc)
```

<div id='heatmap1' style="height: 500px"></div>

But when exploring our data, maybe we want to encode in additional levels of information such as the fraction of cells expressing the gene. 

``` r
library(reshape2)

## Visualize fraction expressing as dot size
## reshape for highcharter
mm <- reshape2::melt(m)
mfe <- reshape2::melt(fe)
colnames(mm) <- c('gene', 'group', 'value')
mm <- cbind(mm, fe=mfe$value)
## convert value to colors
colors <- mm$value
colors <- colors - min(colors)
colors <- colors/max(colors)
gradientPalette <- colorRampPalette(c("steelblue", "white", "red"), space = "Lab")(1024)
cols <- gradientPalette[round(colors * (length(gradientPalette) - 1) + 1)]
cols[is.na(cols)] <- '#eeeeee'
mm$color = cols
## convert group and gene names to indices for plotting
mm$x = sapply(mm$gene, function(x) which(dg.genes==x)) 
mm$y = -sapply(mm$group, function(x) which(select.groups==x))
## visualize as bubble plot
hc = hchart(mm, type="scatter", mapping = hcaes(x=x, y=y, z=fe, 
                                                mag=value, color=color, 
                                                fe=fe, name=group, gene=gene)) %>%
  hc_plotOptions(bubble = list(minSize=1, maxSize=10)) %>%
  hc_title(text = 'Heatmap Alternative') %>% 
  hc_tooltip(headerFormat = "", pointFormat = "<b>group</b>: {point.name} <br> <b>gene</b>: {point.gene} <br> <b>fraction expressing</b>: {point.fe} <br> <b>z-score</b>: {point.mag}") %>%
  hc_xAxis(visible=FALSE) %>%
  hc_yAxis(visible=FALSE) %>%
  hc_plotOptions(series = list(showInLegend=FALSE))
export_hc(filename='heatmap2', hc)
```

<div id='heatmap2' style="height: 500px"></div>

Now we can more easily see which gene may or may not be a better facs marker based on its fractional expression in our cell subpopulation of interest compared to the fractional expression in other subpopulations. 

Or maybe we want to encode in AUC metrics, gene expression variance, or other information. However, keep in mind that the purposes of your visualization may be different depending on your goals. If your goal is to more easily explore your data, a more complex visualization with lots of encoded information may be warranted. If your goal is to communicate information, a simpler standard heatmap that's easier to understand may be sufficient. 

# Additional Resources
- [Presentation from Nils Gehlenborg on utility of different encodings for different data types](http://gehlenborg.com/wp-content/uploads/2011/07/ismb-eccb_data-visualization_gehlenborg.pdf)




