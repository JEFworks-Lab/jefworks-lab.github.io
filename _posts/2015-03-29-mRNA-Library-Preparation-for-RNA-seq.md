---
layout: post
tags: rna-seq protocol comparison background
date: 2015-03-29 9:25PM
title: mRNA Library Preparation for RNA-seq
published: true
---

RNA-seq allows for quantiative transcriptomic profiling of biological samples. RNA-seq takes advantage of technological advancements in high-throughput sequencing by converting RNAs of interest to a library of cDNA fragments that can then be sequenced using standard DNA-sequencing technologies. Preparing a sample for RNA-seq typically begins with either rRNA depletion of mRNA enrichment. This is due to the fact that rRNA comprises a large percentage of total RNA and thus can take up valuable sequencing capacity making detection of the RNA species of interest more difficult.

## Overview

### mRNA enrichment

  - polyA selection to pull down mRNA
  - requires high quality, intact, non-degraded RNA or only the 3' end of transcripts will be isolated
  - requires large starting amount of total RNA (10 to 20 micrograms) since most of the total RNA will be rRNA

### rRNA depletion

  - depletes rRNA so non-coding RNA is preserved
  - requires less starting amount of total RNA (1 to 10 micrograms)
  - previous research has shown rRNA depletion to be ["responsible for substantial, unappreciated biases in coverage introduced during library preparation"](http://genomebiology.com/2014/15/6/R86)

## Commercial protocols/kits

### Illumina's TruSeq RNA Sample Preparation kit v2

  - uses polyT beads to isolate the mRNA from the rRNA, tRNA, and non-coding RNA
  - use of these beads requires that the RNA be of very high quality or only the 3' end of transcripts will be isolated
  - purified mRNA is then fragmented with metal and random priming is used to convert the sample to cDNA

### Epicentre's ScriptSeq RNA-seq kit v2 with Ribo-Zero

  - rRNA removal probes hybridize to rRNA 
  - magnetic beads bind with the rRNA removal probes to achieve rRNA-depletion

## Commercial protocols/kits that do not use either mRNA enrichment or rRNA depletion

### NuGen's Ovation RNA-seq system v2

  - utilizes non-random nonamers designed to not amplify ribosomal RNA to create double stranded cDNA fragments
  - non-random nonamers cannot amplify all areas of the genome and certain portions of genes are often lost
  - 2 to 200 nanogram of total RNA is needed

### Clontech's SMARTer Ultra Low RNA kit

  - begins with cDNA generation using polyT priming and proprietary chemistry
  - use of polyT priming requires the RNA to be of high quality
  - full length double-stranded cDNAs are generated and amplified by PC
  - very low starting amount of total RNA needed so ideal for single cell RNA-seq
