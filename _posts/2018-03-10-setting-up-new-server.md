---
layout: post
comments: false
tags: [notes, lists, bash]
---

# Setting up on a new server

I recently started my post-doctoral fellowship in a new lab. And this means getting set up on a new server! Here's a step-by-step reminder to myself of what to do when I inevitably need to do this again.

### 1. Avoid typing out long logins by editing your `~/.ssh/config`

```
Host od
    User jefworks
    Hostname odyssey.rc.fas.harvard.edu
    ForwardX11 yes
```

Now instead of doing `ssh jefworks@odyssey.rc.fas.harvard.edu` I can just do `ssh od`

### 2. Set up password-free ssh using ssh keygen

Tutorials:
- [https://slowkow.com/notes/ssh-tutorial/](https://slowkow.com/notes/ssh-tutorial/)
- [https://www.ssh.com/ssh/copy-id](https://www.ssh.com/ssh/copy-id)

(does not help with 2 factor authentication though)

### 3. Set bash preferences by editing `.bash_profile` (or `.bashrc` or `.profile` if you prefer)

Make your terminal have nicer colors:

```
# zenburn colors
function EXT_COLOR () { echo -ne "\e[38;5;$1m"; }
function CLOSE_COLOR () { echo -ne '\e[m'; }
export PS1="\[`EXT_COLOR 187`\]\u@\h\[`CLOSE_COLOR`\]\[`EXT_COLOR 174`\] \w \$ \[`CLOSE_COLOR`\] > "
export LS_COLORS='di=38;5;108:fi=00:*svn-commit.tmp=31:ln=38;5;116:ex=38;5;186'
```

### 4. Simply your life with `.bash_aliases` (or `.bashrc` if you prefer)

```
# navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ls="ls --color=auto"
alias ll='ls -l'
alias la='ls -la'
alias l='ls -CF'
alias c='clear'

# console mode
alias emacs='emacs -nw'

# job shortcuts
alias bjobs='squeue -u jefworks'
alias interactive='srun --pty -p zhuang -n 4 --mem=8000 -t 480 /bin/bash'

# loading common modules
alias loadR='module load gcc/7.1.0-fasrc01 openmpi/2.1.0-fasrc01 R/3.4.2-fasrc01 R_core/3.4.2-fasrc01 R_packages/3.4.2-fasrc01'
alias loadMatlab='module load matlab/R2017a-fasrc01'

# join a tmux session or create one
alias tm='
if [[ "$TMUX" == "" ]]; then
    host=$(hostname -s)
    # Check for an existing session, or else create it.
    if [[ "$(tmux ls 2>/dev/null | grep -o $host)" == "" ]]; then
        tmux new-session -s "$host"
    else
        tmux attach-session -t "$host"
    fi
fi
'
```

### 5. Set up Emacs (if not already available) and ESS (generally not available)

Emacs: [https://www.gnu.org/software/emacs/](https://www.gnu.org/software/emacs/)

ESS: [http://ess.r-project.org/Manual/ess.html#Installation](http://ess.r-project.org/Manual/ess.html#Installation)

Note some modules will need to be loaded prior to installation of ESS such as R and texinfo.

### 6. Configure Emacs preferences by editing `.emacs`

```
;; use ESS
(add-to-list 'load-path "~/Library/ESS/lisp/")
(load "ess-site")

;; Map Alt key to Meta
(setq x-alt-keysym 'meta)

;; do not prompted each time starting an interactive R session
(setq ess-ask-for-ess-directory nil)
;; hide welcome screen
(setq inhibit-splash-screen t)
;; stop changing underscores to arrows
(ess-toggle-underscore nil)
;; prevent auto-indenting one # comments common in R
(defun my-ess-settings ()
     (setq ess-indent-with-fancy-comments nil))
   (add-hook 'ess-mode-hook #'my-ess-settings)

;; Custom colors scheme
(add-to-list 'load-path "~/.emacs.d/themes/")
(load "zenburn-theme")

;; Emacs Load Path
(add-to-list 'load-path "~/.emacs.d/settings/")
;; Uncomment to enable Autopair
;(load "cl-lib")
;(load "autopair")
;(require 'autopair)
;(autopair-global-mode) ;; enable in all buffers
;(ac-set-trigger-key "TAB")
;(ac-set-trigger-key "<tab>")
;; Auto complete
(load "popup")
(require 'popup)
(add-to-list 'load-path "~/.emacs.d/settings/ac/")
(require 'auto-complete-config)
(add-to-list 'ac-dictionary-directories "~/.emacs.d/settings/ac/ac-dict")
(ac-config-default)
(global-auto-complete-mode t)
(setq ess-use-auto-complete t)

;; R-internals indenting
;;; for ESS
(add-hook 'ess-mode-hook
      (lambda ()
        (ess-set-style 'C++ 'quiet)
        ;; Because
        ;;                                 DEF GNU BSD K&R C++
        ;; ess-indent-level                  2   2   8   5   4
        ;; ess-continued-statement-offset    2   2   8   5   4
        ;; ess-brace-offset                  0   0  -8  -5  -4
        ;; ess-arg-function-offset           2   4   0   0   0
        ;; ess-expression-offset             4   2   8   5   4
        ;; ess-else-offset                   0   0   0   0   0
        ;; ess-close-brace-offset            0   0   0   0   0
        (add-hook 'local-write-file-hooks
              (lambda ()
            (ess-nuke-trailing-whitespace)))))

;;(setq ess-nuke-trailing-whitespace-p 'ask)
;; or even
(setq ess-nuke-trailing-whitespace-p t)

;; Perl
(add-hook 'perl-mode-hook
      (lambda () (setq perl-indent-level 4)))
```

### 7. Configure R preferences by editing `.Rprofile`

```
# Set default cran mirror
local({
    r <- getOption("repos")
    r["CRAN"] <- "http://lib.stat.cmu.edu/R/CRAN/"
    options(repos = r)
})

# Local install path
.libPaths(c("~/Library/Frameworks/R", .libPaths()))

# When is it ever true?
options(stringsAsFactors=FALSE)
```
