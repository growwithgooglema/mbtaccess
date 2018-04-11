# Contributing to Grow with Google Massachusetts

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Instructions](#instructions)
  - [Suggest a project](#suggest-a-project)
  - [Get started with Git and GitHub](#get-started-with-git-and-github)
  - [Fork, clone, and branch](#fork-clone-and-branch)
  - [Commit](#commit)
  - [Push](#push)
  - [Submit pull request](#submit-pull-request)
  - [GitHub collaboration features](#github-collaboration-features)
- [Code style](#code-style)
  - [Markdown](#markdown)
  - [Python](#python)
  - [JavaScript](#javascript)
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

### Fork, clone, and branch

- Fork vs. clone: A **clone** is a copy of a repository on your computer. A **[fork](https://help.github.com/articles/fork-a-repo/)** duplicates the project into the user's GitHub account, and still maintains connection to the original master. Forks can also be cloned. **If you are not a repository owner, you will not be able to push to the original repository.** Fork the repository on GitHub instead of directly cloning. Changes to forks can be merged into the `upstream master` with pull requests.
- Clone the repository from the GitHub fork to your computer.
  - [GitHub Desktop can be used to clone](https://help.github.com/desktop/guides/getting-started-with-github-desktop/).
  - If cloning from the command line:

    ```bash
    cd <PATH-WHERE-YOU-WANT-THE-REPO>
    git clone git@github.com:growwithgooglema/projects.git
    ```

- Create a branch to isolate changes from the `master` branch.
  - Use a clear name for your branch. When submitting a pull request, the pull request name is auto-populated from the branch name.
  - The branch name `dev` is commonly used.
  - Again, GitHub Desktop can be used for this.
  - Command line option:

    ```bash
    git checkout -b myspecialproject
    ```

  - The `checkout` command creates a branch and switches to the new branch.
  - The project can be further branched, for example onto a feature branch.

### Commit

- After saving files, changes need to be committed to the Git repository.
  - GitHub Desktop provides a user interface to make this easy.
  - Command line commits:

    ```bash
    git add --all
    git commit -m "commit message"
    ```

#### Best practices for commits

- **Make meaningful, cohesive, focused commits.** Commit when an objective has been completed, or before a major change is made. Break changes up into topics so the maintainer can easily accept or reject changes from a pull request.
- **Include a commit message, with an imperative title.** See [How to make a Git commit message](https://chris.beams.io/posts/git-commit/).

### Push

- **Please push to `dev` or another topic branch. Please do not push directly to `master`.** It is best to reserve the `master` branch for just one cohesive version of the app that always works.
- Changes to forks can be merged into the `upstream master` with pull requests.

### Submit pull request

- If you are not a repository owner, you will need to submit a pull request from a fork to merge changes.
- A pull request asks the owner of the master repository to merge changes from the requester's branch or fork to the master repository. See [About pull requests on GitHub](https://help.github.com/articles/about-pull-requests/).
- Click "New pull request" on the master repository's GitHub page.
- If you forked the repository, click "Compare across forks." The base fork is the location in the master repository where the changes will go. The head fork is your fork where the changes are located.

#### Best practices for pull requests

- **Submit pull requests for review by other team members.** Even if you have access to the master, making a pull request for a merge from `dev` to `master`, and requesting review, helps keep team members accountable and helps prevent merge conflicts and breaking of functionality.
- **Create pull requests from topic branches.** Creating branches like `dev` and feature or topic branches, and submitting pull requests from a branch, helps keep the master repository organized.
- **Provide a descriptive pull request message.**
  - List changes with bullet points.
  - Reference other pull requests that may be superseded by this request.

### GitHub collaboration features

- **Teams**: We use [teams](https://help.github.com/articles/about-teams/)  for specific  initiatives within the organization. For example, the [gwg-mbta team](https://github.com/orgs/growwithgooglema/teams/gwg-mbta) is part of the *growwithgooglema organization*. We can add the organization's repos to it, such as the *gwg-mbta repo*. The team provides more features, like **chat within GitHub.**
- **Issues**: We use [issues](https://help.github.com/articles/about-issues/) to divide up work and plan out new features. Issues can be tagged to help us organize them.
- **Projects**: [Projects](https://help.github.com/articles/about-project-boards/) help us organize the issues by topic and status. An issue can be part of multiple projects.

---

## Code style

### Markdown

- Please follow the suggestions for standardized Markdown formatting provided by [markdownlint](https://github.com/DavidAnson/markdownlint) and [Markdown Style Guide](http://www.cirosantilli.com/markdown-style-guide/).
- Further suggestions:
  - Two space indentations.
  - Dashes for unordered lists.
  - The first line of the file should be the title as H1, like `# Title`.
  - Include `## Table of Contents`, and use Markdown All in One in vscode to insert the ToC.

### Python

- Please format Python code for Python 3 and [PEP 8](http://pep8.org/).
- We amend PEP 8 to permit a line length of 100 characters.

### JavaScript

- [JavaScript Semistandard Style](https://github.com/Flet/semistandard)
  - Based on [JavaScript Standard Style](https://standardjs.com/), but retaining semicolons.
  - Two space indentations.

### Other languages

- Two space indentations.

## Text editor setup

### vscode

#### Packages

- [JavaScript Standard Style](https://marketplace.visualstudio.com/items/chenxsan.vscode-standardjs)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [Python](https://code.visualstudio.com/docs/languages/python)

#### Folder settings

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "eslint.enable": false,
  "standard.enable": true,
  "standard.autoFixOnSave": true,
  "standard.semistandard": true,
  "python.formatting.provider": "autopep8",
  "python.formatting.autopep8Args": [
    "--max-line-length",
    "100"
  ],
}
```