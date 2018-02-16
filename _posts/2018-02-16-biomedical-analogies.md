---
layout: post
comments: false
tags: [machine learning, artificial intelligence, computer-aided discovery, word2vec]
---

# Can you solve these biomedical analogies?

More fun with word2vec! See my [previous post on getting started with word2vec](http://jef.works/blog/2018/02/06/fun-with-word2vec/) to run these examples yourself.

Can you solve these biomedical analogies? Or can a machine learning / artificial intelligence algorithm solve them better than you? Put yourself to the test! I put myself to the test and this is what I got.

## 1. Receptor ligand relationships

Recall that IGF1R is the receptor for IGF1.

**IGF1 is to IGF1R as HGF is to ____.**

In my naïveté, I would guess HGFR. Let's see what word2vec says:


```r
 > model %>% closest_to( ~ "IGF1R" - "IGF1" + "HGF")
      word similarity to "IGF1R" - "IGF1" + "HGF"
 1     HGF                              0.8062725
 2   c-Met                              0.7701611
 3   IGF1R                              0.7375224
 4   c-met                              0.7345159
 5   c-MET                              0.7340344
```

Omitting our input terms, it looks like the answer word2vec proposes is 'c-Met'.

According to Wikipedia: ["c-Met, also called tyrosine-protein kinase Met or hepatocyte growth factor receptor (HGFR)"](https://en.wikipedia.org/wiki/C-Met) so it looks like we're both right ;)

Let's try another. 

**IGF1 is to IGF1R as SDF1 is to ____.**

Uhhh, SDF1R? Let's see what word2vec says:

```r
      word similarity to "IGF1R" - "IGF1" + "SDF1"
 1    SDF1                               0.8387451
 2   CXCR4                               0.7308524
 3   CXCR7                               0.6997249
 4   ITGB1                               0.6853041
 5  CXCR-4                               0.6771502

```

Again, omitting our input terms, it looks like the answer word2vec proposes is 'CXCR4'.

According to Wikipedia: ["CXCR4's ligand SDF-1"](https://en.wikipedia.org/wiki/CXCR4)

So looks like I was way off.

## 2. Disease

Recall that insulin is a hormone that is released to signal absorption of glucose to regular blood sugar. In diabetic patients, insulin is not produced.

**Diabetes is to insulin as obesity is to ____.**

Ok. I'm not a dietician. I have no idea. word2vec says:

```r
> model %>% closest_to( ~ "insulin" - "diabetes" + "obesity")
                 word similarity to "insulin" - "diabetes" + "obesity"
 1            insulin                                        0.7239623
 2             leptin                                        0.6307069
 3            Insulin                                        0.6017395
 4          adiposity                                        0.5957565
 5            ghrelin                                        0.5901437
```

According to Wikipedia, leptin is a hormone that regulates energy balance by inhibiting hunger. Similarly, ghrelin is a hormone that promotes hunger.

Given these relationships, can you figure out:

**Leptin is to ghrelin as insulin is to ____.**

I know this one! Must be glucagon?

```r
 > model %>% closest_to( ~ "ghrelin" - "leptin" + "insulin")
         word similarity to "ghrelin" - "leptin" + "insulin"
 1    insulin                                      0.8649428
 2   glucagon                                      0.7823924
 3    Insulin                                      0.7570941
 4    ghrelin                                      0.7506850
 5      GLP-1                                      0.7482180

```

Yay glucagon! I didn't know about GLP-1 (Glucagon-like peptide-1), but it also [decreases blood sugar levels in a glucose-dependent manner by enhancing the secretion of insulin](https://en.wikipedia.org/wiki/Glucagon-like_peptide-1). So it seems like an appropriate answer too. Cool! Learned something new.

## 3. Cancer cell types

Astrocytoma is a cancer of the brain originating from a type of cell called astrocytes.

**Astrocyte is to astrocytoma as b-cells are to ____*

```r
> model %>% closest_to( ~ 'astrocytoma' - "astrocyte" + "B-cell")
            word similarity to "astrocytoma" - "astrocyte" + "B-cell"
 1      lymphoma                                            0.7575159
 2     lymphomas                                            0.7466955
 3        B-cell                                            0.7399720
 4  Burkitt-type                                            0.7304544
 5           NHL                                            0.7163928
```

All are lymphomas!

## 4. Drug discovery

Lupus is an autoimmune disease that causes inflammation. Its symptoms are often treated with nonsteroidal anti-inflammatory drugs (NSAID).

**Lupus is to NSAID as depression is to ____.**

I'm going to guess SSRIs.

```r
> model %>% closest_to( ~ "NSAID" - "lupus" + "depression")
               word similarity to "NSAID" - "lupus" + "depression"
 1    psychotropics                                      0.4961523
 2    tranquilizers                                      0.4881507
 3          tNSAIDs                                      0.4878482
 4      nonnarcotic                                      0.4767651
 5  benzodiazepines                                      0.4746059
```

Psychotropics are drugs affecting mental state, of which SSRI are one type. So actually psychotropics is the more appropriate answer here since it is much more general just like NSAIDs. I didn't even know about benzodiazepines but it is indeed a class of drugs use to treat depression and anxiety.

Ok. ADHD is commonly treated with dextroamphetamines like Adderall.

**Dextroamphetamine is to ADHD as SSRI is to ____.**

```r
> model %>% closest_to( ~ "ADHD" - "dextroamphetamine" + "SSRI", n=5)
    word similarity to "ADHD" - "dextroamphetamine" + "SSRI"
 1  ADHD                                           0.7410688
 2  SSRI                                           0.6886885
 3   OCD                                           0.6865491
 4   MDD                                           0.6664822
 5 AD/HD                                           0.6517358
```

Expectedly, we get MDD or major depressive disorder. Apparently, [antidepressants that inhibit presynaptic reuptake of serotonin (ie. SSRIs) appear to be effective in treating obsessive-compulsive disorder (OCD)](https://emedicine.medscape.com/article/1934139-medication?pa=qmhoq%2F0i3iWM3KUMMddIQdV94F%2BV0F1xWXYAowZcHJllaDKVGxDLwPCSbC4QleZx101hu2XZYTPBTatco%2FW9vSXZHQWXGyzgExYQKXXNXfA%3D).

I may not have done very well here but I learned a lot from my machine learning / artificial intelligence learning buddy. How did you do? Can you think of other biomedical analogies to test?
