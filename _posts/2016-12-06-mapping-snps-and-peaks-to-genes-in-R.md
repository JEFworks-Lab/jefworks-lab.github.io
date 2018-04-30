---
layout: post
tags: [tutorial, analysis, R]
---

# Mapping SNPs and peaks to genes in R

We are often interested in mapping mutations or SNPs to genes, or peaks to genes, or genes to regions of copy number alteration, etc. The general computational problem is quite similar for all these cases: we have two sets of genomic regions that we seek to overlap. This can be accomplished very quickly in R using `GenomicRanges`. To learn more about `GenomicRanges`, consult [Bioconductor](https://bioconductor.org/packages/release/bioc/html/GenomicRanges.html). 

In this particular tutorial, I want to map a set of SNPs to genes.  


```r
# Sample snps
snps <- c("1:11873", "1:69100", "1:752761")

# Sample genes from GTF
gtfFile <- 'Homo_sapiens.GRCh37.75.gtf'
gtf <- read.table(gtfFile, header=F, stringsAsFactors=F, sep='\t', nrows=1000) # limit number of rows for testing
gtf.gene <- gtf[gtf[,3]=="gene", c(1,4,5)]
gene.names <- unlist(lapply(gtf[gtf[,3]=="gene", 9], function(x) {
    y <- strsplit(x, ';')[[1]][2]
    gsub(' gene_name ', '', y)
}))
rownames(gtf.gene) <- gene.names
head(gtf.gene)
```

```
##            V1    V4    V5
## DDX11L1     1 11869 14412
## WASH7P      1 14363 29806
## MIR1302-10  1 29554 31109
## FAM138A     1 34554 36081
## OR4G4P      1 52473 54936
## OR4G11P     1 62948 63887
```

Let's define a few helper functions to help out.


```r
# Define a few helper functions

#' Convert from string to range
#' 
#' @param pos A vector of strings ex. chr1 2938302 2938329
#' @param delim Delimiter for string splitting
#' @param region Boolean of whether region or just one position
#'
#' @returns Dataframe of ranges
#' 
string2range <- function(pos, delim=' ', region=TRUE) {
    posp <- as.data.frame(do.call(rbind, strsplit(pos, delim)))
    posp[,1] <- posp[,1]
	posp[,2] <- as.numeric(as.character(posp[,2]))
	if(region) {
        posp[,3] <- as.numeric(as.character(posp[,3]))
	} else {
	    posp[,3] <- posp[,2]
	}
    return(posp)
}

#' Convert from ranges to GRanges
#' 
#' @param df Dataframe with columns as sequence name, start, and end
#' 
#' @returns GRanges version 
#' 
range2GRanges <- function(df) {
    require(GenomicRanges)
    require(IRanges)
	gr <- GenomicRanges::GRanges(
        seqnames = df[,1],
        ranges=IRanges(start = df[,2], end = df[,3])
        )
    return(gr)
}
```

Now let's convert our SNPs to `GRanges`. 


```r
# convert SNPs to GRanges
snps.ranges <- string2range(snps, delim=":", region=FALSE)
head(snps.ranges)
```

```
##   V1     V2     V3
## 1  1  11873  11873
## 2  1  69100  69100
## 3  1 752761 752761
```

```r
snps.granges <- range2GRanges(snps.ranges)
names(snps.granges) <- snps
head(snps.granges)
```

```
## GRanges object with 3 ranges and 0 metadata columns:
##            seqnames           ranges strand
##               <Rle>        <IRanges>  <Rle>
##    1:11873        1 [ 11873,  11873]      *
##    1:69100        1 [ 69100,  69100]      *
##   1:752761        1 [752761, 752761]      *
##   -------
##   seqinfo: 1 sequence from an unspecified genome; no seqlengths
```

```r
# convert genes to GRanges
gtf.granges <- range2GRanges(gtf.gene)
names(gtf.granges) <- gene.names
head(gtf.granges)
```

```
## GRanges object with 6 ranges and 0 metadata columns:
##              seqnames         ranges strand
##                 <Rle>      <IRanges>  <Rle>
##      DDX11L1        1 [11869, 14412]      *
##       WASH7P        1 [14363, 29806]      *
##   MIR1302-10        1 [29554, 31109]      *
##      FAM138A        1 [34554, 36081]      *
##       OR4G4P        1 [52473, 54936]      *
##      OR4G11P        1 [62948, 63887]      *
##   -------
##   seqinfo: 1 sequence from an unspecified genome; no seqlengths
```

Now that we have our two `GRanges` objects, we can easily overlap them using `GenomicRanges::findOverlaps`. 


```r
r1 <- snps.granges
r2 <- gtf.granges
overlap <- GenomicRanges::findOverlaps(r1, r2)
# make vector of SNPs to genes
hits <- names(r2)[slot(overlap, "subjectHits")]
names(hits) <- names(r1)[slot(overlap, "queryHits")]
hits
```

```
##          1:11873          1:69100         1:752761         1:752761 
##        "DDX11L1"          "OR4F5" "RP11-206L10.10"         "FAM87B"
```

We can double check manually that indeed our SNPs fall within these identified genes. 


```r
r1[names(hits),]
```

```
## GRanges object with 4 ranges and 0 metadata columns:
##            seqnames           ranges strand
##               <Rle>        <IRanges>  <Rle>
##    1:11873        1 [ 11873,  11873]      *
##    1:69100        1 [ 69100,  69100]      *
##   1:752761        1 [752761, 752761]      *
##   1:752761        1 [752761, 752761]      *
##   -------
##   seqinfo: 1 sequence from an unspecified genome; no seqlengths
```

```r
r2[hits,]
```

```
## GRanges object with 4 ranges and 0 metadata columns:
##                  seqnames           ranges strand
##                     <Rle>        <IRanges>  <Rle>
##          DDX11L1        1 [ 11869,  14412]      *
##            OR4F5        1 [ 69091,  70008]      *
##   RP11-206L10.10        1 [745489, 753092]      *
##           FAM87B        1 [752751, 755214]      *
##   -------
##   seqinfo: 1 sequence from an unspecified genome; no seqlengths
```

