---
layout: post
comments: true
tags: [conference, notes]
---

# Notes from the Single Cell Genomics Conference, September 14-16 2016, Wellcome Genome Campus, Hixton, Cambridge, UK ([Website](https://coursesandconferences.wellcomegenomecampus.org/events/item.aspx?e=596))

## Keynote Lecture: Genomic insights into human cortical development, lissencephaly, and Zika microcephaly; Arnold Kriegstein; University of California, San Francisco, USA

- Single cell genomics to look in depth at developmental human brain
- Clinical applications of identified cell types by genomic signature ie zika
- Human brain is 1000x bigger than mice mostly in cortex
- Elephants and proposes have bigger more folded brains but cell composition different 
- In mouse founder cells expand and move then divide: 13 cell cycles of neuromaturation 
- E13 comparable to GW11.5
- As human mature have huge outer subventricular zone -> cell types in this area unclear
- Morphological and location distinct but transcriptionally similar to radial glial and have similar markers -> call oRG
- Distinctively jump when dividing; translocates along basal fiber 
- Smaller jump and fewer in mouse 
- In culture though just move in circles and divide 
- Single oRG can divide into lots of cell types and supports movement of other cell types with their fibers 
- Confirm diff exp marker genes for vRG and oRG using FISH (Pollen Cell paper 2015)
- Build activated gene networks: gene set enrichment on marker genes(?) find oRG genes involved in stem mechanism for maintaining oSVZ
- Old radial unit hypothesis from primates suggest one to one correspondence from one layer to another but data suggests only true at early stages, later stages have a discontinuous radial glial scaffold (unpublished) supragranular cortex expansion hypothesis 
- Hypothesize there are oRG like cells in glioblastoma; can see similar jumping and morphology 
- Use cerebral organoids (stem cells from adults to grow 3D brain) to model neurodevelopmental disorders like lissencephaly and microcephaly, neuronal maturation disorders 
- Early organoids between WT and lissencephaly derived look same and divides similarly in terms of vRG but abnormal in oRG -> cells jump further and don't divide as readily in disease patient derived cells 
- Note can't be modeled with mouse since mouse has smooth brains 
- Virus destroy brain and prvent new formation to cause microcephaly 
- Zika causes not just small but less folding in brain 
- Viral particles visible in infected tissue 
- Infected organoids are smaller since progenitor cells die 
- AXL necessary and sufficient receptor for infection of skin fibroblasts by zika 
- AXL highly enriched in oRG and blood vessels 
- Zika forms in clusters of radial glia in first trimester 
- Virus proteins go through entire cell even in the fibers 
- AXL antibody and knockdown block zika entry into astrocytes 
- Hypothesize AXL is mechanism of entry into brain 
- Anti AXL drugs are available but have side effects like blindness and sterility so not good for pregnant women; look at other potential treatments


## *Session 1: Neuroscience & Tissue Development Chair: Rickard Sandberg, Karolinska Institute, Sweden*


## Molecular census of mouse brain cell types; Sten Linnarsson; Karolinska Institute, Sweden
- De novo cell type discovery
- Cellular identity encoded in transcriptome; enough signal to make it work
- Can visualize location of cells
- Recently find neurons controlling goosebumps and nipple erection 
- Try to find oligodendrocyte lineage; arise from progenitors, divide into precursor then myelin forming then mature
- Oligodendrocyte precursors and mature are stable state regardless of location in brain 
- Study developing midbrain at different development stages  in both mouse and human; region of dopaminurgicn neuron development
- Able to identify main neural cell types (known) by tsne 
- In mouse has fewer classes of progenitors possible due to gestation or age difference
- High correspondence between mature cell types between mouse and human
- Hypothesize progenitors divide less frequently in mouse ; timing is different 
- Use sequential smFish to look at radial glia in space across different developmental stages
- Use gene markers To assess quality of created dopaminurgicn neurons for potential replacement therapy
- Use regression to classify cells into known cell types to show high correspondence  and ability to create all cell types 
  
