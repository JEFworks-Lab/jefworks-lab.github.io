---
layout: post
comments: true
tags: [lists, notes]
---

# 5 must-dos for efficient bioinformatics

My colleague [Kamil](http://slowkow.com/) was joking about how we need to make bioinformatics sexier and more click-bait-y with those ridiculous buzz-feed-esque headlines like 'N ways to X your Y' and 'M best Ws that will K your J'. So here are my 5 must-dos for efficient bioinformatics that I've tried to get all my students to adopt.

1. Get a text editor that can send commands to the terminal 
The biggest efficiency killer I've noticed from observing my students is how they write code in a text editor and then copy and paste that code to execute it in an interactive session. Then they'll have a bug in the code, fix it in their interactive session, but then have to remember to copy it back to their text editor. What? Time is wasted in just highlighting code with the mouse, copying and pasting...not to mention the flurry of missed tabs or semicolons from copy-and-paste errors. Using an IDE like [RStudio](https://www.rstudio.com/) for R and [Spyder](https://github.com/spyder-ide/spyder) for Python is a good way to mitigate these issues. My preference is to use [Emacs](https://www.gnu.org/software/emacs/) with [ESS](https://ess.r-project.org/). Whatever your preference, just find a way to write code in an editor and then execute that code directly with a keyboard shortcut instead of copying and pasting. 

2. Learn keyboard shortcuts
Speaking of keyboard shortcuts, this is necessary when using text editors like [Emacs](https://www.gnu.org/software/emacs/) and [Vim](http://www.vim.org/) but can also be extended to your browser with plug-ins like [Vimium](https://vimium.github.io/). When you work on the computer for as many hours as I do, you'll likely start developing muscle fatigue from large movements such as from the keyboard to the mouse and vice versa. So I try to use the mouse as little as possible by taking advantage of keyboard shortcuts to do everything from clicking on links or executing large chunks of code. The learning curve can be a bit steep and, depending on your level of discipline, it's very tempting to just use the mouse. So I recommend my students remove their mouse for a week to force themselves to learn keyboard shortcuts (easier said than done but the recommendation is made). 

3. Use a window manager 
There are many options for window managers but I prefer [Screen](https://www.gnu.org/software/screen/) or [Tmux](https://github.com/tmux/tmux/wiki). By using a window manager, you can multiplex your window and see how much compute, memory, etc you're using. But, my students will say, you could always just open up 3 separate windows and tile them next to each other...  STILL, the advantage of a window manager I see is for when you have a crappy connection. With a window manager, if your connection dies, your session can still be running and you can just reattach to it when you get your connection back. Plus, with a window manager like screen, I can log on to the server from home, start a screen session, begin running some stuff, close my computer, bus to work, and then reattach to that session once I'm at work. And by then, whatever I started running from home will be finished! 

4. Adopt a workflow management system 
Again, there are many, many, many options for workflow management systems but I like to use [Snakemake](https://snakemake.readthedocs.io/en/stable/). [Snakemake](https://snakemake.readthedocs.io/en/stable/) workflows are essentially Python scripts extended by declarative code to define rules. For example, I have a 'rule' for converting from SRA to fastqs, another rule for aligning using TopHat, another rule for aligning using STAR, another rule for marking duplicates using picard, another rule for quantifying gene expression using featureCounts, another 'rule' for using Kallisto, another rule for variant calling using GATK, yada yada yada. Then I can piece together these rules to create a uniform workflow that can be applied to lots of different datasets. 

5. DOCUMENT DOCUMENT DOCUMENT!
If I read through your code, given enough time, I can probably figure out what it does. But I can understand it much faster, if you just tell me what it does. Likewise, 3 months from now, future-you will be able to understand what past-you did a lot faster if current-you just documented properly. If you've written a function, write a line about what it does. What are the parameters? What is the output? I like to document as [roxygen comments](http://r-pkgs.had.co.nz/man.html). This will save you time later when you decide to package everything together and write the package documentation. 

There are lots of other best practices I recommend for my students including following certain style guides to keep code legible, version controlling using git or svn, and organizing folders in a particular way...but I will save that list for another post ;)

What are your tricks for improving efficiency in bioinformatics, coding, and beyond?
