---
layout: post
comments: false
tags: [single cell, tutorial, R]
---

Introduction
------------

Single cell gene expression analysis often involves identifying
transcriptionally distinct clusters of cells that may represent
different cell-types or cell-states. After identifying these clusters of
cells, we may want to summarize the gene expression profiles for each
cluster by aggregating them into pseudobulks ie. the summed up gene
expression profile for all cells in each cluster. I find pseudobulks
really helpful in heatmap visualizations to look at top marker or
differentially expressed genes, particularly if you have cell-types or
cell-states across many patients or conditions. Here, I will compare the
runtimes of two different ways to create these pseudobulks using
simulated data that I recently learned from [Kamil
Slowikowski](https://slowkow.com/).

The comparison
--------------

To begin, let’s simulate a gene expression matrix with 5,000 genes and
10,000 cells.

``` r
library(Matrix)
set.seed(0) ## enable reproducibility

## 5000 genes
nrow <- 5000
## 10000 cells
ncol <- 10000
## simulate sparse matrix with 0.01% of values as 1s
mat <- matrix(round(rbinom(nrow*ncol, 1, 0.01/100)), nrow, ncol)
dim(mat)
```

    ## [1]  5000 10000

``` r
sum(mat)
```

    ## [1] 4933

``` r
rownames(mat) <- paste0('gene', 1:nrow)
colnames(mat) <- paste0('cell', 1:ncol)
## take a look
mat[1:5, 1:5]
```

    ##       cell1 cell2 cell3 cell4 cell5
    ## gene1     0     0     0     0     0
    ## gene2     0     0     0     0     0
    ## gene3     0     0     0     0     0
    ## gene4     0     0     0     0     0
    ## gene5     0     0     0     0     0

``` r
## convert to sparse matrix for faster computing
mat.sparse <- Matrix(mat, sparse = TRUE)
class(mat.sparse)
```

    ## [1] "dgCMatrix"
    ## attr(,"package")
    ## [1] "Matrix"

``` r
## take a look
mat.sparse[1:5, 1:5]
```

    ## 5 x 5 sparse Matrix of class "dgCMatrix"
    ##       cell1 cell2 cell3 cell4 cell5
    ## gene1     .     .     .     .     .
    ## gene2     .     .     .     .     .
    ## gene3     .     .     .     .     .
    ## gene4     .     .     .     .     .
    ## gene5     .     .     .     .     .

Let’s say these cells fall into 10 different arbitrary cell-types. Let’s
simulate a cell-type annotation vector.

``` r
## make cell-type annotation information
celltype <- as.factor(sample(1:10, ncol, replace=TRUE))
levels(celltype) <- paste0('celltype', 1:10)
names(celltype) <- colnames(mat)
## take a look
head(celltype)
```

    ##      cell1      cell2      cell3      cell4      cell5      cell6 
    ##  celltype8  celltype5  celltype4 celltype10  celltype2  celltype3 
    ## 10 Levels: celltype1 celltype2 celltype3 celltype4 celltype5 ... celltype10

``` r
## distribution of cells per cell-types
table(celltype)
```

    ## celltype
    ##  celltype1  celltype2  celltype3  celltype4  celltype5  celltype6 
    ##       1046        994       1007        998        968       1007 
    ##  celltype7  celltype8  celltype9 celltype10 
    ##       1012        970        988       1010

To create a pseudobulk gene expression profile for each cell-type, we
may loop through the cell-types using the `lapply` function and sum up
the gene expression values for all cells belonging to each cell-type. We
can then column bind these summed up gene expression values using
`cbind` and end up with a matrix that has the total expression for our
5,000 gene for each of our 10 cell-types. Note, we will also use
`Sys.time()` to keep track of how it takes to run this code for
comparative purposes later.

``` r
## pseudobulk gene expression per cell-type
getPseudobulk <- function(mat, celltype) {
   mat.summary <- do.call(cbind, lapply(levels(celltype), function(ct) {
     cells <- names(celltype)[celltype==ct]
     pseudobulk <- rowSums(mat.sparse[, cells])
     return(pseudobulk)
   }))
   colnames(mat.summary) <- levels(celltype)
   return(mat.summary)
}

## test runtime
start_time1 <- Sys.time()
## call function
mat.summary <- getPseudobulk(mat, celltype)
end_time1 <- Sys.time()

## take a look
dim(mat.summary)
```

    ## [1] 5000   10

``` r
head(mat.summary)
```

    ##       celltype1 celltype2 celltype3 celltype4 celltype5 celltype6
    ## gene1         0         0         0         1         0         0
    ## gene2         0         0         0         0         0         0
    ## gene3         0         0         0         0         0         0
    ## gene4         0         0         1         0         0         0
    ## gene5         0         1         0         0         0         0
    ## gene6         0         0         0         0         0         0
    ##       celltype7 celltype8 celltype9 celltype10
    ## gene1         0         0         0          0
    ## gene2         0         1         0          0
    ## gene3         0         0         0          0
    ## gene4         0         0         0          0
    ## gene5         0         0         0          0
    ## gene6         0         0         0          0

Alternatively, we can use linear algebra to come up with the same
pseudobulk gene expression matrix. We can generate a model matrix where
each row is a cell and each column is a cell-type. The model matrix
entry is 1 if the cell belong to the cell-type, and 0 otherwise.

``` r
## make model matrix
mm <- model.matrix(~ 0 + celltype)
colnames(mm) <- levels(celltype)
## take alook
dim(mm)
```

    ## [1] 10000    10

``` r
head(mm)
```

    ##   celltype1 celltype2 celltype3 celltype4 celltype5 celltype6 celltype7
    ## 1         0         0         0         0         0         0         0
    ## 2         0         0         0         0         1         0         0
    ## 3         0         0         0         1         0         0         0
    ## 4         0         0         0         0         0         0         0
    ## 5         0         1         0         0         0         0         0
    ## 6         0         0         1         0         0         0         0
    ##   celltype8 celltype9 celltype10
    ## 1         1         0          0
    ## 2         0         0          0
    ## 3         0         0          0
    ## 4         0         0          1
    ## 5         0         0          0
    ## 6         0         0          0

Now, to come up with the same pseudobulk gene expression matrix, all we
need to do is perform a little matrix multiplication! Recall: “row onto
column” for multiplying matrices.

``` r
## test runtime
start_time2 <- Sys.time()
## multiple row of mat.sparse (gene) onto column of the model matrix (cell-type annotation)
mat.summary.mm <- mat.sparse %*% mm
end_time2 <- Sys.time()

## take a look
dim(mat.summary.mm)
```

    ## [1] 5000   10

``` r
head(mat.summary.mm)
```

    ## 6 x 10 Matrix of class "dgeMatrix"
    ##       celltype1 celltype2 celltype3 celltype4 celltype5 celltype6
    ## gene1         0         0         0         1         0         0
    ## gene2         0         0         0         0         0         0
    ## gene3         0         0         0         0         0         0
    ## gene4         0         0         1         0         0         0
    ## gene5         0         1         0         0         0         0
    ## gene6         0         0         0         0         0         0
    ##       celltype7 celltype8 celltype9 celltype10
    ## gene1         0         0         0          0
    ## gene2         0         1         0          0
    ## gene3         0         0         0          0
    ## gene4         0         0         0          0
    ## gene5         0         0         0          0
    ## gene6         0         0         0          0

We can check that the results using these two approaches are indeed the
same.

``` r
all.equal(as.matrix(mat.summary), as.matrix(mat.summary.mm))
```

    ## [1] TRUE

But the matrix multiplication is faster!

``` r
## cbind, lapply runtime
end_time1-start_time1
```

    ## Time difference of 0.01023602 secs

``` r
## matrix multiplication runtime
end_time2-start_time2
```

    ## Time difference of 0.006520987 secs

Additional Tips
---------------

Such a model matrix approach can also more easily accomodate additional
ways of splitting the cells. For example, consider if our data came from
3 different patients.

``` r
## more complex model matrices
patient <- as.factor(sample(1:3, ncol, replace=TRUE))
levels(patient) <- paste0('patient', 1:3)
names(patient) <- colnames(mat)
## take a look
head(patient)
```

    ##    cell1    cell2    cell3    cell4    cell5    cell6 
    ## patient2 patient1 patient2 patient1 patient2 patient1 
    ## Levels: patient1 patient2 patient3

``` r
## distribution of cells per patient
table(patient)
```

    ## patient
    ## patient1 patient2 patient3 
    ##     3270     3324     3406

Perhaps we want to look at the pseudobulk gene expression profile for
each cell-type within each patient. To do this, we can just add to our
model matrix. Again each row is a cell but now each column is a
combination of patient and cell-type. The model matrix entry is 1 if the
cell came from the patient and is of the cell-type, and 0 otherwise.

``` r
mm2 <- model.matrix(~ 0 + patient:celltype)
dim(mm2)
```

    ## [1] 10000    30

``` r
mm2[1:10,1:4]
```

    ##    patientpatient1:celltypecelltype1 patientpatient2:celltypecelltype1
    ## 1                                  0                                 0
    ## 2                                  0                                 0
    ## 3                                  0                                 0
    ## 4                                  0                                 0
    ## 5                                  0                                 0
    ## 6                                  0                                 0
    ## 7                                  0                                 0
    ## 8                                  0                                 1
    ## 9                                  0                                 0
    ## 10                                 0                                 0
    ##    patientpatient3:celltypecelltype1 patientpatient1:celltypecelltype2
    ## 1                                  0                                 0
    ## 2                                  0                                 0
    ## 3                                  0                                 0
    ## 4                                  0                                 0
    ## 5                                  0                                 0
    ## 6                                  0                                 0
    ## 7                                  0                                 0
    ## 8                                  0                                 0
    ## 9                                  0                                 0
    ## 10                                 0                                 0

Now we end up with a pseudobulk gene expression matrix that has the
total expression for our 5,000 gene for each of our 10 cell-types within
each of our 3 patients.

``` r
mat.summary.mm2 <- mat.sparse %*% mm2
dim(mat.summary.mm2)
```

    ## [1] 5000   30

``` r
mat.summary.mm2[1:10,1:4]
```

    ## 10 x 4 Matrix of class "dgeMatrix"
    ##        patientpatient1:celltypecelltype1 patientpatient2:celltypecelltype1
    ## gene1                                  0                                 0
    ## gene2                                  0                                 0
    ## gene3                                  0                                 0
    ## gene4                                  0                                 0
    ## gene5                                  0                                 0
    ## gene6                                  0                                 0
    ## gene7                                  0                                 0
    ## gene8                                  0                                 0
    ## gene9                                  0                                 1
    ## gene10                                 0                                 0
    ##        patientpatient3:celltypecelltype1 patientpatient1:celltypecelltype2
    ## gene1                                  0                                 0
    ## gene2                                  0                                 0
    ## gene3                                  0                                 0
    ## gene4                                  0                                 0
    ## gene5                                  0                                 0
    ## gene6                                  0                                 0
    ## gene7                                  0                                 0
    ## gene8                                  0                                 0
    ## gene9                                  0                                 0
    ## gene10                                 0                                 0

Caveats
-------

However, note that matrix multiplication is only faster in this setting
since our gene expression matrix is sparse.

Try it out for yourself!
------------------------

-   What happens if we use a regular dense expression matrix instead of
    a sparse matrix?
-   Does the improvement in speed depend on the number of genes or
    number of cells?

Additional reading
------------------

-   [Working with a sparse matrix in R by Kamil
    Slowikowski](https://slowkow.com/notes/sparse-matrix/)
