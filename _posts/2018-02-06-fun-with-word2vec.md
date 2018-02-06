---
layout: post
comments: false
tags: [machine learning, artificial intelligence, computer-aided discovery, word2vec, tutorial]
---

# Fun with Word2vec: Exploring the application of deep learning on biomedical literature

I'm currently learning more about immunology so I can apply it to my analyses of the tumor micro-environment. However, there's quite a lot of background literature to catch up on! I must have spent a whole day just trying to figure out all of these CD markers. What expresses CD31415926 again? Has this cell-type been characterized before? If so, what are some other good gene markers? So much Googling, so little reward.

In this day and age of computer-assisted *everything*, can I apply some artificial intelligence to help me connect these dots faster?


## Background

### About Word2vec
Word2vec is a machine learning approach developed by researchers at Google that apply neural networks to reconstruct the linguistic contexts of words. On a basic level, you can input a large corpus of text such as a database of research abstracts and Word2vec will convert this text corpus into a set of vectors such that words that share common contexts in the corpus are located in close proximity in vector space.

Just like for single-cell RNA-seq analysis where we can represent a cell as many genes quantified by nUMI, now we use Word2vec to represent research abstracts as a vector of many words quantified by some neural network derived quantifications.

### About PubMed
PubMed is a database of abstracts for more than 27 million scientific research articles.

### Word2vec for PubMed
[Pyysalo et al.](http://bio.nlplab.org/) previously created resources from the entire available biomedical scientific literature, a text corpus of over five billion words, using Word2vec.


## Exploring Word2vec for PubMed

We will use the `PubMed-w2v.bin` Word2vec output that Pyysalo et al. have already created: [http://evexdb.org/pmresources/vec-space-models/](http://evexdb.org/pmresources/vec-space-models/)

Benjamin Schmidt also created a nice R package called `wordVectors` for exploring such Word2vec outputs: [https://github.com/bmschmidt/wordVectors](https://github.com/bmschmidt/wordVectors)

(Warning: The file is quite big and may take awhile to download and load)

```r
#devtools::install_github("bmschmidt/wordVectors")
library(wordVectors)
library(magrittr)
model = read.binary.vectors("PubMed-w2v.bin")
```

Let's first try to apply Word2vec to characterize the cell-type expressing CD19. We know this to be a B-cell marker, but suppose we didn't know that. All we see from our single-cell analysis is that there is a cluster of cells being marked by expression of some gene called CD19.

```r
test <- model %>% closest_to("CD19+", n=100)
head(test)
```

```r
      word similarity to "CD19+"
 1   CD19+             1.0000000
 2   CD20+             0.9026835
 3   CD38+             0.8998805
 4    CD5+             0.8862646
 5 HLA-DR+             0.8825798
 6    CD2+             0.8808907
```

From Word2vec, we get a list of words similar to CD19. Indeed, a lot of them look like marker genes. But this is honestly still hard for me to interpret. At least now I've expanded my list of markers to other genes potentially related to my cell-type of interest. Since most of these words look like gene names, let's run a gene set enrichment to see if these genes are enriched in any previously annotated gene sets.

```r
val <- test[,2]
names(val) <- sapply(test[,1], function(x) gsub('[+]', '', x))
val <- sort(val, decreasing=TRUE)
barplot(val)

library(liger)
load('~/Resources/genesets/org.Hs.MSigDB2Symbol.RData')
go.env <- as.list(go.env)
vi <- grepl('GSE', names(go.env)) ## limit to smaller set of gene sets
go.sub <- go.env[vi]
gsea.results <- iterative.bulk.gsea(val, set.list=go.sub, rank=TRUE)
gsea.results <- gsea.results[order(gsea.results$q.val, decreasing=FALSE),] ## order by significance
head(gsea.results)
```

```r
                                                p.val      q.val   sscore      edge
 GSE22886_NAIVE_BCELL_VS_NEUTROPHIL_UP     0.00969903 0.04005155 1.000000 0.8151171
 GSE12845_IGD_POS_VS_NEG_BLOOD_BCELL_UP    0.00849915 0.04005155 1.029851 0.8006964
 GSE22886_NAIVE_BCELL_VS_MONOCYTE_UP       0.00969903 0.04005155 1.000000 0.8151171
 GSE29618_BCELL_VS_MDC_DAY7_FLU_VACCINE_UP 0.00969903 0.04005155 1.000000 0.8151171
 GSE22886_NAIVE_BCELL_VS_DC_UP             0.00909909 0.04005155 1.014706 0.8006964
 GSE11057_CD4_CENT_MEM_VS_PBMC_UP          0.01029897 0.04005155 1.000000 0.8141597
```

Indeed, we see a lot of gene sets related to B-cells being enriched. Therefore, we may think that CD19 is a B-cell marker and indeed it is.

Now that we've confirmed our suspicions that CD19 is a marker for B-cells, can we use analogies to figure out what would be a good marker for monocytes? SAT question time! B-cell is to CD19+ as monocyte is to...

```r
model %>% closest_to( ~ "CD19+" - "B-Cell" + "Monocyte")
```

```r
            word similarity to "CD19+" - "B-Cell" + "Monocyte"
 1      monocyte                                     0.7410244
 2      Monocyte                                     0.7229452
 3         CD14+                                     0.7103301
 4         CD16+                                     0.6764755
 5       CD14(+)                                     0.6722145
 6       HLA-DR+                                     0.6644126
 7  CD14(bright)                                     0.6557364
 8         CD19+                                     0.6550736
 9     monocytes                                     0.6453974
 10    CD4+CD29+                                     0.6446330
```

...(ignoring the repeats of our query terms)...CD14+ and CD16+ !!! Hurray!!!


What other interesting things can we do with Word2vec? Stay tuned ;)


