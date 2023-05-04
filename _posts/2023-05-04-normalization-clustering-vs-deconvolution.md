---
title: Impact of normalizing spatial transcriptomics data in dimensionality reduction and clustering versus deconvolution analysis with STdeconvolve
layout: post
comments: false
tags: [R, tutorial, spatial transcriptomics]
---

# Introduction

We developed a computational method for analyzing multi-cellular pixel-resolution spatial transcriptomics (ST) data called `STdeconvolve` that recovers the proportion of cell types comprising each multi-cellular spatially resolved pixel along with each cell types' putative transcriptional profile without reliance on external single-cell transcriptomics references. More details regarding how the method works can be found in the [published paper](https://www.nature.com/articles/s41467-022-30033-z) as well as on [https://jef.works/STdeconvolve/](https://jef.works/STdeconvolve/).

Some have noticed that when analyzing ST data with `STdeconvolve`, no normalization is done. Rather, an unnormalized gene expression counts matrix is provided. This is different from dimensionality reduction and clustering analysis, where gene expression per spot must be normalized to control for variation in sequencing depth or other factors that could lead to certain spots having more genes detected than others.

So why do we normalize when performing dimensionality reduction and clustering but not when performing deconvolution with `STdeconvolve`? Here, I code in R to take a hands-on, simulation-based approach to prove to myself that normalization impacts the results of dimensionality reduction and clustering but not deconvolution with `STdeconvolve`. I use a simulated spatial transcriptomics dataset with very obvious variation in terms of total genes detected per spatially resolved spot. I then perform dimensionality reduction and clustering analysis on both library-size normalized and unnormalized gene expression counts to find very different results. Likewise, I perform deconvolution analysis with `STdeconvolve` on both the library-size normalized and unnormalized gene expression counts to find that the inferred cell-type proportions don't change, suggesting that normalization is not necessary.

Follow along in the video or try out the code below for yourself!

## Video

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/CIpHdm20KTI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Code

