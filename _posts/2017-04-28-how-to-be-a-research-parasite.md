---
layout: post
comments: true
tags: [notes, tutorial, bash, analysis]
---

# How to be a ["research parasite"](http://www.nejm.org/doi/full/10.1056/NEJMe1516564): a guide to analyzing public sequencing data from GEO

In this tutorial, I will take you through my workflow for obtaining public sequencing data available on [NCBI GEO](https://www.ncbi.nlm.nih.gov/geo/).

Let's say for example, I am interested in analyzing the single cell RNA-seq data found in this paper: [Single-Cell Analysis Reveals a Close Relationship between Differentiating Dopamine and Subthalamic Nucleus Neuronal Lineages](http://www.cell.com/cell-stem-cell/abstract/S1934-5909(16)30343-5)

In the paper, the authors note that "The accession number for the raw read sequence data, cell annotations, and RPKM and read count expression matrices for all cells reported in this paper is GEO: `GSE87069`."

So let's go to GEO and find this data! Here it is: [`http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE87069`](http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE87069)

If you just want the processed count matrices, you can just download them directly from the Supplementary file section and you're done! However, if you're like me, you want the raw read sequence data. Maybe you want to realign, maybe you want to look for alternative splicing, but whatever the reason, you will likely want to download them via command line instead of clicking over and over again through the Samples section, especially when there are hundreds of samples to click through.

To download the raw read sequence data, note the SRA number on GEO: `SRP090110`

I like to just access the FTP directly. If you know the URL structure, it's a simple plug and chug: [`ftp://ftp-trace.ncbi.nlm.nih.gov/sra/sra-instant/reads/ByStudy/sra/SRP/SRP090/SRP090110`](ftp://ftp-trace.ncbi.nlm.nih.gov/sra/sra-instant/reads/ByStudy/sra/SRP/SRP090/SRP090110)

Now, you see a bunch of folders containing `.sra` files! We just have to download them all, convert them to .fastq, and start our realignment, requantification, and reanalysis as needed. For downloading, you can write a simple bash script to loop over the folders, but I prefer to use [Aspera](http://asperasoft.com/):

```r
# copy to your current directory
ascp -i asperaweb_id_dsa.openssh -Q -T -k 2 anonftp@ftp-trace.ncbi.nlm.nih.gov:/sra/sra-instant/reads/ByStudy/sra/SRP/SRP090/SRP090110 .
```

(Of course, this means you'll need to have Aspera installed and the licenses needed to use it. If you are on Harvard Orchestra for example, [here is a tutorial for installing, setting up the software license, setting up the path, and so forth](https://wiki.med.harvard.edu/Orchestra/AsperaToDownloadNcbiSraData))

Now you have a bunch of SRA files named with their SRR run name (ex. SRR4255367.sra). How do you get back the sample name that's often used in GEO to provide metainformation and other annotations?! For that, you will need to use the SRA Run Selector. Again, once you know the URL structure, it's a simple plug and chug: [`http://www.ncbi.nlm.nih.gov/Traces/study/?acc=SRP090110`](http://www.ncbi.nlm.nih.gov/Traces/study/?acc=SRP090110). You can just download the RunInfo Table as a spreadsheet so you can later map from Run name to Sample name as needed.

Then, to convert .sra files to .fastq files, you can use [SRA toolkit](https://github.com/ncbi/sra-tools). I actually like to wrap everything up into a [snakemake](https://snakemake.readthedocs.io/en/stable/) Python make file to handle job submission.  I can just run the following lines on command line:

```r
module load seq/sratoolkit/2.5.2
snakemake --snakefile /home/jf154/snakepit/sra/sra.snakefile --jobs 999 --cluster 'bsub -q short -W 12:00 -R "rusage[mem=4000]"'
mv *.fastq.gz fastq/
mv *.log out/
```

Where `/home/jf154/snakepit/sra/sra.snakefile` is:

```r
# sra.snakefile
# @author: Jean Fan
# @date: May 16, 2016
# @desc: From SRA to Fastq
#
# Usage: snakemake --snakefile /home/jf154/snakepit/sra/sra.snakefile --jobs 999 --cluster 'bsub -q short -W 12:00 -R "rusage[mem=4000]"'

from os.path import join

# Globals ---------------------------------------------------------------------

# Full path to Bowtie2 index.
INDEX = "/groups/shared_databases/igenome/Homo_sapiens/UCSC/hg19/Sequence/Bowtie2Index/genome"

# Full path to gene model annotations for splice aware alignment.
GTF = "/groups/shared_databases/igenome/Homo_sapiens/UCSC/hg19/Annotation/Genes/genes.gtf"

# Full path to a folder that holds all of your sra files
SRA_DIR = "sra/"

# A snakemake regular expression matching sra files
SAMPLES, = glob_wildcards(join(SRA_DIR, '{sample,[^/]+}.sra'))

# Make sure all modules are loaded
# ex. module load seq/sratoolkit/2.5.2

# Rules -----------------------------------------------------------------------

rule all:
    input:
        expand('{sample}.sra2fastqgz.log', sample=SAMPLES)

rule sra2fastq:
     input: join(SRA_DIR, '{sample}.sra')
     output:
        log = '{sample}.sra2fastq.log',
        r1 = '{sample}_1.fastq',
        r2 = '{sample}_2.fastq',
     shell: 'fastq-dump --split-files {input}; echo {input} > {output.log}'

rule bgzipfastq:
    input:
        r1 = rules.sra2fastq.output.r1,
        r2 = rules.sra2fastq.output.r2
    output: '{sample}.sra2fastqgz.log',
    shell: '/opt/htslib-1.2.1/bin/bgzip {input.r1}; /opt/htslib-1.2.1/bin/bgzip {input.r2}; echo {input} > {output}'
```
This snakemake file has been design for paired-end RNA-seq and will convert each .sra into two .fastq files and then bgzips them. I have additional snakemake files for aligning, calling variants, quantifying to counts, looking for alternative splicing, and so forth. For more information about snakemake, check out this [tutorial](http://slowkow.com/notes/snakemake-tutorial/). But once you have .fastq files, you're ready to process, reanalyze, and be the best research parasite you can be!