## Reconstructing human organogenesis using single-cell RNAseq; Barbara Treutlein; Max Planck Institute for Evolutionary Anthropology, Germany
- Paper: Treutlein et al Nature 2016
- Start with somatic fibroblast and directly reprogram into different cell types without going through iPS (cell and tissue engineering) by over expression of transcription factors and certain genes 
- Analyze mef to induced neurons by scRNA-seq; reprogramming very inefficient only converts 10%
- Cell cycle genes turn off and cell projection turns on in all cells
- Induced neuron maturation has multiple cell fates (bifurcation) turns out some turn into myocytes and others turned appropriately into neurons 
- Decompose transitional states as weighted fractions of neuronal and fibroblast identifies (cell type signatures)
- Along reprogramming cells go through NPC like state?  
- Use self organizing maps by grouping genes with correlated expression together 
- Get 2D expression picture for each cell then merged into group mean
- Do for different populations to get all the over expression signatures  in your data 
- Interesting radial signature plots and heat map like plots 
  
## Plasticity and heterogeneity of skin cells in health and tissue repair; Maria Kasper; Karolinska Institute, Sweden
 Zeisel paper and something in press cell systems 
- Hair follical is easily accessible self maintaining mini organ; tool for studying stem cell, tomourgenesis, wound repair
- One hair follicle has many stem cell populations all independent 
- Stem cell pops different because of location or intrinsic?
- Stem cells migrate out of follicle during wound healing and get reprogrammed 
- Mutation in deep follicle cells causing small tumor but if wound induced then large tumors occur where wound is 
-  Reconstruct IFE differentiation using spade trees 
- Identify point of no return in differentiation pathway
 Speculation:
- Differentiation status influences stemness
- Spatial determines function 

## Single nucleus RNA-Seq reveals dynamics of adult neurogenesis; Naomi Habib; Broad Institute, USA
- Recent evidence of adult neural stem cells
- In dentate gyrus niche within the hippocampus 
- To study neuron need enzymatic dissociation of cell body or just use single nuclei
 Scnucseq (Habib science 2016)
- Use mice up to 2 years of age and can still get high quality sequencing 
- Label rare newborn cell throughout differentiation process -> div seq which just florescently label dividing cells 
- Order by maturation trajectory then cluster genes to show major transcriptional waves 
- Subset of immature neurons identified in spinal cord 
- BiSNE? Bi clustering on sne 
 
 
## Human cerebral organoids recapitulate gene expression programs of fetal neocortex development; Gray Camp; Max Planck Institute for Evolutionary Anthropology, Germany
- Paper: Camp et al PNAS 2015
- How well are genetic programs recapitulated by organoids?
- Gene expressions are highly correlated 
- Networks derived from IPSC models also malformed like in disease patients so faithful recapitulation by model systems Surprising
- Chimpanzee organoids recapitulate chimpanzee programs as well
- Pc1 separated progenitors and neurons while Pc2 separated human and chimp but batch effects? So use scde :)
- No obvious correlation though in terms of diff exp genes in human and mice between progenitor and neuron 
- Organoids have elongated metaphase in human vs chimp specific to apical progenitors (mouse even shorter) also orangutan as out group 
- Chimp organoids seems to mature faster than human though
- Currently following up on specific genes 

## Characterization of adult neurogenic niches at single cell resolution; Marta Rodriguez Orejuela; Max Delbrueck Center for Molecular Medicine, Germany
- Drop seq of dengate gyrus and svz
- Mostly quality control stage proof of concept  
- 50% cells have more than 1000 genes ehhh
- No difference between live and fixed cells?
- Tsne identifies main types and lots of small groups? 
- Want to dcirbe clusters 

## *Session 2: Chromatin Structure and Organisation Chair: Ido Amit, Weizmann Institute, Israel*

