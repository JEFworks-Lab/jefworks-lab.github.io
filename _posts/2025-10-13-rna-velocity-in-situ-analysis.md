---
title: RNA velocity in situ infers gene expression dynamics using spatial transcriptomics data
layout: post
comments: false
tags: [rna velocity, spatial transcriptomics]
---

# Introduction

ChatGPT kept producing the incorrect explanation for what is RNA velocity in situ. So I decided to create some content to help set the record straight! 

---

## Video

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/z9Oxf1hvum0?si=JeNZnrN1GYtcdvaQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

### Transcript

In this lecture, we will learn about RNA velocity in situ analysis for inferring gene expression dynamics using molecular resolution spatially resolved transcriptomic imaging data

Current high-throughput single cell transcriptomic profiling techniques including single-cell RNA-sequencing as well as spatially resolved transcriptomics technologies such as MERFISH and others measure the gene expression levels within individual cells but in a destructive manner, meaning that the cells are destroyed in the measurement process. The single cell gene expression measurements we obtain therefore represent a static snapshot in time and we are unable to follow these cells and see how their gene expression levels change over time. 

However, we may be still able to infer certain gene expression dynamics from this static snapshot.

Let's consider for a moment a different type of static snapshot. Here we have a photo of a group of friends jumping off a cliff. Even though this is a static picture and we don't have a video...given some positional information like each friend's distance away from the water and distance away from the rock ledge based on this static snapshot as well as a few assumptions like gravity goes down...

We can not only create a lower dimensional representation (in this case a 1D pseudo temporal ordering representation of the 2D positional information) but also assign a directionality in time. 

Furthermore, you can infer that this friend, at a timepoint in the near future (delta t), will likely have a distance away from the water and distance away from the rock ledge that is pretty similar the positional information of this friend here. That is, you infer something about the future positional information of each friend based on positional information of the other friends.

This is the general intuitive behind RNA velocity, which is defined as the time derivative of a cell's gene expression state. 

If instead of each friend being represented as their position information, we have gene expression measurements for many genes. Again, we should be able to use this information to create a lower dimensional pseudo temporal trajectory.

And we aim to use RNA velocity analysis to predict the future gene expression state of individual cells on a timescale of hours that will also help us assign directionality.

In the original RNA velocity model from 2018 developed during my PhD in Peter Kharchenko's lab at Harvard, we sought to predict the future gene expression state of individual cells by modeling RNA velocity based on the ratio of unspliced to spliced mRNA that can be readily inferred from originally full transcript single-cell RNA sequencing data.  

However, such distinction between spliced and unspliced mRNAs generally aren't available in most spatially resolved transcriptomics imaging platforms...we can still infer RNA velocity by adapting it for such an in situ analogue. In particular, following the central dogma, we can model genes as being initially transcribed in the  nucleus and then exported into the cytoplasm where they can be translated into proteins and eventually degraded. 

As we demonstrated in our 2019 PNAS paper from my post-doc in Xiaowei Zhuang's lab at Harvard
We can predict the future gene expression state of individual cells by modeling RNA velocity based on the ratio of nuclear to cytoplasmic mRNA, which can be inferred spatially resolved transcriptomic imaging data, specifically MERFISH.

Specifically, if we segment each cell, rather than counting each transcript in that whole cell, we distinguish between the transcripts that are in the nucleus versus the cytoplasm.

If we make a number of simplifying assumptions, we can model the rate of change of the cytoplasmic RNA dc/dt as a function of what comes in minus what gets degraded. 

Therefore, by quantifying the nuclear and cytoplasmic mRNAs in molecular resolution spatially resolved transcriptomic imaging data across a population of cells, we can note some cells as being at steady state with some consistent ratio of what gets made and what gets degraded, while other cells that are actively upregulating this gene should have a comparatively higher nuclear to cytoplasmic ratio. While cells downregulating this gene will have a comparatively lower nuclear to cytoplasmic ratio. 

As a more concrete example, consider this real imaging-based spatial transcriptomics MERFISH data of cultured U2OS cells from our 2019 PNAS publication. Here each point is a cell. For this one gene, MCM6, again we quantified the nuclear and cytoplasmic expression level in each cell. Some cells are actively upregulating this gene should have a comparatively higher nuclear to cytoplasmic ratio. While cells downregulating this gene will have a comparatively lower nuclear to cytoplasmic ratio. 

And we can do this for all genes that fit this model in our data based on some minimal level of correlation between nuclear and cytoplasmic expression levels. 

In this manner, we can not only observe the current gene expression in each cell, represented here where each column is a gene and red is high expression and blue is low, but also estimate the future gene expression for this cell at a future delta t, where now some genes will be higher and others will be lower. 

And we can project both this observed and predicted future high dimensional gene expression vector into a 2D lower dimensional embedding using dimensionality reduction approaches like tSNE, to appreciate how in this case, we get a very nice circle.

Keep in mind these are cultured U2OS cells. So the main gene expression dynamics we observe is with respect to the cell cycle. 

And indeed, if we identify genes that have significant pseudo temporal dependence and order them with respect to the directional pseudo temporal ordering we can derive based on this analysis, we can appreciate the transcriptional changes that cells gradually undergo to progress through cell-cycle states.

With that, I hope this lecture helped you understand a little more about RNA velocity in situ analysis. More recommended readings are linked from the description. More broadly, I hope that students will appreciate how: by understanding the theory behind computational modeling approaches such as the original RNA velocity for single-cell RNA-seq data, we can adapt them for new types of data modalities such as molecular resolution spatial transcriptomics data as they are made possible in the future. 

---

## Other related posts
- [RNA velocity (in situ) analysis - tutorial and tips](https://jef.works/blog/2020/01/14/rna_velocity_analysis_tutorial_tips/)
- [Visualizing RNA velocity information with veloviz](https://jef.works/blog/2021/10/06/a-tale-of-two-cell-populations/)
- [Animating RNA velocity with moving arrows](https://jef.works/blog/2021/10/15/animating-rna-velocity-with-moving-arrows/)