```r
#### simulate ST data
set.seed(0)
G <- 3
N <- 100
M <- 300
initmean <- 10
initvar <- 10
mat <- matrix(rnorm(N*M*G, initmean, initvar), M, N*G)
rownames(mat) <- paste0('gene', 1:M)
colnames(mat) <- paste0('cell', 1:(N*G))
ct <- factor(sapply(1:G, function(x) {
  rep(paste0('ct', x), N)
}))
names(ct) <- colnames(mat)

## Visualize heatmap where each row is a gene, each column is a cell
## Column side color notes the cell-type
par(mfrow=c(1,1))
heatmap(mat,
        Rowv=NA, Colv=NA,
        col=colorRampPalette(c('blue', 'white', 'red'))(100),
        scale="none",
        ColSideColors=rainbow(G)[ct],
        labCol=FALSE, labRow=FALSE)

set.seed(0)
upreg <- 100
upregvar <- 10
ng <- 100
diff <- lapply(1:G, function(x) {
  diff <- rownames(mat)[(((x-1)*ng)+1):(((x-1)*ng)+ng)]
  mat[diff, ct==paste0('ct', x)] <<-
    mat[diff, ct==paste0('ct', x)] +
    rnorm(ng, upreg, upregvar)
  return(diff)
})
names(diff) <- paste0('ct', 1:G)

par(mfrow=c(1,1))
heatmap(mat,
        Rowv=NA, Colv=NA,
        col=colorRampPalette(c('blue', 'white', 'red'))(100),
        scale="none",
        ColSideColors=rainbow(G)[ct],
        labCol=FALSE, labRow=FALSE)

range(mat)

## positive expression only
mat[mat < 0] <- 0
## make counts
mat <- round(mat)

spotpos <- cbind(unlist(lapply(1:30, function(i) rep(i,30))), 1:30)
rownames(spotpos) <- paste0('spot-', 1:nrow(spotpos))
colnames(spotpos) <- c('x','y')
dim(spotpos)

par(mfrow=c(1,1))
plot(spotpos, cex=1)

## mix 3 cell-types
ct1 <- names(ct)[ct == 'ct1']
ct2 <- names(ct)[ct == 'ct2']
ct3 <- names(ct)[ct == 'ct3']

nmix <- nrow(spotpos)/2
pct1 <- c(unlist(lapply(rev(1:nmix), function(i) i/nmix)), rep(0,nmix))
pct2 <- c(rep(0,nmix), unlist(lapply(1:nmix, function(i) i/nmix)))
pct3 <- 1-(pct1+pct2)

## Show proportion of each cell-type across spots
par(mfrow=c(3,1), mar=rep(2,4))
barplot(pct1, ylim=c(0,1), main='proportion ct1')
barplot(pct2, ylim=c(0,1), main='proportion ct2')
barplot(pct3, ylim=c(0,1), main='proportion ct3')

pct <- cbind(pct1, pct2, pct3)
rownames(pct) <- rownames(spotpos)
## Visualize as pie charts
STdeconvolve::vizAllTopics(pct, spotpos) +
  ggplot2::guides(colour = "none")

## assume 10 cells per spot
ncells <- 10
## make gene expression matrix
spotmat <- do.call(cbind, lapply(1:nrow(spotpos), function(i) {
  spotcells <- c(
    sample(ct1, pct1[i]*ncells),
    sample(ct2, pct2[i]*ncells),
    sample(ct3, pct3[i]*ncells)
  )
  rowSums(mat[,spotcells])
}))
colnames(spotmat) <- rownames(spotpos)

## simulated ST data
head(pct)
head(spotmat)
dim(spotmat)
head(spotpos)
dim(spotpos)


#### tweaks to make normalization more prominent
tweak <- rownames(spotpos)[spotpos[,'y'] %in% seq(1,30,by=2)]

spotmattweak <- spotmat
spotmattweak[, tweak] <- spotmattweak[, tweak]*5
colSums(spotmattweak)
colSums(spotmat)

par(mfrow=c(1,1))
MERINGUE::plotEmbedding(spotpos, col=colSums(spotmattweak))


#### exploring impact of normalization

## what happens if we don't normalize?
## dimensionality reduction with PCA
## and clustering with kmeans
pcs <- prcomp(t(spotmattweak))
plot(pcs$x[,1:2], pch=16)
com <- kmeans(pcs$x[,1:3], centers = 3)
MERINGUE::plotEmbedding(pcs$x[,1:2], groups=com$cluster)
MERINGUE::plotEmbedding(spotpos, groups=com$cluster)

MERINGUE::plotEmbedding(pcs$x[,1:2], col=colSums(spotmattweak))
MERINGUE::plotEmbedding(spotpos, col=colSums(spotmattweak))

## what happens if we do normalize?
spotmattweaknorm <- t(t(spotmattweak)/colSums(spotmattweak))
spotmattweaknorm <- spotmattweaknorm*1e6
pcs2 <- prcomp(t(spotmattweaknorm))
plot(pcs2$x[,1:2], pch=16)
com2 <- kmeans(pcs2$x[,1:3], centers = 3)
MERINGUE::plotEmbedding(pcs2$x[,1:2], groups=com2$cluster)
MERINGUE::plotEmbedding(spotpos, groups=com2$cluster)

table(com$cluster, com2$cluster)

## deconvolution analysis
## no normalization
ldas <- fitLDA(t(as.matrix(spotmattweak)), Ks = 3)
optLDA <- optimalModel(models = ldas, opt = "min")
results <- getBetaTheta(optLDA, perc.filt = 0.05, betaScale = 1000)
deconProp <- results$theta
deconGexp <- results$beta
## visualize deconvolved cell-type proportions
vizAllTopics(deconProp, spotpos)

cor(pct, deconProp)

## with normalization
## requires rounding hack to get counts
## (not recommended because as you'll see we get the same answer anyway)
ldas2 <- fitLDA(t(as.matrix(round(spotmattweaknorm))), Ks = 3)
optLDA2 <- optimalModel(models = ldas2, opt = "min")
results2 <- getBetaTheta(optLDA2, perc.filt = 0.05, betaScale = 1000)
deconProp2 <- results2$theta
deconGexp2 <- results2$beta
## visualize deconvolved cell-type proportions
vizAllTopics(deconProp2, spotpos)

cor(pct, deconProp2)
cor(deconProp, deconProp2)
```

## Other related posts
- [Deconvolution vs Clustering Analysis: An exploration via simulation](https://jef.works/blog/2022/07/11/deconvolution-vs-clustering-2/)
- [Deconvolution vs Clustering Analysis for Multi-cellular Pixel-Resolution Spatially Resolved Transcriptomics Data](https://jef.works/blog/2022/05/03/deconvolution-vs-clustering/)