## Single cell dynamics of clonal memory; Amos Tanay; Weizmann Institute of Science, Israel
- How transcriptional output is being dictated by intrceullar messages and combinations of transcription factors etc
- Complexity introduced by epigenetics; composition of molecular organization introduces some time of epigenetic memory 
- Analyze 10000 singl cells from mouse embryo; cluster cells by select known markers 
- Cluster cells then cluster the clusters in relation to each other for more robust similarity 
- For each of clusters look for differentially enriched transcription factors 
- Over 100 specific TFs in the embryo
- Correlation between fraction of TF specific to cluster coupled with faction of cluster specific gene expression 
- Ex primitive erythrocytes have low specific TF and low specific gene expression 
- Primitive erythrocytes may run yeast like promoter centric program 
- Suggests there are TF fields; gradients tht affect most cells often nested and overlapping not hierarchical 
- Now look for hypo methylation to detect enhancers nd qautnfiy fraction of cells with enhancer active on pop level 
- Multiple epigenetic enhancers form hubs, pair wise interactions to support epigenetic barrier?
- Stability of enhancer landscape and interactions?mlots of enhancers are de novo  ie only observed at this specific developmental time point 
 
## ATAC-ing regulatory variation in single cells; Will Greenleaf; Stanford University, USA
- What are the are underpinnings of epigenetic landscape?
- "Regulome"
- Elements that are on are accessible while off are inaccessible
- Atacseq get peaks where are accessible
- Predict 8 class chromatin state using both length and position of reads 
- Apply to bulks of hematopoietic progenitor lineage 
- Many binary differences in epigenetic landscape 
- Clustering on atac gives cleaner grouping than gene expression since so binary
- Study aml characterize diseases progenitors as mixes of normal pops suggesting use of many progenitor lineages ie lineage infidelity 
- Scatacseq allows for dividing cells by accessibility of 1 factor then aggregating to look at peaks in the two groups
- Correction shows chromosome looping like hic data
- Now look at single cell atacseq of hematopoietic differentiation 
- Use principal component of bulk to apply onto single cells for projection into low dimensional representation 
- Can see gradient of Gata and id3 motif accessibility 
- Tsne to group TFs to show which TFs tend to come together or have similar patterns of accessibility 
- Caution: naked dna contamination screws things up so background goes up with dead cells
 
## Chromatin accessibility, DNA methylation and gene expression from the same single-cell; Stephen Clark; Babraham Institute, UK 
- Methylase enzyme label dna that's exposed by methylation
- Nome-seq
- Now delve lop scmtseq; combine gtseq smartseq2 and bisulfiteseq
- Separate gc and cg to get accessibility
- Currently in proof of concept and development phase
- Accessibility within gene correlated with higher expression as expected 
 
## Genome Architecture Mapping, new approach to map chromatin contacts; Ana Pombo; Max Delbrueck Center for Molecular Medicine, Germany
- From imaging can see chromosome folding is not random but also not deterministic
- Single point mutation on enhancer causes polydactyly
- Many different mechanisms disrupt chromatic contacts causing many different phenotypes
- What are he regulatory regions and target gees ? Real physical distance and frequency of contacts? How contacts established?
- Address using technology called genome architecture mapping GAM
- Sample using thin cryosections; cosegregation of nuclear profiles (how often colored together) implies distance 
- Requires many many nuclei? If you want to see 30kb windows then need 300 cryosections 
- Can identify tads so can be identified by non C tech
- Some regions are contact and interacting because specific to function and others re bystanders; 
- look across population; probability interacting based on how often observed together in slice 
- Most contacts involve active genes and enhancers as expected 
- Get finer resolution by Identify which windows ar intacting and dividing window and assess frequency of cosegregation of finer windows 
- Multiple super enhancers contact simultaneously in embryonic stem cells

## Chromosome dynamics revealed by single cell HiC; Peter Fraser; Babraham Institute, UK 
- Single cell Hi-C contacts suggest spherical chromosome  arrangement 
- Laminar associated domains tend to be on outside
- Diagonals (transmalignment) in single cell Hi-C suggest alignment during mitosis division so can see arrangement by spindles during division
- Can infer cell cycle this way based on intachrompspmal contact decay
- Chromosome paint shows genes point inwrd PhysicallY
- Still very sparse coverage so can only make inference on what's consistently observed as opposed to what's not observed 
- Concern that hic is nuceosome rich and not capturing organization of all regions; may not be nice and spherical

