---
title: Using R To Find The Missing Faculty
layout: post
comments: false
tags: [computer-aided discovery, tutorial, web scraping]
---

# The backstory

A few days ago, I received an email from a prospective PhD student who was interested in joining my lab for her doctoral training. In order to apply, she filled out the university's departmental application where she was asked to select three faculty members who she may be interested in working with from a list of faculty found on the program's faculty list website. However, she could not find my name among this list. So she had reached out to me to double check if she had chosen the wrong program. Understandably, confusion ensued. 

Indeed, I was not found among the program's faculty list. I thanked the student for bringing this to my attention and assured her that I was indeed a faculty member in the program. I reached out to the departmental admins who managed the website and the issue was quickly resolved.

---

## How a little computer science saves the day

However, did this issue impact just me? A quick manual survey of the program's faculty list website suggested at least a few other newer faculty members who I knew were also missing. However, I'm a rather new faculty member, so did this issue only impact new faculty members? Again, a quick manual survey found that other even newer faculty members were actually included. Likewise, a brief manual cross reference with another primary faculty list suggested that some more senior faculty members I knew were also missing. However, with well over 100 names to sort though and as I don't know that many faculty members in the program yet to be able to manually recognize if they were missing or not, I figured this issue could be much more quickly resolved computationally. So I used `Rvest` to computationally scrape the program's faculty list website and the primary faculty list website in order to find the missing faculty! 

```{r}
library(rvest)

## program faculty list website
url <- 'https://www.bme.jhu.edu/graduate/phd/program-faculty/'
content <- read_html(url) %>% html_nodes(".linkbullet") 
names <- lapply(content, function(links) {
  ## parse names
  people <- links %>% html_nodes('li')
  g1 = 'data-wpel-link="internal">'
  g2 = '</a>'
  lapply(people, function(person) {
    person = as.character(person)
    ind1 <- gregexpr(pattern = g1, person)[[1]] + nchar(g1)
    ind2 <- gregexpr(pattern = g2, person)[[1]] - 1
    name <- substr(person, ind1, ind2)  
    
    ## remove middle initial
    name <- gsub("([A-Z])\\.", "", name) 
    name <- gsub('  ', ' ', name) ## fix double space
    
    ## remove degrees 
    ind.end <- gregexpr(pattern = ',', name)[[1]] - 1 
    name <- substr(name, 0, ind.end) 
    
    return(trimws(name))
  })
})
program.names <- unique(unlist(names))

url <- 'https://www.bme.jhu.edu/people/primary-faculty/'
content <- read_html(url) %>% html_nodes(".people-info")
names <- lapply(content, function(links) {
  ## parse names
  person <- as.character(links)
  g1 = 'data-wpel-link="internal">'
  g2 = '</a>'

  ind1 <- gregexpr(pattern = g1, person)[[1]] + nchar(g1)
  ind2 <- gregexpr(pattern = g2, person)[[1]] - 1
  name <- substr(person, ind1, ind2)  
  
  ## remove middle initial
  name <- gsub("([A-Z])\\.", "", name) 
  name <- gsub('  ', ' ', name) ## fix double space
  
  ## remove degrees 
  ind.end <- gregexpr(pattern = ',', name)[[1]] - 1 
  name <- substr(name, 0, ind.end) 
  
  return(trimws(name))
})
primary.names <- unique(unlist(names))

## list difference 
missing.faculty <- setdiff(primary.names, program.names)
```

Excluding emeritus professors, who are among primary faculty but not included among program's faculty for legitimate reasons, below are the profiles of the faculty members who were initially missing from the program's faculty list. 

<div class="row">
<div class="col-md-3">
<img src="https://www.bme.jhu.edu/wp-content/uploads/2020/06/Jean-Fan.jpg" class="img-responsive img-circle">
</div>
<div class="col-md-9">
<h3><a href="https://www.bme.jhu.edu/faculty_staff/jean-fan-phd/" title="View profile -  Jean Fan, PhD" data-wpel-link="internal">Jean Fan, PhD</a></h3>
<p class="focus">Single-cell bioinformatics and computational methods development</p>
</div>
</div>		

<br>

<div class="row">
<div class="col-md-3">
<img src="https://www.bme.jhu.edu/wp-content/uploads/2020/09/Alison-Hill.jpg" class="img-responsive img-circle">
</div>
<div class="col-md-9">
<h3><a href="https://www.bme.jhu.edu/faculty_staff/alison-hill-phd/" title="View profile -  Alison Hill, PhD" data-wpel-link="internal">Alison Hill, PhD</a></h3>
<p class="focus">Infectious disease modeling, viral dynamics, evolutionary dynamics, drug resistance, network science, HIV/AIDS</p>
</div>
</div>	

<br>

<div class="row">
<div class="col-md-3">
<img src="https://www.bme.jhu.edu/wp-content/uploads/2020/03/Casey-Overby-Taylor.jpg" class="img-responsive img-circle">
</div>
<div class="col-md-9">
<h3><a href="https://www.bme.jhu.edu/faculty_staff/casey-overby-taylor-phd/" title="View profile -  Casey Overby Taylor, PhD" data-wpel-link="internal">Casey Overby Taylor, PhD</a></h3>
<p class="focus">Biomedical informatics, biomedical data science, decision support systems, precision medicine, and public health</p>
</div>
</div>				

<br>

<div class="row">
<div class="col-md-3">
<img src="https://www.bme.jhu.edu/wp-content/uploads/2020/04/Eun-Hyun-Ahn.jpg" class="img-responsive img-circle">
</div>
<div class="col-md-9">
<h3><a href="https://www.bme.jhu.edu/faculty_staff/eun-hyun-ahn-phd/" title="View profile -  Eun Hyun Ahn, PhD" data-wpel-link="internal">Eun Hyun Ahn, PhD</a></h3>
<p class="focus">Cancer genetics and genomics, molecular and cellular engineering, stem cells, bioinformatics</p>
</div>
</div>		

<br>

<div class="row">
<div class="col-md-3">
<img src="https://www.bme.jhu.edu/wp-content/uploads/2020/06/Jude-Phillip-2.jpg" class="img-responsive img-circle">
</div>
<div class="col-md-9">
<h3><a href="https://www.bme.jhu.edu/faculty_staff/jude-m-phillip-phd/" title="View profile -  Jude M. Phillip, PhD" data-wpel-link="internal">Jude M. Phillip, PhD</a></h3>
<p class="focus">Aging, mechanobiology, physics of cancer, cell-based biomarkers, cellular heterogeneity</p>
</div>
</div>	

<br>

<div class="row">
<div class="col-md-3">
<img src="https://www.bme.jhu.edu/wp-content/uploads/2020/01/Scott-Wilson.jpg" class="img-responsive img-circle">
</div>
<div class="col-md-9">
<h3><a href="https://www.bme.jhu.edu/faculty_staff/scott-wilson-phd/" title="View profile -  Scott Wilson, PhD" data-wpel-link="internal">Scott Wilson, PhD</a></h3>
<p class="focus">Biomaterials, immunoengineering, drug delivery</p>
</div>
</div>	

<br>

Again, this issue has since been resolved and all these faculty members have now been rightfully added to the program's faculty list. 

## But if you are a prospective student either applying or have already applied but are still looking around for rotation labs, please don't miss out on these potential mentors and their exciting areas of research! 
						
---

## Try it out for yourself
- Cross reference the faculty lists for your program or department. Is there anyone missing? 


