# LSF for dummies

(Actually, if you've gotten to a point you need to use LSF, you're probably far from a dummy ;P)

LSF (Load Sharing Facility) is a system to manage programs that generally cannot be run interactively on a machine because they require too much CPU-time, memory, or other system resources. For that reason, those large programs have to be run in batch as jobs.

LSF takes care of that batch management. Based on the job specifications, LSF will start execution of jobs when there are enough system resources available for the job to complete. Until that time, a job request will be queued in a queue.


## What is a queue and what queues are available to me?

The queue is the basic container for jobs in the LSF system. Queues can have access controls placed on them (so only users in a certain group can use a certain queue, for example), and once a job is submitted, its queue determines how it is scheduled and where it is executed.

`bqueues` displays a list of queues

`bqueues -u all` shows the list of queues that all users can submit to


## How do I submit a job to a queue?

`bsub` submits a job to the LSF system

There are a number of options you can use (with examples):

`-n` 4  
Run on four cores (Some programs use "processors" or "threads" for this idea)

`-e` errfile  
Send errors (stderr) to file errfile. If file exists, add to it. 

`-N` notify  
Send email when job finishes

`-o` outfile  
Send screen output (stdout) to file outfile. If file exists, add to it. 

`-R "rusage[mem=10000]"`  
Resource request. Reserve 10,000 MB of memory

`-R "select[transfer]"`  
Resource request. Only run on "transfer" computers

`-W 30`  
Runlimit. Job will be killed if it runs longer than 30 minutes (30:00 means 30 hours)

Using the trivial example of running the program test.sh in the short queue with a runtime limit of 5 minutes  
`bsub -q short -W 5 test.sh`

Note we can also use bsub commands in combination with workflow management systems such as snakemake:  
`snakemake --snakefile tophat.snakefile --jobs 999 --cluster 'bsub -o "tophat.snakemake.out" -q short -W 12:00 -R "rusage[mem=4000]"'`

## Common issues

It's generally better to over-estimate than under-estimate run time and memory usage otherwise you may get errors such as 'TERM_MEMLIMIT: job killed after reaching LSF memory usage limit', etc. 

## Useful tips

If you submit to the wrong queue and would like to switch, try:

`bswitch -q long mcore 0`

This switches all pending jobs from the long to mcore queue. 

Another approach to give you more control is to use bmod:  
`bmod -q mcore <JOBID>`

Thus the following will give the same result as bswitch:
```
pend=$(bjobs | grep ‘PEND’ | awk ‘{ print $1 }’)
for i in $pend; do bmod -q mcore $i; done;
```

If you messed up and need to kill your jobs:  
`bkill <JOBID>` or `bkill 0` to kill all jobs


## Additional resources
[VUB/ULB Computing Centre Guide](http://www.vub.ac.be/BFUCC/LSF/)  
[Yale Computing Guide](http://research.computing.yale.edu/support/hpc/user-guide/submitting-jobs-lsf)  
[Harvard Computing Guide - beginner](https://wiki.med.harvard.edu/Orchestra/IntroductionToLSF)  
[Harvard Computing Guide - intermediate](https://wiki.med.harvard.edu/Orchestra/IntermediateLSF)  