## Single-cell ATAC-seq identifies epigenetic differences in human pancreatic islet cell subtypes from normal and diabetic donors; Amanda Ackerman; Children's Hospital of Philadelphia
- Islet cells in pancreas impact diabetes, has known lineage- pancreas progenitor differentiate into alpha beta and exocrine cells 
- Alpha does glucagon secretion and beta does insulin secretion 
- In disease get dedifferentiation of beta cells or transdifferentiate into alpha cells 
- Plan is to apply to diabetic as well as obese but not diabetic patients 
- Possibly 4 subtypes of beta cells with different functions (speculative)
 
## Dissecting Deregulated Enhancer Activity in Primary Leukemia Cells Jan-Philipp Mallm German Cancer Research Center (DKFZ), Germany
- Use chipseq to look at his tone modifications 
- Differential regions of modification between normal and cll B cells
- Can we deactivate lost enhancers?
- Performs scatac sequencing of cll patients 
- Panobinostat treatment activate lost enhancers in cll 
- Extract enhancer promoter wiring to refine GO groups 
- Lmp1 virus transform cll cells through enhancers 

## *Session 3: Immunology Chair: John Marioni, EMBL-EBI & CRUK CU, UK*

## Understanding Cellular Heterogeneity; Sarah Teichmann; Wellcome Trust Sanger Institute, UK 
- Sensitivity and specificity of scRNA-seq protocols
- Compare smartseq, strtseq, marsseq, all techniques found 
- Based on Ercc spike ins (bioinformatics metadata analysis)
- Endogenous rna may not be naked like spike ins so maybe more difficult to capture 
- so compare Ercc with smFISH genes 
- Show endogenous genes are captured at higher efficiency (countr intuitive)
- Freeze thaw cycles decrease rna content by 20%
- Finds high accuracy for all methods though expected lower for simultaneous methods like gtseq
- Sensitivity drops more dramatically for some protocols (10^5-6 best)
- Published in biorxiv

- Reconstruct T cell differentiation by aligning cells by pseudo time using Gaussian process latent variable model
- Encod information about time as a prior
- Work or valentine scwennson who is interested in our lab
- Identify bifurcation point: when cell decides fate to th1 and TFH
- Fate bifurcation coincides with proliferation peak; look for trend correlations in different pseudo times 
- Extract genes associated with one fate or another 
- Use TCR to show that two different cell types can come from the same progeitor; TRACER software
 
 
## Immunology in the age of single cell genomics; Ido Amit; Weizmann Institute of Science, Israel 
- Need new molecular microscope 
- Communication between immune and tissue cells dictate fate (matcowich science 2016) ; micro biome also impacts cell types (cell 2016)
- Combine with crispr to confirm function of guide rna and their combinations 

## Long-term single cell quantification: New tools for old questions; Timm Schroeder; ETH Zurich, Switzerland
- Need continuous single cell quantification to unambiguously resolve tree
- Pseudo time ordering cannot recapitulate oscillations 
- Pseudo time can distort real time dynamics
- TTT tracking softy analyze movies
- Find cells before and after decision to try to find regulators but decision may be mad far in advance; use live quantification in model mice
 
## Transcriptional heterogeneity and lineage commitment in hematopoietic progenitors; Amir Giladi; Weizmann Institute of Science, Israel 
- Finding differentiation manifolds
- Like pca but plot diffusion components 
- Apply to visualize early blood development on scrtpqcr 
- Software: destiny in R

