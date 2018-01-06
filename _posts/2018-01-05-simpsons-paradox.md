---
layout: post
comments: true
tags: [probability, statistics, single cell]
---

<style>
table
{
font-size: 14px;
border-collapse:collapse;
margin:20px 0 0;
padding:0;
}

table tr
{
border-top:1px solid #ccc;
background-color:#fff;
margin:0;
padding:0;
}

table tr:nth-child(2n)
{
background-color:#f8f8f8;
}
table tr th[align="center"], table tr td[align="center"] {
text-align:center;
}
table tr th, table tr td
{
border:1px solid #ccc;
text-align:left;
margin:0;
padding:6px 13px;
}
</style>
													
# Illustrating the impact of Simpson's Paradox and the need to Single Cell measurements

[Simpson's paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox) is a phenomenon in probability and statistics in which a trend appears in several different groups of data but disappears or reverses when these groups are combined. It is often cited as a reason for single cell measurements. Here, we illustrate [Simpson's paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox) with an explicit hypothetical example relevant to single cell RNA-seq.

Consider a tumor sample pre- and post- drug treatment. 

The tumor consists of 3 distinct subpopulations A, B, and C (perhaps they're genetically distinct with different driver mutations). Prior to treatment, the dominant subpopulation was C, comprising 80% of the tumor, while subpopulations B and A comprised 16% and 4% of the tumor respectively. After treatment, perhaps in response to selective pressures imposed by the treatment, subpopulation C has shrunken while subpopulation A has grown to become the new dominant subpopulation. Now subpopulation C comprises only 4% of the tumor while subpopulation A comprises 80%. The proportion of subpopulation B is unchanged. 

---

A summary of the information thus far:

| Proportion | Pre-treatment | Post-treatment |
|-------------------|---------------|---------------|
| Subpopulation A | 0.04 | 0.80	|
|Subpopulation B	|0.16		|0.16		|
|Subpopulation C	|0.80		|0.04		|
|Total			|1.00		|1.00		|

---

Consider that we are interested in the impact of the drug treatment on a particular gene, Gene X. Gene X may be a target within the pathway affected by the drug treatment.

Prior to treatment, subpopulation A expressed Gene X at an average log CPM of 0.1, while subpopulation B expressed this gene at a higher level of 1.5 and subpopulation C at 3.0. Using bulk RNA sequencing, which does not allow us to distinguish among these subpopulations, we would observe an average expression of Gene X at 0.04\*0.1+0.16\*1.5+0.80\*3=2.64. As expected, the gene is fairly highly expressed on average in the tumor, since it is highly expressed in subpopulation C, which is the dominant subpopulation in the tumor. 

In response to the treatment, subpopulation A upregulates Gene X and now expresses it at an average log CPM of 0.3 (that's a LOG2(0.3/0.1)=+1.58 LOG2 fold change). Similarly, subpopulation B upregulates Gene X to 1.8 (+0.26 LOG2 fold change) and subpopulation C upregulates gene X to 3.5 (+0.22 LOG2 fold change). However, using bulk RNA sequencing, because of the underlying shift in subpopulation proportion, what we would observe is an average expression of Gene X at 0.8\*0.3+0.16\*1.8+0.04\*3.5=0.67. Now, the gene is fairly lowly expressed on average in the tumor because it is lowly expressed in subpopulation A, which is the new dominant subpopulation in the tumor. As you can see, this observed post-treatment average expression of Gene X is a decrease from our pre-treatment average, and with a not insignificant fold change of -1.98. Therefore, our bulk assay would lead us to believe that treatment with the drug results in downregulation of Gene X. 

---

A summary of Expression of Gene X:

|			|Pre-treatment	|Post-treatment	|Log2 Fold Change	|
|-----------------------|---------------|---------------|-----------------------|
|Subpopulation A	|0.10		|0.30		|+1.58			|
|Subpopulation B	|1.50		|1.80		|+0.26			|
|Subpopulation C	|3.00		|3.50		|+0.22			|
|Population Average	|2.64		|0.67		|-1.98			|

---

So how can it be that each subpopulation *INCREASED* its expression of Gene X but on average we observe a *DECREASE* post-treatment? Herein lies [Simpson's Paradox](https://en.wikipedia.org/wiki/Simpson%27s_paradox). As elegantly stated by Cole Trapnell, ["failing to properly compartmentalize the data by cell type leads to a qualitatively incorrect interpretation. The misleading effects of Simpson's Paradox are likely to be pervasive in modern experiments using bulk assays."](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4579334/)

Of course, this is just a dummy hypothetical example. However, this happens in real biology as well. The best explicit example of Simpson's Paradox I've seen in real biology (courtesy of Arjun Raj): [linc-HOXA1 is a non-coding RNA that represses Hoxa1 in cis](https://www.youtube.com/watch?time_continue=189&v=eqKneufCQcA)
