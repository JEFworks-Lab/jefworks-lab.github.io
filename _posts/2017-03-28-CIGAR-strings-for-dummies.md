---
layout: post
comments: true
tags: [notes]
---

# Smoke and CIGAR (strings) 

The 'CIGAR' (Compact Idiosyncratic Gapped Alignment Report) string is how the SAM/BAM format represents spliced alignments. Understanding the CIGAR string will help you understand how your query sequence aligns to the reference genome. For example, the position stored is the left most coordinate of the alignment. To get to the right coordinate, you have to parse the CIGAR string. 

Let's consider a few concrete examples. First example: The shown alignment will give position = 2 (0-based!) and CIGAR = 6M: 

```
AAGTCTAGAA (ref) 
  GTCTAG (query)
```

CIGAR strings have a number of operators:
```
M	Match 		Exact match of x positions
N	Alignment gap 	Next x positions on ref don’t match
D	Deletion 	Next x positions on ref don’t match
I	Insertion 	Next x positions on query don’t match
```

For CIGAR ='6M', this means there are 6 exact matches to the reference. So if we are starting at position=2, with 6 exact matches, we would end at position 7 (again 0-based):

```
0123456789
AAGTCTAGAA (ref) 
  GTCTAG (query)
```

Second example: The shown alignment will give position=2 (0-based) and CIGAR=3M2I3M: 

```
0123456789
AAGTC  TAGAA (ref) 
  GTCGATAG (query)
```

Here, two nucleotides ('GA') are inserted into the query. So if we are starting at position=2, based on the CIGAR string, we have 3 exact matches, 2 insertions, then 3 more exact matches, resulting in an end position of 9. 

Third example: The shown alignment will give position=2 and CIGAR=2M1D3M: 

```
0123456789
AAGTCTAGAA (ref) 
  GT TAG (query)
```

Note there is a deletion on the query. The 'C' in the reference sequence has no match. So if we are starting at position=2, based on the CIGAR string, we have 2 exact matches, 1 deletion, then 3 more exact matches, resulting in an end position of 7 relative to the reference. 

Fourth example: The shown alignment will give position=3 and CIGAR=3M7N4M:

```
01234567890123456
CCCTACGTCCCAGTCAC (ref) 
   TAC       TCAC (query)
```

This is a gapped alignment (due to a splicing event in RNAseq). So if we are starting at position=3, based on the CIGAR string, we have 3 exact matches, 7 gaps, then 4 more exact matches, resulting in an end position of 16.

## Additional resources
- [SAM documentation](https://samtools.github.io/hts-specs/SAMv1.pdf)
- [UMICH Center for Statistical Genetics](https://genome.sph.umich.edu/wiki/SAM)
- [Playing With Matches and CIGARs](http://zenfractal.com/2013/06/19/playing-with-matches/)



