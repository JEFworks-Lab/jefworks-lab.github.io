---
layout: paper
title: Impact of Data Quality on Deep Learning Prediction of Spatial Transcriptomics from Histology Images
authors: <b><u>Caleb Hallinan</b></u>, Calixto-Hope G. Lucas, <b>Jean Fan^</b>
image: /assets/papers/improvegenepred.jpg
abstract: Spatial transcriptomics technologies enable high-throughput quantification of gene expression at specific locations across tissue sections, facilitating insights into the spatial organization of biological processes. However, high costs associated with these technologies have motivated the development of deep learning methods to predict spatial gene expression from inexpensive hematoxylin and eosin-stained histology images. While most efforts have focused on modifying model architectures to boost predictive performance, the influence of training data quality remains largely unexplored. Here, we investigate how variation in molecular and image data quality stemming from differences in imaging (Xenium) versus sequencing (Visium) spatial transcriptomics technologies impact deep learning-based gene expression prediction from histology images. To delineate the aspects of data quality that impact predictive performance, we conducted in silico ablation experiments, which showed that increased sparsity and noise in molecular data degraded predictive performance, while in silico rescue experiments via imputation provided only limited improvements that failed to generalize beyond the test set. Likewise, reduced image resolution can degrade predictive performance and further impacts model interpretability. Overall, our results underscore how improving data quality offers an orthogonal strategy to tuning model architecture in enhancing predictive modeling using spatial transcriptomics and emphasize the need for careful consideration of technological limitations that directly impact data quality when developing predictive methodologies.
journal: Genome Biology. August 11, 2026. doi.org/10.1186/s13059-026-04236-2
journalurl: https://link.springer.com/article/10.1186/s13059-026-04236-2
code: https://github.com/calebhallinan/dataquality_geneprediction
---

