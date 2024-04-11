---
title: Alignment of Xenium and Visium spatial transcriptomics data using STalign
layout: post
comments: false
tags: [python, tutorial, spatial transcriptomics]
---

# Introduction

I'm trying out different video styles to teach students about bioinformatics analyses for spatially resolved transcriptomics data. In previous videos, I recorded myself live-coding and narrating through all my thought processes, mistakes, and troubleshooting. Now, I'm trying out sped-up versions with voiceovers. 

So in this video, I record myself coding to perform an exploratory analysis where I structurally align a [single-cell resolution spatial transcriptomics dataset profiled by the Xenium technology with a multi-cellular pixel resolution spatial transcriptomics profiled by the Visium technology from 10X Genomics](https://www.10xgenomics.com/products/xenium-in-situ/preview-dataset-human-breast) of two serial breast cancer tumor tissue sections using our lab's bioinformatics [Python tool STalign](https://jef.works/STalign/). I hope this will help give students a sense for how I would go about performing spatial structural alignment using STalign, the kinds of challenges I face and how I try to address them, and the types of 'sanity checks' I like to perform along the way (mainly lots of visualizations).  

---

## Video

<div align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/qZLhAGKPxGM?si=LOR3rZ3Y8tCTNrVz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

### Transcript

For this tutorial, we will be using some publicly available spatial transcriptomics datasets from 10X Genomics, though this tutorial will be application to any spatial transcriptomics data for which we have single-cell resolution information either by way of cellular positions or a registered histology image. 

I'm just downloading the necessary files and making sure I have the files I need, which will be the spatial positions and associated gene expression information.

Again, we will use STalign, which is a Python tool my lab has developed for performing pairwise spatial alignment of such spatial transcriptomics datasets using diffeomorphic metric mapping

STalign is implemented in Python since it uses PyTorch for some stochastic gradient descent and I am not the most fluency in Python, so I will be copying heavily from this tutorial available on the STalign website.

I have already installed STalign via pip.

So now I will read in the single-cell resolution Xenium dataset. And we can visualize the cellular positions. And then rasterize the positions into an image and normalize the image intensities. We will refer to this as our source image. 

Likewise, I will read in the registered high resolution Visium H&E image and normalize the image intensities. Double check my image dimensions, which are quite different here. We will refer to this as our target image. 

And we can just visualize these two source and target images side by side. 

In this case, these two datasets come from adjacent serial sections of the same breast cancer tumor. So they're not profiling exactly the same cells, but of course the overall ductal structures look quite similar so we can perform spatial structural alignment. But as you can see they are not oriented in the same way. Even if we try to manually rotate them, you can see the coordinate ranges are quite different so it's not always clear how much to stretch and rotate. So let's use STalign's point annotator tool to manually place a few spatially matched points to guide our alignment.

The point_annotator tool is a python command line tool. So I will fire up a terminal and follow the instructions to place 3 spatially matched landmark points, which get saved as these .npy files. 

Now I can read the points back in, if I get the file names right. And we can visualize the points on our source and target images. 

Now the goal of STalign is to derive a transformation that will align our source image to our target image. 

We can initialize an affine transformation using the landmark points we just placed. And let's apply this affine transformation to our original single cell positions from our Xenium source and overlay them onto the H&E image from our Visium target. Visually, this already looks pretty good. Again, these are serial tissue sections so the cells are different and they will never match perfectly. But there still seem to be some very minor structural differences due to local distortions in the tissue.

So let's try running a the diffeomorphic component of the alignment now. The diffoemorphic alignment component has a number of tunable parameters. We can read the documentation to learn more. For now, I will just run a small number of iterations to try it out. Ok no errors and the smoothing kernel looks good. So now I will try running for more iterations. I'm running this on a laptop CPU, so it'll take a few minutes. This will be much faster with a GPU but we can take this opportunity to grab a tea or better yet pet the Remy. 

Ok now that our alignment is complete, let's apply the transformation to our original single cell positions from our Xenium source and overlay them onto the H&E image from our Visium target. 

I think the alignment can still be improved particularly towards the top right corner. I often tinker with parameters and try aligning many times so I'm going to give this one more shot.

Ok this looks well aligned enough to me. Let's write the aligned coordinates and save them for downstream use. 

To double check, let's read in the Visium spot positions and overlay them along with the H&E image and new aligned Xenium single cell positions. Make sure to scale the spot positions to be the same resolution as the H&E image since that's what we've aligned everything to. Be careful about row versus column orders. This looks more right. While the Visium spots are registered already to the H&E image, we can see more clearly now the spots are present only in a section of the tissue also visible from the CytAssist alignment image. 

For the sake of demonstration, I'm going to subset both the Xenium and Visium datasets to a shared section of the tissue based on their aligned x and y coordinates. Maybe this is too small. Ok this looks more sensible. Always good to visually confirm that the subsetting worked. And again, we will write out the results to save them for downstream use. 

I am personally much more comfortable in R so I will actually read these aligned and subsetted cells and spots into R and just plot them again. Always look at your data. We can even plot them together. Of course the single cell density is quite variable and we can see interesting structures while the spots are uniformly gridded. 

Let's read in the gene expression information next. The gene expression information is stored as sparse matrices that I can read into R using the Matrix package. The row and column names are stored separately so I will read those in also. Be careful about headers and delimiters. And we can subset to the same set of cells for which we have the aligned positions based on their cell IDs. Now we have a gene expression matrix with 541 targeted genes and 88591 cells. Let's just plot these cells again and color them by the total gene expression per cell. 

And we can do the same for our Visium dataset though note we have 18085 genes due to the untargeted full transcriptome profiling but only 3211 spots. Let's just plot these spots now and color them by the total gene expression per spot. Now we can start seeing some similarities in the underlying structural variation because genes are more highly detected in some part of the tissue than others. 

We can even look at how shared genes profiled by both technologies are spatially distributed, like epidermal growth factor receptor EGFR. 

---

## Additional resources:
- [Jupyter notebook and R script from this video](https://github.com/JEFworks/coding_videos/tree/main/xenium_visium_breastcancer_stalign)
- [STalign source code on Github](https://github.com/JEFworks-Lab/STalign)
- [STalign's documentation](https://jef.works/STalign/)
- [Open-access paper describing STalign](https://www.nature.com/articles/s41467-023-43915-7)


---

## Other related posts
- [Aligning 10X Visium spatial transcriptomics datasets using STalignw ith Reticulate in R](https://jef.works/blog/2023/11/05/aligning-visium-using-STalign-with-reticulate/)
- [Aligning single-cell spatial transcriptomics datasets simulated with non-linear distorions](https://jef.works/blog/2023/08/20/merfish-merfish-alignment-simulation/)