# Contributing to Grow with Google New England

## Table of Contents <!-- omit in toc -->

- [Instructions](#instructions)
  - [Suggest a project](#suggest-a-project)
  - [Get started with Git and GitHub](#get-started-with-git-and-github)
  - [Clone or fork](#clone-or-fork)
  - [Branch](#branch)
  - [Commit](#commit)
  - [Push](#push)
  - [Pull requests](#pull-requests)
  - [GitHub collaboration features](#github-collaboration-features)
  - [GPG](#gpg)
- [Code style](#code-style)
  - [Python](#python)
  - [JavaScript](#javascript)
  - [Markdown](#markdown)
  - [Other languages](#other-languages)
- [Text editor setup](#text-editor-setup)
  - [vscode](#vscode)

## Instructions

To initiate a collaborative project, please do the following:

### Suggest a project

- Create a markdown file and save with extension ".md".
  - Check out these resources if you are unfamiliar with Markdown:
    - [MarkdownGuide](https://www.markdownguide.org/)
    - [GitHub-Flavored Markdown](https://guides.github.com/features/mastering-markdown/)
    - [Markdown reference guide from @br3ndonland](https://github.com/br3ndonland/udacity-google/blob/master/markdown-guide.md)
- Add your project ideas and their specifications to the Markdown file and save.

### Get started with Git and GitHub

- Sign up for [GitHub](https://github.com) if you haven't already.
- Join the [Grow with Google - New England GitHub organization](https://github.com/growwithgooglema).
- Install Git
  - Mac:
    - Install [Homebrew](https://brew.sh/).
    - Install Git via Homebrew on the command line: `brew install git`
  - See the [Git Downloads page](https://git-scm.com/downloads) for more options.
  - *Why use Git?* It allows for maintenance of separate sets of the same code (branches), each with the ability to track and undo changes in high detail.
- Install the [GitHub Desktop](https://desktop.github.com/) git client.
- Install Git extensions for your text editor:
  - [Atom](https://atom.io/): [Git and GitHub support](https://github.atom.io/) built-in.
  - [Sublime Text](http://www.sublimetext.com/): [GitSavvy](https://packagecontrol.io/packages/GitSavvy)
  - [vscode](https://code.visualstudio.com/): [Git support](https://code.visualstudio.com/Docs/editor/versioncontrol) built in.
- Git and GitHub resources:
  - [Git docs](https://git-scm.com/)
  - [GitHub & Collaboration](https://www.udacity.com/course/github-collaboration--ud456) Udacity course
  - [Quick reference guide to Git and GitHub from @br3ndonland](https://github.com/br3ndonland/general/blob/master/guide-git.md)

### Clone or fork

- Fork vs. clone: A **clone** is a copy of a repository on your computer. A **[fork](https://help.github.com/articles/fork-a-repo/)** duplicates the project into the user's GitHub account, and still maintains connection to the original master. Forks can also be cloned. **If you are not a repository owner, you will not be able to push to the original repository.** Fork the repository on GitHub instead of directly cloning. Changes to forks can be merged into the `upstream master` with pull requests.
- Clone the repository from the GitHub fork to your computer.
  - [GitHub Desktop can be used to clone](https://help.github.com/desktop/guides/getting-started-with-github-desktop/).
  - If cloning from the command line:

    ```sh
    cd <PATH-WHERE-YOU-WANT-THE-REPO>
    git clone git@github.com:growwithgooglema/projects.git
    ```

### Branch

- We use two long-running branches, `master` and `dev`. **The only commits made to `master` and `dev` should be merge commits from feature branches**
- Changes are made on temporary feature branches and merged into `dev` with [pull requests](#pull-requests).
- Create a branch to isolate changes from the `master` or `dev` branches.
  - Use a clear, descriptive name for your branch.
  - Prefix the branch name with your initials to indicate that it should be unshared. Other contributors will not add commits to the branch.
  - Command line option: The `checkout -b` command creates a branch and switches to the new branch.

    ```sh
    git checkout -b featurebranchname
    ```

- **Pull with rebase** to keep branches and forks in sync. Bring in changes from GitHub with `git pull --rebase origin branchname`. This provides a nice linear commit history without unnecessary merge commits.

### Commit

- After saving files, changes need to be committed to the Git repository.
  - GitHub Desktop provides a user interface to make this easy.
  - Command line commits: Simply writing `git commit` instead of `git commit -m "message"` opens the text editor.

    ```sh
    git add --all
    git commit
    ```

#### Best practices for commits

**Make meaningful, cohesive, focused commits.** Commit when an objective has been completed, or before a major change is made. Break changes up into topics so the maintainer can easily accept or reject changes from a pull request.

**Include a commit message.** See [How to make a Git commit message](https://chris.beams.io/posts/git-commit/).

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
    > A properly formed Git commit subject line should always be able to complete the following sentence: If applied, this commit will *[your subject line here]*
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

```text
Imperative commit title limited to 50 characters
# Blank line
More detailed commit message body with lines wrapped at 72 characters
```

### Push

**Please push to a fork or feature branch and submit a pull request. Please do not push directly to `dev` or `master`.** It is best to reserve the `master` branch for just one cohesive version of the app that always works.

### Pull requests

- A pull request asks the owner of the master repository to merge changes from the requester's branch or fork to the master repository. See [About pull requests on GitHub](https://help.github.com/articles/about-pull-requests/).
- Click "New pull request" on the master repository's GitHub page.
- If you forked the repository, click "Compare across forks." The base fork is the location in the master repository where the changes will go. The head fork is your fork where the changes are located.

#### Best practices for pull requests

- **Submit pull requests for review by other team members.** Even if you have access to the master, making a pull request for a merge from `dev` to `master`, and requesting review, helps keep team members accountable and helps prevent merge conflicts and breaking of functionality.
- **Create pull requests from feature branches.** Creating branches like `dev` and feature or topic branches, and submitting pull requests from a branch, helps keep the master repository organized.
- **Provide a descriptive pull request message.**
  - List changes with bullet points.
  - Reference other pull requests that may be superseded by this request.

#### Reviewing and merging pull requests

- We use **pull request reviews** to discuss the code with other contributors.
- After a team member has discussed, reviewed, and approved the pull request, they should merge it from the feature branch into `dev`.

### GitHub collaboration features

- **Teams**: We use [teams](https://help.github.com/articles/about-teams/) for specific  initiatives within the organization. For example, the [MBTAccess team](https://github.com/orgs/growwithgooglema/teams/mbtaccess) is part of the *growwithgooglema organization*. We can add the organization's repos to it, such as the *mbtaccess repo*. The team provides more features, like a **discussion board.**
- **Issues**: We use [issues](https://help.github.com/articles/about-issues/) in addition to pull requests to assign work and plan new features.
- **Projects**: [Projects](https://help.github.com/articles/about-project-boards/) help us organize issues and pull requests. An issue can be part of multiple projects.

### GPG

- We use [Gnu Privacy Guard](https://www.gnupg.org/) (GPG) to encrypt and share passwords and other sensitive info.
- Install `gpg` with Homebrew or another package manager: `brew install gpg`.
- Run `gpg --gen-key` from the command line to generate a key.
  - View keys with `gpg --list-secret-keys`.
  - Transfer keys from one computer to another over ssh. See [Stack Overflow](https://stackoverflow.com/questions/3174537/how-to-transfer-pgp-privatepublic-key-to-another-computer#3176373).
- Run `gpg --send-keys <keynumber>` to share the public key with the GPG database. It takes about 10 minutes for the key to show up in the GPG database. The public key can also be directly exported with `gpg --armor --export > public-key.gpg`.
- Locate another user's key with `gpg --search-keys <email>`.
- Encrypt a message with `echo "Hi Jane" | gpg --encrypt --armor --recipient "<email>"`. Optionally, save the encrypted message in a .gpg file.
- Send the message over email, Slack, or any other medium.
- Decrypt the message with `gpg --decrypt`
  - If copying the text directly, include it in quotes: `echo "BIG LONG GPG STRING" | gpg --decrypt`.
  - If reading a file, include the filename when decrypting: `gpg --decrypt gcloud.gpg`.
  - Decrypted output can be autosaved to a new file: `gpg --decrypt gcloud.gpg --output file.txt`.
- GPG can also be used with GitHub. See the [GitHub GPG instructions](https://help.github.com/articles/signing-commits-with-gpg/).
  - Configure Git to use your key for local commits with `git config --global user.signingkey <keynumber>`
  - Export your GPG public key with `gpg --armor --export <keynumber>`
  - Copy the GPG public key and paste into GitHub in the settings menu.

---

## Code style

### Python

- Please format Python code for Python 3 and [PEP 8](http://pep8.org/).
- We amend PEP 8 to permit a line length of 100 characters.
- Docstrings <100 characters should be on one line.
- Shebangs are only needed when calling the module by name.

### JavaScript

- [JavaScript Semistandard Style](https://github.com/Flet/semistandard)
  - Based on [JavaScript Standard Style](https://standardjs.com/), but retaining semicolons.
  - Two space indentations.

### Markdown

- Please follow the suggestions for standardized Markdown formatting provided by [markdownlint](https://github.com/DavidAnson/markdownlint) and [Markdown Style Guide](http://www.cirosantilli.com/markdown-style-guide/).
- Further suggestions:
  - Two space indentations.
  - Dashes for unordered lists.
  - The first line of the file should be the title as H1, like `# Title`.
  - Include `## Table of Contents`, and use Markdown All in One in vscode to insert the ToC.

### Other languages

- Two space indentations.

## Text editor setup

### vscode

#### Packages

- [JavaScript Standard Style](https://marketplace.visualstudio.com/items/chenxsan.vscode-standardjs)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [Python](https://code.visualstudio.com/docs/languages/python)
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) can be used with GitHub Gists to sync settings.

#### Folder settings

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  // JavaScript
  "eslint.enable": false,
  "standard.enable": true,
  "standard.autoFixOnSave": true,
  // Python
  "[python]": {
    "editor.formatOnPaste": false,
    "editor.formatOnSave": true,
    "editor.rulers": [100],
    "editor.tabSize": 4
  },
  "python.formatting.autopep8Args": [
    "--max-line-length",
    "100"
  ],
  "python.formatting.provider": "autopep8",
  "python.linting.pylintEnabled": false,
  "python.pythonPath": "${workspaceFolder}/venv/bin/python",
  "python.unitTest.unittestEnabled": true,
  "python.unitTest.autoTestDiscoverOnSaveEnabled": true,
  "python.unitTest.unittestArgs": [
    "-vv",
    "-s",
    "tests",
    "-p",
    "*test*.py"
  ]
}
```