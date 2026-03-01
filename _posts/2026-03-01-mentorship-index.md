---
title: The Mentorship Index
author: Prof. Jean Fan
layout: post
comments: false
tags: [vibe coding, fun]
---
## Background

Our department and university is in the process of [recruiting senior faculty](https://bdp.jhu.edu/dsai-bdp-clusters/)! So we recently were discussing candidates at a faculty meeting. One colleague mentioned that a candidate had an h-index of 100, which he found impressive. The h-index is defined as the maximum value h where a researcher has published papers that have each been cited at least h times. So since this candidate has an h-index of 100, they have published 100 papers that have been cited at least 100 times. This metric is intended [to capture both productivity and impact of a researcher's work as quantified through publications and citations](https://en.wikipedia.org/wiki/H-index). However, metrics are inherently reductive. Like all metrics, the h-index seeks to reduce a multi-dimensional career into a single number. Therefore, by definition, it has limitations. 

Another colleague quickly noted that even though this candidate has an impressive h-index, their last senior-author paper was from 10 years ago. In our field, senior authorship means that the person played a scientific leadership role, generally in the conceptualization and direction of the research project. This insight is not captured by an h-index. But it is also a metric: How many years ago was the last senior-author paper? This metric captured something different. It focused on the more recent evidence of scientific leadership. 

Indeed, this candidate at one point in their career was publishing highly cited papers, but within the past 10 years, shifted into a purely administrative role. Therefore, they had not published any senior-author papers after this shift. This is perfectly understandable. If we were looking for a dean or administrative position, perhaps this metric would be taken very positively. This additional metric allowed us to reflect on what we really wanted in this senior faculty recruit and whether this want was congruent with what this candidate seemed to be able to offer: scientific leadership or administrative leadership. 

The conversation made me reflect more broadly on what I really want in a senior faculty colleague, what aspects of other scientists I admire, what I believe our university as a whole would benefit from, and whether I could design my own metric to help parse out potential candidates. 

---

## The Mentorship Index

One thing I believe is really important for senior faculty is their track record of mentoring junior scientists. It's perfectly fine to mentor only already well-trained senior post-docs to engage in field-pushing work. But at a primarily undergraduate- and graduate-serving institution such as ours, I would personally want a senior faculty recruit to have a track record of training students who are less experienced.

It's one thing to have a sense of what's important. But how do we quantify it...particularly in a high-throughput manner?

We can only quantify what has been documented. Many senior faculty spend hours listening to and advising on their students' challenges. That's definitely mentoring. But I don't have access to such information. There is no global database for the number of hours a senior faculty spends with their students. What I do have access to is: publications. Publications provide documentation of who was involved in a scientific project and when they were involved. Perhaps more importantly, this information is not only documented, but it has been made accessible thanks to efforts like [OpenAlex](https://openalex.org/), which provides various nice APIs to access this information. 

From a publication, I can proxy how junior a scientist is based on the number of other papers they've been involved in. If a person has never been named on a paper, they are likely very new to science. Of course there are limitations to this metric because they could have been involved in projects that simply haven't led to papers. So it's always worth keeping in mind every metric is inherently reductionist and has limitations. 

But if I can proxy which person is a junior scientist by the number of publications they've been involved in, I can also proxy which person has a strong track record of mentoring junior scientists based on the number of papers where they served as last author and the first author was a junior scientist. In my own experience, for such papers, the senior author likely played a strong mentoring role in training the first author to completing the project. In contrast, if the first author has already been associated with 50 other papers, they likely have a better grasp of what it means to do good science and communicating the findings effectively. 

So I devise the M-index, the number of publications for which the scientist served as last author (typically indicating the senior/mentoring role) where the first author (typically the mentee who led the work) was relatively new to science (proxied by the number of publications associated with their name at that time). For example, the M10-index is the number of last-author publications where the first author had fewer than 10 publications at the time.

---

## Making the M-index accessible

Ok, now that we've defined the M-index, let's actually code it up! Better, let's vibe code a Javascript-based web app so anyone can input in a name and calculate their M-index! Again, the web app uses the API from OpenAlex. You can check out the website at [jef.works/Mentorship-Index](https://jef.works/Mentorship-Index/). There's no backend so no storage of what people search. The [code is all on my lab GitHub](https://github.com/JEFworks-Lab/Mentorship-Index/) if you'd like to fork or build on it or just take a look for yourself. 

<img src="/assets/blog/mentorship-index-screenshot.png" width="100%">

---

## Putting the M-index to the test

Ok. So now that we've defined the M-index and made an easy way to calculate it, let's put it to the test. Does it actually align with what I think it should capture?

I'm going to poke at two colleagues: [Lior Pachter](https://pachterlab.github.io/) and [Manolis Kellis](https://compbio.mit.edu/). 

I picked these two colleagues because:
1. Are at comparable stages of their career (full professors)
2. Are in similar fields (computational biology)
3. Have very distinct names (so our name-based query is likely not going to conflate their publication record with multiple scientists)
4. They're both quite active on social media (so they're already quite visible and used to such public examination) and generally seem to be good sports about these kinds of things
5. I have met both in-person and have spoken to them about their mentorship practices

Note, this already highlights some challenges posed by our metric formulation. For example, it wouldn't be fair to compare a senior emeritus professor and a new associate professor since the senior professor likely has a higher index by virtue of having been in their career longer. Likewise, it wouldn't be fair to compare someone in a larger computational field with someone in a smaller molecular chemistry field bcause the general rate of publishing is quite different across discplines. Further, our API search focuses on names, which can be challenging for those with common names (ex. Jane Smith), which may impact scientists from certain backgrounds more than others (like Chinese names ex. Xiao Wang). So take all results with a grain of salt. This is a blog post. Not a scientific paper. 

According to Google Scholar, Lior Pachter has an h-index of 88. In contrast, Manolis Kellis has an h-index of 170. So Manolis has the higher h-index. 

According to our new web app, Lior has an M10-index of 106. In contrast, Manolis has an M10-index of 38. So Lior has the higher M10-index.

<img src="/assets/blog/mentorship-index-screenshot2.png" width="100%">

This behavior of the M-index aligns with my expectations based on my familarity with both these colleagues. In particular, I recall having a conversation with Manolis about how he trains his students. In that conversation, he acknowledged that he has the privilege to work with already well-trained post-docs that he doesn't have to train much. This is consistent with his M-index, which highlights how most of the first-authors for his last-author papers have already published well. In contrast, in my conversations with Lior as well as many of his trainees, Lior’s lab includes many very junior graduate students, including those from underrepresented backgrounds. This is consistent with his M-index, which highlights how many of the first-authors for his last-author papers have been involved with few other publications at that time. 

I do want to emphasize that both approaches are perfectly valid! Collaborating with senior postdocs who bring in deep knowledge and experience can accelerate high-impact outputs, while investing in training junior, underrepresented students can broaden scientific participation in the field and lead to unexpected new research directions with unconventional approaches. These choices lead to different kinds of accomplishments, which can be reflected in these different metrics.

---

## Final thoughts

The M-index isn't meant to replace holistic evaluation of a faculty candidate's mentoring abilities. For all faculty candidates that are invited to interview, I will still ask them about their mentoring even if they may have a high M-index. But such metrics can help surface something I care about in ways that existing metrics like the h-index doesn't capture. In this way, creating new metrics can be an act of articulating our values. If we don't create metrics that reflect these values, we cede that ground to metrics that may not.

At the same time, I remain deeply wary of metrification culture. The [neoliberal impulse to quantify everything (to reduce human endeavors to numbers that can be optimized, ranked, and disciplined) has done real harm to academia](https://jean.fan/2026/01/12/neoliberal-academic-ecosystem.html). When metrics become targets, they cease to be good metrics. Hyperfixation with metrics like the [h-index has been shown to encourage gaming over genuine contribution, quantity over quality, and individual advancement over collective flourishing](https://retractionwatch.com/2025/12/08/how-to-juice-your-google-scholar-h-index-preprint-by-preprint/). And when institutions use metrics as substitutes for judgment rather than aids to it, we lose something essential about what it means to evaluate a person's work and worth.

But I don't think the answer is to abandon metrics altogether. That's neither practical nor, I'd argue, desirable. Metrics can illuminate patterns we'd otherwise miss. They help us articulate complex sentiments more quickly, just as it did during our faculty meeting. They can help us ask better questions, even if they can't provide complete answers. But we should never forget that behind every number is a person whose full contribution to science, to students, and to their community can never be fully captured by any single index we devise.

---

## Try it out for yourself!

So, what do you care about? What do you think we should reward and recognize? See if you can design a metric around what you believe is important. 