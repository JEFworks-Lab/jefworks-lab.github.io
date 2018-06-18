---
title: Get your R package on CRAN in 10 steps
layout: post
comments: false
tags: [notes, R, lists]
---

I recently got my first R package on CRAN! For those who don't know, [the Comprehensive R Archive Network (CRAN)](https://cran.r-project.org/) is the main repository for R packages. The packages on CRAN are the ones available to install via `install.packages` in R. 

The package that just got accepted is called [`liger` for Lightweight Iterative Geneset Enrichment in R](https://cran.r-project.org/web/packages/liger/). A little back story: `liger` was actually the first R package I made back when I first started grad school and was learning R. My PI at the time [Peter Kharchenko](http://pklab.med.harvard.edu/) had written this C++ code to do gene set enrichment testing, which I was using a lot. So to make things more convenient for myself, and to take advantage of the opportunity to learn how to make R packages, I packaged up his code into `liger`.

So `liger` has been around for awhile in some packaged form. I put all my software, including `liger`, on [Github](https://github.com/JEFworks/) so that they may be more accessible and potentially useful to the broader scientific community. But I've admittedly procrastinated putting anything on CRAN because of its reputation for being unnecessarily hostile. As [Karl Broman recommends to those submitting to CRAN: "put on your armor."](http://kbroman.org/pkg_primer/pages/cran.html) Personally, my experience with submitting to CRAN was quite smooth. Maybe I'm an outlier! But keep in mind that CRAN is run by volunteers, and a large part of your experience will depend on which volunteer(s) you end up working with.

Based on my experience, I've put together these 10 steps to help make my (and your) next CRAN package submission go a little more smoothly and to remind myself of what to expect. 

## 1. Organize your R package following [Hadley's guide](http://r-pkgs.had.co.nz/)

This step is a long one. Luckily, [`devtools`](https://www.rstudio.com/products/rpackages/devtools/) really helps (it's an R package for making R packages; how meta!) 

Hadley's guide basically covers everything from documenting functions using `Roxygen` to preparing your NEWS for release. So check it out. 

By the end of this step, you should be able to put your package on Github and have people install your package via `devtools::install_github`. So at this stage, people are already able to use your package. [`liger` was on Github for many years](https://github.com/JEFworks/liger) before CRAN. 

However, to get into a repository like CRAN, additional steps are needed to make your package pass their quality inspection. 

## 2. Make your package, examples, and vignettes as small as possible

CRAN tests all its packages *daily*. This means that all submitted packages must be small in terms of data that comes with the package and especially its documentation so that CRAN can actually run. Each executable function in your R package should come with an example of how to use the function. However, the time it takes to run the function should not exceed 10 seconds! 

The function example doesn't have to make sense. It just has to show users how to use the function and allow the function to be tested. For example, `liger` is an iterative test and typically runs for over 10,000 iterations in order to achieve the desired bounds for significant p-values. But to minimize runtime, documentation examples only run for 100 iterations. 

You can check [CRAN's latest policies for more specifics](https://cran.r-project.org/web/packages/policies.html).


## 3. Set up your .Rbuildignore file 

When you build your source package (either using `devtools`, RStudio, or just `R CMD build .`), you end up with a `.tar.gz` file that you will eventually upload to CRAN through their web portal. However, CRAN is not happy if you accidentally include your `.git` folder or other files not relevant to your package in this `.tar.gz` file. To avoid this, set up your `.Rbuildignore` file to omit these folders and files not relevant to your package.

You can always check what's in your `.tar.gz` file using 

```
tar tvf YOURPACKAGE.tar.gz
```

to confirm that it doesn't contain spurious files and folders. You will know which files are spurious in Step 4 because a `"Non-standard file/directory found at top level"` warning will be thrown.


## 4. Check your R package 

Run 

```
R CMD check --as-cran YOURPACKAGE.tar.gz
```

If there are *any* errors, warnings, or even notes, your package will be automatically rejected! 

The official CRAN policy says that your package will be rejected if there are any "substantial notes" but it seems like their notion of "substantial" is quite different from mine. `liger` was automatically rejected (more on this later) once for a note that examples took >10 seconds to run and another time for this cryptic C++ note that had to do with something internal to Rcpp. Basically, the only notes that will be tolerated are "possible mis-spelled words in DESCRIPTION."


## 5. Set up travis testing if possible to check your package on multiple systems

CRAN will re-build your package daily on *multiple systems*. So your package must be installable on *all systems*. If you're like me and only have access to Unix/Linux systems, trying to test your package on a Windows machine may be difficult. Luckily, [travis](https://travis-ci.org/) can help. Refer to the travis documentation for usage instructions. 

However, even with travis testing, `liger` initially failed CRAN's automated testing (more on this later), due to a multi-core threading issue specific to Windows. So it's a good check but not perfect. 


## 6. Submit your package via the [web portal](https://cran.r-project.org/submit.html)

Again, if you package has any errors, warnings, or notes, you will get an automated email reply (within a few hours of submission) that says something along the lines of:

> "Dear maintainer,
> 
> package [your package] does not pass the incoming checks automatically, please see the following pre-tests:
> 
> [your errors, warnings, or notes]
> 
> Please fix all problems and resubmit a fixed version via the webform.
> 
> [additional details]"

Just fix and resubmit.


## 7. Pass the automated checks and wait

If you manage to pass the automated checks, you will get an email (again within a few hours of submission) that says:

> "Dear maintainer,
> 
> package [your package] has been auto-processed and is pending a manual inspection. A CRAN team member will typically respond to you within the next 5 working days. For technical reasons you may receive a second copy of this message when a team member triggers a new check. "
> 

Now, you just have to wait for a CRAN member to check your package and write back with a list of comments/requests. Fingers crossed you get someone reasonable! 

For me, `liger` passed automated checks Saturday. Volunteer [Swetlana Herbrandt](https://www.statistik.tu-dortmund.de/herbrandt_eng.html) replied Tuesday. So pretty quick turn-around!

## 8. Address comments and resubmit with message detailing how comments have been addressed

The volunteer who reviews your package will most likely have a few requests for you. Just fix your package and resubmit via the web portal again. This time, you can include information about your resubmission in the "optional comments" section. 

For me, the only requests for `liger` was to update the DESCRIPTION file to include a few DOIs and put a few words in quotes. I was able to resubmit the package the same day on a Tuesday and the package was accepted and online by Thursday. Again, pretty quick turn-around. 

## 9. Get congrats email

Eventually, you will get an email that your package is on its way to CRAN! Congrats! Your package will then appear a few hours later on CRAN: https://cran.r-project.org/web/packages/YOURPACKAGE

There does not appear to be any notification when the web page becomes available or when people can start installing your package using `install.packages` but my guess is that it shouldn't be more than 1 day after your congrats email. 

## 10. Wait for binaries to build

Again, once your package is accepted into CRAN, it shouldn't be more than a day before people can start installing your package from source. It will take a few additional days for CRAN to build the Windows and OS X binaries. You will receive a notification via email once the binaries are built:

> "Dear package maintainer,
> 
> this notification has been generated automatically.
Your package [your package] has been built for Windows and
will be published within 24 hours in the corresponding CRAN directory.

So good luck and thanks for your contribution to publically accessible open-source software! If you end up with a pedantic and hostile reviewer, remember that they are volunteers and volunteers are people too! Don't let one cranky volunteer who may be having a bad day discourage you from participating in the broader open-source software community!

# Additional, more comprehensive guides on R package development and CRAN submission

- [http://kbroman.org/pkg_primer/pages/cran.html](http://kbroman.org/pkg_primer/pages/cran.html)
- [http://johnmuschelli.com/neuroc/getting_ready_for_submission/index.html](http://johnmuschelli.com/neuroc/getting_ready_for_submission/index.html)
- [http://www.deanbodenham.com/learn/r-package-submission-to-cran.html](http://www.deanbodenham.com/learn/r-package-submission-to-cran.html)