## Single-cell RNA-seq-based identification and characterisation of somatic stem cells in adipose tissue & beyond; Bart Deplancke; Ecole Polytechnique Federale de Lausanne, Switzerland
- Study fat biology due to increasing obesity and associated cancer and immunological disorders 
- Adipocytes differentiate from MSC, which are very diverse 
- Marker based analysis of preadipostem cells not sufficient so use unbiased tsne 
- Find subpopulation with paracrine signaling between cells that have refractory and inhibitory function (modulation) lack of this subpopulation may link to increased adipo genesis 

- ASAP- interactive implemetation of lots of algorithms with no installation 
- Cloud based 
- Unpublished will post in bioarxiv 

- Discoseq
  
  
## Unbiased whole tissue analysis of the single cell transcriptional landscape of colon cancer; Matan Hofree; Broad Institute of MIT and Harvard, USA 
 - Droplet based analysis of whole colon tumor 
 - 10000 cells 1000 expressed genes


## Diffusion pseudotime identifies lineage choice and graded transitions in myeloid progenitors; Fabian Theis; Helmholtz Center Munich, Germany
- Paul et al cell 2015 finds marker genes for hematopoietic lineage suggests all stem cells are already primed
- Do unbiased sequencing then mark by known markers to identify distinct populations , already committed
- Focus on cells without strong lineage markers
- Want connection with main cluster 
- But cluster relationship may be driven by cell cycle or stress
- Find dormancy is coupled with increased expression of stemness genes
- Hsc can be dormant or not 
- Propose new reference model for hematopoiesis with early erythrocytes differentiation 
  

## *Session 4: Transcriptomics Chair: Sten Linnarsson, Karolinska Institute, Sweden*
  
## Single-cell gene expression analyses of allelic transcription and regulation; Rickard Sandberg; Karolinska Institute, Sweden 
- Paper: Petropoulos cell 2016
- Models of allergic expression: genetic imprinting, X chromosome inactivation, allelic exclusion, fixed widespread autosomal  random mono allelic expression
- Use smartseq2 
- Use SNPs from crossed mice to distinguish alleles 
- Two conflicting theories of x inactivation: hyunh nature 2003 and okamoto nature 2005
- Paternal/maternal X chromosome expression goes up then down suggesting de novo inactivation; coincides with xist activation 
- See chromosome wid pattern of lowered expression coinciding with xist expression; normalization/sampling bias?
- Yet biallelic expression during dosage compensation; biallelic dampening as cells mature  and xist get turned on
- Different for mouse and human though 
  
- Paper: Reining nature genetics in press
- Stochastic allelic fluctuations due to transcriptional bursting (sandberg nature genetics review 2015)
- Yet Sasha claims inherited mono allelic expression 
- Therefore analyze random mono allelic gene expression of clones of primary fibroblasts
- Find that among different clones mono allelic genes are not consistent
- Mono allelic genes with high pvalue all lowly expressed(?) Unclear why pvalue so high if only based on 2 copies of gene
- Haplotype phasing R package 
  
## Population balance reconstruction of differentiation hierarchies in developing and adult tissues by single cell droplet RNA-Seq; Allon Klein; Harvard Medical School, USA
- 7 cents per cell including tech salary
- Now getting 12000 umi or 4000 genes per cell
- SPRING for manifold discovery: first pca then knn, keep edges in force directly graph, interact with visualization since low dimension can never capture all complexity 
  
- Predicting cell fate tool PBA
- Model using population flux balance analysis
- Solve in high dimension via nearest neighbor graph 
- Cell trajectories are inferred by potential field sinks 
- Predict fate probabilities 
- At every fate branch point assess diff exp to characterize 

## Early metazoan cell type evolution by single cell RNA-seq analysis; Arnau Sebé-Pedrós; Weizmann Institute of Science, Israel 
- Nematostellao whole organism scrnaseq
- Only 200 umi per cell on average
- Very high Cell size variability
- Cluster using highly expressed genes
- Poor annotation of 3' utr are major issues for designing umis

