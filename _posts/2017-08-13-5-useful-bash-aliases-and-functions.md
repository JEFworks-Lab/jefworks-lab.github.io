---
layout: post
tags: [lists, notes]
---

# 5 Useful Bash Aliases and Functions For Lazy Bioinformaticians

Continuing on our theme of [making bioinformatics more sexy with buzzfeed-esque blog post titles](http://jef.works/blog/2017/08/03/5-must-dos-for-efficient-bioinformatics/), here are 5 useful bash aliases and functions so you can remember fewer non-intuitive options, type fewer keys for the same output, and overall be more productive and efficient in your bioinformatics analysis :D ie. have more time to look at [dank memes](http://knowyourmeme.com/memes/dank-memes). 

I'll try to keep to aliases and functions that may be more niche to bioinformatics and ones I haven't seen frequently included in other "useful bash aliases and functions" lists such as `alias ..='cd ..'`. There are many more general lists of useful bash aliases and functions such as this one by [Justin Ellingwood](https://www.digitalocean.com/community/tutorials/an-introduction-to-useful-bash-aliases-and-functions) and this one by [Gulshan Singh](https://www.gulshansingh.com/posts/useful-bash-aliases/). 
	
---
	
## 1. Tar and compress (and untar) all those fastq, csv, vcf, and other files

I can never remember the flags...so let's just make an easy to understand function called targz to tar.gz a file or folder and likewise for extracting. Note this is a bash function so it should be put into your `.profile` or another dedicated `.bash_functions` file to be sourced from your `.bashrc`. 

**Functions:**

```sh
# create .tar.gz 
targz() { tar -zcvf $1.tar.gz $1; rm -r $1; }
# extra .tar.gz
untargz() { tar -zxvf $1; rm -r $1; }
```

**Usage:**

```sh
> targz test
a test
a test/test.txt
untargz test.tar.gz 
x test/
x test/test.txt
```

![]({{ site.url }}/images/compressallthedata.png)


## 2. Count number of files in a directory

This is very useful for counting the number of fastq or other dataset files you have.

**Function:**

```sh
numfiles() { 
    N="$(ls $1 | wc -l)"; 
    echo "$N files in $1";
}
```

**Usage:**

```sh
> numfiles test
       10 files in test
```

![]({{ site.url }}/images/doge.png)


## 3. Search through your command history

If I've typed out the same command more than once, then I've typed it out too many times. 

![]({{ site.url }}/images/aintbodygottimeforthat.png)

Note, aliases should be added to your `.bash_aliases` file. 

**Alias:**

```sh
alias hs='history | grep'
```

**Usage:**

```sh
> hs test
 1883  emacs test.R
 1900  less test.R
 2003  history | grep test
 2008  hs test
```

(now you can use `!2008` to repeat command #2008)


## 4. Navigate more easily

This is a simply one, but I use it very frequently. If you work on a shared cluster, your group will likely have a group directory at some obscure path. You will essentially be cd-ing to it all the time. So why not just make a fast alias.

**Alias:**

```sh
# navigation
alias 2pklab='cd /groups/pklab/jfan/'
```


## 5. Make a folder and go into it

Another simple one but very helpful. If I make a directory, I often want to `cd` into it. So why not just make one command for that?

**Function:**

```sh
mkcd() { mkdir -p $1; cd $1 }
```

And there you have it. Here is my [cat tax](http://www.urbandictionary.com/define.php?term=cat+tax&defid=10979502) for posting a less-than-professional post: (my dog [Foxxy](https://www.instagram.com/pomdeterrier/))
![]({{ site.url }}/images/foxxy.png)

---

Want to join in on the fun but don't know what to blog about? Get inspired with my [random buzzfeed-inspired title generator (bioinformatics grad student edition)](http://jef.works/buzzfeed-title/). With inspirational creations like "The 12 Most Beloved Nature Papers Of Your Childhood" and "40 Figures That Will Make Your Skin Crawl", your next big hit is waiting to be generated. 


