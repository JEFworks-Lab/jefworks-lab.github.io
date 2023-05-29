---
title: 10x Visium spatial transcriptomics data analysis with STdeconvolve in R
layout: post
comments: false
tags: [R, tutorial, spatial transcriptomics]
---

# Introduction

I'm trying out different video styles to teach students about bioinformatics analyses for spatially resolved transcriptomics data. In previous videos, I recorded myself live-coding and narrating through all my thought processes, mistakes, and troubleshooting. Now, I'm trying out sped-up versions. 

So in this video, I speed through coding a bioinformatics analysis in the R programming language to characterize how cell-types are organized in a [breast cancer tissue section profiled by the 10X Visium spatial transcriptomics technology](https://www.10xgenomics.com/products/xenium-in-situ/preview-dataset-human-breast) using our reference-free deconvolution analysis tool [STdeconvolve](https://www.nature.com/articles/s41467-022-30033-z). 

Given a tissue, we may be interested in how cell-types are organized. We can distinguish between cell-types in part based on what genes they express. Spatially resolved transcriptomics technologies can allow us to profile how genes are expressed within tissues with high spatial resolution. 10X Visium is one of these spatially resolved transcriptomics technology that provides full transcriptome profiling but at these 55 micron spot resolution throughout the tissue. Keeping in mind that a cell may be only 10 microns, at a given spot, we may find multiple cells, even cells representing multiple cell-types. And as a result, the transcriptomic gene expression information profiled at each of these spots is going to be from all the cells in the spot, which may comprise multiple cell-types. Therefore, deconvolution analysis using tools like STdeconvolve may be helpful in resolving cell-type specific patterns as well as cell-type specific gene expression profiles.

By the end of this video, we will have gone from a gene expression counts matrix where each column corresponds to a multicellular spot and each row corresponds to the genes detected in that spot and a position matrix that tells us where each of these multicellular spots are positioned across the tissue, to the output of our reference-free deconvolution with STdeconvolve where now we have a visual representation of the deconvolved cell-type proportions in each spot where each spot is represented as a pie chart visualizing the cell-type proportions along with the deconvolved gene expression profiles associated with each cell-type. Of course this is just a preliminary runthrough and in reality I will generally spend a lot more time looking at the deconvovled cell-type specific spatial patterns and gene expression profiles to interpret the underlying cell-types and likely also iterate a few times to evaluate the stability of the analysis output and also perhaps try out different numbers of deconvolved cell-types or using a different gene corpus. But generally, given these kinds of deconvolved outputs, we may better understand how cell-types are spatially organized within tissues and how they are interacting and working together to achieve tissue-specific functions in both health and disease

Particularly since we have a highschool student interning with us this summer who will be applying STdeconvolve to some new spatial transcriptomics data, I hope this video will be a useful educational resource. So I will leave it as an exercise to the student to replicate these results and even explore these results further. Have fun learning bioinformatics and tinkering with code!

## Video

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/WyYx07G-xic" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Code

```r
## read data into R
pos.info <- read.csv('~/Downloads/spatial/tissue_positions.csv')
head(pos.info)
pos <- pos.info[, c('pxl_row_in_fullres', 'pxl_col_in_fullres')]
rownames(pos) <- pos.info$barcode
plot(pos)

library(Matrix)
gexp <- Matrix::readMM('~/Downloads/filtered_feature_bc_matrix/matrix.mtx.gz')
dim(gexp)
gexp[1:5,1:5]
barcodes <- read.csv('~/Downloads/filtered_feature_bc_matrix/barcodes.tsv.gz', sep="\t", header=FALSE)
head(barcodes)
dim(barcodes)
colnames(gexp) <- barcodes$V1
features <- read.csv('~/Downloads/filtered_feature_bc_matrix/features.tsv.gz', sep="\t", header=FALSE)
dim(features)
rownames(gexp) <- features$V2

## quick quality checks
par(mfrow=c(1,2))
hist(log10(colSums(gexp)+1))
hist(log10(rowSums(gexp)+1))

## ggplot to visualize
library(ggplot2)
df <- data.frame(pos, libsize=colSums(gexp)[rownames(pos)])
ggplot(df, aes(x=pxl_col_in_fullres, y=pxl_row_in_fullres, col=libsize)) + geom_point()
head(pos)
head(colSums(gexp))

## deconvolution with STdeconvolve
library(STdeconvolve)
?restrictCorpus
## feature select for genes
corpus <- restrictCorpus(gexp, 
                         removeAbove=0.95, 
                         removeBelow = 0.05, 
                         nTopOD = NA, 
                         alpha = 1e-8)
## double check genes of interest are kept
genes.test <- c('MS4A1', 'ESR1', 'CD3E')
genes.test %in% rownames(corpus)
## temp exploration (downsample genes) to run things faster
## comment out when code no longer used
#set.seed(0)
#genes.final <- union(sample(rownames(corpus), 800), genes.test)
#corpus <- corpus[genes.final,]
## choose optimal number of cell-types
#corpus.clean <- cleanCounts(corpus)
#dim(corpus.clean)
#dim(corpus)

## try out different numbers of deconvolved cell-types
ldas <- fitLDA(t(as.matrix(corpus)), Ks = c(15, 17, 20))
## get best model results 
## pick 17 based on heuristics
optLDA <- optimalModel(models = ldas, opt = "17")
## extract deconvolved cell-type proportions (theta) and transcriptional profiles (beta)
results <- getBetaTheta(optLDA, perc.filt = 0.05, betaScale = 1000)
deconProp <- results$theta
deconGexp <- results$beta
## visualize deconvolved cell-type proportions
colnames(pos) <- c('x', 'y')
vizAllTopics(deconProp, pos[rownames(deconProp),], r=55, lwd=0)	  

## interpret these cell-types based on their gene expression
topGenes(deconGexp)
## top genes based on log 2 (fold change) for each cell-type
lapply(1:17, function(i) {
  head(sort(log2(deconGexp[i,]/colMeans(deconGexp[-i,])), decreasing=TRUE))
})

## plot 
vizTopic(theta = deconProp, pos = pos, topic = "9", plotTitle = "Putative B Cells",
         size = 1, stroke = 0, alpha = 0.5,
         low = "white",
         high = "red")
lapply(1:17, function(i) {
vizTopic(theta = deconProp, pos = pos, topic = i, plotTitle = i,
         size = 1, stroke = 0, alpha = 0.5,
         low = "white",
         high = "red")
})

```

## Other related posts
- [Impact of normalizing spatial transcriptomics data in dimensionality reduction and clustering versus deconvolution analysis with STdeconvolve](https://jef.works/blog/2023/05/04/normalization-clustering-vs-deconvolution/)
- [Deconvolution vs Clustering Analysis: An exploration via simulation](https://jef.works/blog/2022/07/11/deconvolution-vs-clustering-2/)
- [Deconvolution vs Clustering Analysis for Multi-cellular Pixel-Resolution Spatially Resolved Transcriptomics Data](https://jef.works/blog/2022/05/03/deconvolution-vs-clustering/)
