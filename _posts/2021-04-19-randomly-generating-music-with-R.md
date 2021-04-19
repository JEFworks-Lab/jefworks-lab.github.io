---
title: Randomly Generating Music with R
layout: post
comments: false
tags: [fun, R, computer-aided discovery, tutorial]
---

Beyond single-cell analysis, coding in `R` is a useful skill for lots of other fun things too :D

Here, I use the `R` package [`gm` by Renfei Mao](https://cran.r-project.org/web/packages/gm/index.html) to generate a random song.

```{r}
## install.packages("gm")
library(gm)
```

To generate my random song, I will select from a [corpus of possible major chords](https://www.michael-thomas.com/music/class/chords_notesinchords.htm).  

```{r}
## chords 
notes <- list(
  c('C4', 'E4', 'G4'), ## C major
  c('D4', 'F#4', 'A4'), ## D major
  c('E4', 'G#4', 'B4'), ## E major
  c('F4', 'A4', 'C4'), ## F major
  c('G4', 'B4', 'D4'), ## G major
  c('A4', 'C#4', 'E4'), ## A major
  c('B4', 'D#4', 'F#4') ## B major
)
```

I will randomly sample 3 chords and repeat the second chord to create a 4 chord melody. I will also repeat the 4 chords for the refrain. I do this twice to compose the general song. 

```{r}
## sample random notes
set.seed(100)
progn1 <- sample(notes, 3, replace=FALSE)
progn2 <- sample(notes, 3, replace=FALSE)
## song notes
songn <- c(progn1, progn1[2], ## repeat
           progn1, progn1[2],
           progn2, progn2[2], ## repeat
           progn2, progn2[2])
```

Instead of just a progression of chords, I will have one line of half notes, and one line of eighth notes where I break up the chord into its 3 notes, repeating a note for 4 notes per chord. 

```{r}
## split into two lines
bgn <- songn
bgd <- as.list(rep("half", length(bgn)))
mainn <- as.list(unlist(lapply(songn, function(x) c(x[1], x[2], x[1], x[3]))))
maind <- as.list(rep("eighth", length(mainn)))
```

Now, let's see what this song sounds like!

```{r}
## make music
m <-
  Music() +
  Meter(4, 4) +
  Line(pitches = mainn, durations = maind) +
  Line(pitches = bgn, durations = bgd)
show(m + Tempo(120), to = c("score", "audio"))
```

<br>

![](/assets/blog/fileee1f1fb4610.png)

<audio controls="controls">
  <source type="audio/mp3" src="/assets/blog/fileee1f1fb4610.mp3"></source>
</audio>

<br>

It'd be even more fun to train a generative adversarial neural network or other deep learning model on say the top Billboard or jazz melodies to generate new songs, but perhaps that will be left to a more ambitious and motivated student :)

Try it out for yourself and see what you can come up with!

---

## Additional resources
- [gm package on CRAN](https://cran.r-project.org/web/packages/gm/vignettes/gm.html)

For more creative coding, check out of some my other fun products:
- [aRt with code](https://jean.fan/art-with-code/) - generate custom art using R
- [CuSTEMized](https://custemized.org/) - generate personalized STEM storybooks