## Sequencing Small-RNA transcriptome of individual cells; Omid Faridani; Karolinska Institute, Sweden 
- Add adapter to both end of small rna
- Issue is rRNA and lots of adaptor diners 
- For bulk can use size selection but can't in single cell
- In single cell eliminate rRNA, add 3' adaptor, digest free adaptors, then add 5' adaptor before cDNA synthesis
- Small rna only 18 to 40 nt
- Lots of small rna drives from mRNA; not just degraded 
- Serial dilution suggests 40% efficiency 


## Revealing novel cell types, cell-cell interactions, and cell lineages by single-cell sequencing; Alexander van Oudenaarden; Hubrecht Institute-KNAW, The Netherlands
- Retaining spatial information via local neighborhoods and interactions
- Manually separate cells physically attached together so now known at some point they were together
- Do for 1000 single cell
- Cluster and classify cells
- In analysis connect cells if physically connects 
- Compar with random interactions
- See which connections at more likely than random 
- Macrophages tend to be next to erythroblasts
- B cells to to be next to early neutrophils 
- Megakaryocytes next to matur neutrophils

- Paper: Mooijman et al nature biotech 2016
- Use 5 hydroxymethylation to track lineage
- Look at oocyte that divides
- For one chromosome, strand is either methylated or not and sister chromosome is opposite 
- Use this to identify sister cells 

## On the widespread and critical impact of systematic bias and batch effects in single-cell RNA-Seq data; Stephanie Hicks; Harvard School of Public Health, USA 

## Seq-Well: A Portable Single-Cell RNA-Seq Platform for LowInput Clinical Samples; Marc Wadsworth; MIT, USA 
- Clinical complications: need scalability, portability, high capture efficiency
- Uses microwell with membrane for sealing To confine mRNA t prevent cross contamination and increase efficiency
- Comparable capture efficiency and library complexities to dropseq
- Load beads night befor, 30 minut from cell loading to losing 

## Single cell preservation for RNAseq; Eshita Sharma; Wellcome Trust Centre for Human Genetics, UK 
- DSP a reversible cross linker to fix tissue sections shows high correspondence between fixed and fresh cells in bulk
  
## Single-cell transcriptomics and functional analysis of single cells; Marc Unger; FLUIDIGM, UK 
- HT mRNA seq
- $4500 for 800 cells for 6000 genes per cell 
- new 800 cell chip coming out soon, 10000 cell chip coming out next year

## Dissection of T1 Diabetes progression using Single cell RNA sequencing of a RAT model; Manuel Garber; University of Massachusetts Medical School, USA
- Study beta islet cells
- Immune activation causes decline of beta cell resulting in abnormal blood sugar 
- Create rat model since generally type 1 diabetes resistant 
- Can induce t1D using pic+krv treatment (aggivamt)
- Show same proportion of cell types as human
- Do time course to map disease progression; islets taken from different days

## *Session 5: Imaging and Modelling Chair: Alexander van Oudenaarden, Hubrecht Institute, The Netherlands*
  
## In situ transcription profiling in tissues by seqFISH; Long Cai; California Institute of Technology, USA 
- Get past fluorescence overlap by sequential hybridization on fixed cells
- Barcode corresponds to mRNA 
- Problem is with applying to thick tissue samples; high background
- Now use hybridization chain reaction 
- So amplify 24 rounds after hybridization to amplify then digest and repeat with new probe 
- Apply to 125 genes in cortex and hippocampus 
- Design barcodes so that even with dropouts will be ok
- Identify transcriptional clusters then map back on to image
- See astrocytes ar spatially co localized but tanscriptionally distinct 

## Dynamic and heterogeneous DNA methylation in pluripotent cells; Heather Lee; Babraham Institute, UK 
- ESC very homogenous when naïve but hetrogeneeous when primed 
- What is the relationship between DNA methylation heterogeneity and phenotype
- Variance of Dna methylation is greatest at enhancers
- Naïve esc have low Dna methylation but primed esc vary 
- Turnover of cytosine modifications generate Dna methylation heterogeneity 
- DNA methylation heterogeneity is resolved upon differentiation 

