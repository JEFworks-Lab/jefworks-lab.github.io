---
title: Automate testing of your R package using Travis CI, Codecov, and testthat
layout: post
comments: false
tags: [R, tutorial, notes]
---

# Introduction

I made [my first R package](https://github.com/hms-dbmi/scde) during my PhD. And since then, I've made [a few more](https://github.com/JEFworks/). Over the years, I've learned a lot more about R package development and have really appreciated the importance of *continuous integration* and *unit testing*: development practices to help sure that your package will install and run as expected across multiple systems. I've also encountered many wonderful tools to help with continuous integration and unit testing of R packages that are hosted on software development platforms such as Github. I find these tools particularly helpful for collaborations, since when a collaborator makes a pull request on Github, their pull will be automatically subjected to the same tests to quickly give both you and the collaborator a sense for whether their pull should be considered for merging. 

Here are just a few tools for continuous integration and unit testing of R packages on Github along with sample configuration files to use them. 

---

# Our tools

[Travis CI](https://docs.travis-ci.com/user/for-beginners/) is a continuous integration platform that automatically builds and tests code changes, providing immediate feedback on the success of the change. It's free for open source packages. 

[Codecov](https://codecov.io/) is a reporting tool that checks what percentage of your software's functions are being properly tested through unit tests. It's free for open source packages. 

[testthat](http://r-pkgs.had.co.nz/tests.html) is an R package that allows you to make unit tests that will run automatically through a continuous integration platform.

---

# Getting started with `Travis CI`

To use `Travis CI`, you will need to sign in to [travis-ci.org](https://travis-ci.org/) using your Github account. You should then be able to see all your public Github repositories in your account settings and "turn on" the ones you would like to do `travis` testing for. 

You will then need to include a `.travis.yml` configuration file in your R package's Github repo. The `.travis.yml` configuration file should specify the language as `R`, which version of your R package to test, and other preferences (ex. I prefer to set `warnings_are_errors` as `false`). I also like to get emails notifying me when the build status of my package has changed (either from success to failure or failure to success; I don't really care if the last build was successful and the new build is still successful for example). 

So at a most basic level, your `.travis.yml` configuration file will probably look like this:

```
language: r
cache: packages
warnings_are_errors: false

r:
  - oldrel
  - release
  - devel

notifications:
  email:
    on_success: change
    on_failure: change
```

Some times, my R packages have external (non-R) dependencies such as `jags` for Bayesian hierarchical modeling, so I need to install these dependencies before I attempt to install the R package.

```
## dependencies that need to be installed beforehand if any
sudo: true
before_install:
  - sudo apt-get install jags
  - sudo apt-get install r-cran-rjags
```

Some times, my R packages depend on packages available on Bioconductor (and not CRAN), so I need to specify that as well. 

```
# environment variables set for all builds
env:
  global:
    - BIOC_USE_DEVEL="FALSE"  ## Use the current release version

# we need to install BiocInstaller for testing Bioconductor packages
bioc_required: true
```

Now, every time you push to your R package's Github repo, `travis` will automatically attempt to build and install your R package, as if to run `devtools::install_github`,  on multiple systems. If your push some how broke your package, you will get notified! You also get a cool badge to add to your package's `README.md` file: [![Build Status](https://travis-ci.org/JEFworks/MERingue.svg?branch=master)](https://travis-ci.org/JEFworks/MERingue)

For more details, check out: [https://docs.travis-ci.com/user/languages/r/](https://docs.travis-ci.com/user/languages/r/)

---

# Getting started with `Codecov` 

To use `Codecov`, you will need to add the following to your `.travis.yml` file:

```
# for codecov
r_packages:
  - covr

# only report coverage after build is successful
after_success:
  - Rscript -e 'covr::codecov()'
```

To access the resulting coverage reports after every successful `travis` build, you will need to sign in to [codecov.io](https://codecov.io/) using your Github account. You also get a cool badge to add to your package's `README.md` file: [![codecov.io](https://codecov.io/github/JEFworks/MERingue/coverage.svg?branch=master)](https://codecov.io/github/JEFworks/MERingue?branch=master)

---

# Getting started with `testthat`

Of course, just because you've installed `Codecov`, doesn't mean it has anything to test. To give `Codecov` something tests, I generally follow [Hadley Wickham's R package testing guide](http://r-pkgs.had.co.nz/tests.html), which uses the `testthat` R package. These tests will also be run on `travis`. 

To set up your R package to use testthat, run:

```{r}
devtools::use_testthat() 
```

This will create a `tests/testthat` directory. You can then add R scripts (that must have names starting with `test`) to the directory. 

For example, consider my package has the following function for generating normally distributed randomly numbers using the [Box-Muller transform](https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform): 

```{r}
boxMuller <- function(size) {
    
    # generate uniform random variables
    u <- runif(size)
    v <- runif(size)
    
    # transform into gaussian random variables
    x <- rep(0,size)
    for (i in 1:size){
        x[i] = sqrt(-2*log(u[i]))*cos(2*pi*v[i])
    }
    
    return(x) 
}

```

I am interested to see if the distribution I've generated is comparable to the normal distribution provided by R's built in `rnorm()`. I will generate 10000 random numbers using both approaches and then use a [Kolmogorov-Smirnov test](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test) to determine whether the distribution of these two sets of numbers are the same. 

```{r}
test_that(context("Correct distribution of random numbers", {
    x <- boxMuller(10000)
    y <- rnorm(10000)
    pv <- ks.test(x,y)$p.value
    # fail to reject null hypothesis 
    expect_equal(pv > 0.05, TRUE)
})
```

The function works as expected and nothing is outputted.

Alternatively, consider what will happen if I mess up my Box-Muller transform function by changing from a natural `log` to a `log10`:

```{r}
boxMullerWrong <- function(size) {
    
    # generate uniform random variables
    u <- runif(size)
    v <- runif(size)
    
    # transform into gaussian random variables
    x <- rep(0,size)
    for (i in 1:size){
        x[i] = sqrt(-2*log10(u[i]))*cos(2*pi*v[i])
    }
    
    return(x) 
}
```

Now, when I try to test:

```{r}
test_that(context("Correct distribution of random numbers", {
    x <- boxMullerWrong(10000)
    y <- rnorm(10000)
    pv <- ks.test(x,y)$p.value
    # fail to reject null hypothesis 
    expect_equal(pv > 0.05, TRUE)
})
```

An error is returned as expected.

```
Error: pv > 0.05 not equal to TRUE.
1 element mismatch
```

This error will be reported on `travis` and I will be notified. The system works!

---

# Sample `.travis.yml`

```
# Use R
language: r
sudo: true
cache: packages
warnings_are_errors: false

# environment variables set for all builds
env:
  global:
    - BIOC_USE_DEVEL="FALSE"  ## Use the current release version
    - R_BUILD_ARGS="--no-build-vignettes --no-manual"
    - R_CHECK_ARGS="--no-build-vignettes --no-manual --timings"  ## do not build vignettes or manual
    - _R_CHECK_TIMINGS_="0"  ## get the timing information for the examples for all of your functions

r:
 - release

# do not build vignettes...takes too long and times out on travis
r_build_args: --no-build-vignettes --no-manual
r_check_args: --no-build-vignettes --no-manual --timings

# for codecov
r_packages:
  - covr
  
# we need to install BiocInstaller for testing Bioconductor packages
bioc_required: true

# only report coverage for the release version
after_success:
  - test $TRAVIS_R_VERSION_STRING = 'release' && Rscript -e 'covr::codecov()'

notifications:
  email:
    on_success: change
    on_failure: change
```

---

# Conclusion

Rigorous and continuous testing is an important part of package development. It does require more effort and adds more steps to your development workflow. But in the long run it will help ensure that your package works as expected and ultimately provide a better experience for users (even those using Windows >_<). Happy testing!