## Dynamic and heterogeneous DNA methylation in pluripotent cells; Steffen Rulands; University of Cambridge, UK 
- Auto catalytic methylation and time delayed de methylation predicts autonomous oscillations in methylation patterns
- Simple simulations recapitulate observations 
- Prove model correct ie oscillations true by synchronizing cells and measuring methylation over time
- See oscillations of methylation most strikingly in enhancers but also in other elements
- Competitive binding explains observed cpg density dependence 
  
  
## High-throughput, spatially resolved, single-cell transcriptomics with MERFISH; Jeffrey Moffitt; Harvard University, USA 
- Papers: Moffitt PNAS 2016, Chen science 2015
- Multiples by binary barcodes 
- 16 rounds of imaging for whole tanscriptome in theory but often read 1s as 0s due to dropout 
- Use error robust barcodes, need at least x errors to be mistaken for another mRNA 
- In a day do single optical slice about one millimeter thick
- Previously requires photo bleaching which is time costly
- Now use disulfide linker that can just be washed away
- No photo leaching also means imagining larger areas
- Multicolor imaging now like seqFISH (only 2 colors)
- Now 40000 cells in 18 hours
- 75 million rna across 110000 cells overall 
- Look at spatial correlation in culture 
- Moving towards whole tissue: hypothalamus 
- There are rnas that can't be targeted since too small, currently can capture 50% of transcriptome species 

## Massively parallel clonal analysis using CRISPR/Cas9 induced genetic scars; Jan Philipp Junker; Max Delbrueck Center for Molecular Medicine, Germany 
- Approaches for lineage tracking: brainbow or live tracking but it companionable with sequencing
- Use scar sequences induced by crispr into gfp transgender to track lineage
- Certain scars more likely than others since preferred by Dna repair mechanism
- Cut off zebra fish tail and regenerate; lineage tracing suggest regrowth composed of same cells in same spatial organization 
  
## Dissecting cell fate choice using single-cell genomics; John Marioni; EMBL-EBI/WTSI, UK
 - BASICS plos comp model 2015 for measuring over dispersion of genes integrating spike in 
 - Genome biology 2016 paper to characterize differential variability 
 - Basics now adapted to be without spike ins
 - Apply to aging immune system as unstimulated T cells
 - Find younger mice have greater mean expression of immune activity and mor variability in older mice 
 - Deconvolution approach by pooling single cells(?) For better diff exp(?)
  
## MAGIC: A Diffusion based data imputation method reveals progressions and gene-gene interactions in breast cancer cells undergoing EMT; David van Dijk; Columbia University, UK
 - Recover data by learning and exchanging information from similar cells
 - Challenging to find biologically similar cells
 - Want to find manifold distance instead of Euclidean distance 
 - Learn global structure through diffusion or small random walks
 - Convert from cell cell distance matrix to Markova affinity matrix
 - Diffuse data from cell to cell so that each cell has information from neighbor 
 - Validate by artificially creating dropouts 
 - Unclear if diffusion approach artificially connects distinct clusters?
 - Robustness to missing paths or groups in the manifold?
  
## Single-cell spatial reconstruction reveals global division of labor in the mammalian liver; Rom Shenhav; Weizmann Institute of Science, Israel 
 - Key liver functions ar spatially zoned
 - Need high resolution spatial reconstruction of zonation patterns -> smFish 
 - Manually annotate central vein and draw circles to assess gradient of expression as function of distance from center 
 - Quantify landmark highly expressed genes with distinct zonation profiles with smFish 
 - Use single cell rnaseq for other genes
 - Infer lobule layer using expression of landmark genes

## Accurate identification of somatic stem cells using single-cell RNA-sequencing; Petra Schwalie; EPFL, Switzerland
- How many kinds of adult stem cells are there lots of remaining questions
- Find stemness signature 
- Machine learning approach using raining on neuronal and hematopoietic stem cells , reg logistic regression
- Apply to independent intestinal stm cell data from grun et al nature 2015
- Use stem checker to find genes identified have previously implicated in stemness programs


