---
title: "Git Good: Best Practices for Branch Naming and Commit Messages"
layout: layouts/note.njk
tags:
  - git
  - github
  - beginner
date: 2025-01-04T21:29:00.000Z
---
Hello devs, I'm going to share a few best practices for using Git more effectively. **git?** Yes, the git you're already familiar with. The code buddy, your guardian angel that ensures your coding adventure runs smoothly, allows developers to collaborate effortlessly on projects.

Are you the one who creates branches and then forgets why they exist? The one always have to look for *file changes* to comprehend a commit? Here are some tips for you.

## Why should I follow the standards?

- **Clarity and Understanding**

- **Collaboration and Teamwork**

- **Ease of Navigation and Maintenance**

- **Documentation and Knowledge Transfer**

- **Project Quality**

- **Automated Changelogs**

- **Optimizing CI/CD**

## Before You Read 

- Each seb-section under **Branch Naming Conventions** and **Commit Message Conventions** are ordered as **basic**, **intermediate** and **advanced rules** respectively.

- You can follow upto any level of rules based on use case and relevance, anyways following conventions upto **intermediate rules** level is recommended.

- Following contents are adapted and organised from resources provided in the reference section.

------

## Branch Naming Conventions

### Basics

1. **Descriptive Names**: A well-named branch gives immediate context for its purpose. Instead of generic names, choose clarity.
For example: `feature/login`, `bugfix/navbar-overflow`

2. **Use Hyphens**: Use hyphens to seperate words (or kebab case) in branch name,  this ensures readability.
For instance, `bugfix/fix-login-issue` is more readable than `bugfix/fixLoginIssue` or `bugfix/fix_login_issue`.

3. **Alphanumeric Lowercase Characters**: Use only alphanumeric lowercase characters (a-z, 0–9) and hyphens. Avoid punctuation, spaces, underscores, or any special characters whenever possible.

4. **Avoid Unneccessary Hyphens**: Avoid unneccessary hyphens, like subsequent or trailing hyphens.
For instance, `feat/new--login-` is a bad practice.

5. **Short and Effective**: Keep branch names simple. While descriptive, they should also be concise enough to convey the goal at a glance.

### Prefix or Type

- Prefixing branches helps to organize them according to their purpose. This not only improves clarity, but also helps to automate workflows.

- Some of the common branch type prefixes and their usage cases include:

  - `feature/`: For developing new features,

  - `bugfix/`: To fix bugs in the code. Often created associated to an issue.

  - `hotfix/`: To fix critical bugs in the production.

  - `release/`: To prepare a new release, typically used to do tasks such as last touches and revisions.

  - `docs/`: Used to write, modify or correct documentation.

- For example, `feature/new-feature` or `release/version-1.0.0`.

### Including Ticket Numbers

If your project employs an issue tracking system such as Jira, or if it revises based on github issues or another comparable tool. Including the token for the issue in the branch name would make it simple to track. Example: `feature/PROJ-123-footer-links`

------

## Commit Message Conventions

- Final format for a commit message:

  ```md
  <type>([optional scope]): <description>  # subject

  [optional body]

  [optional footer(s)]
  ```

### Message Subject

- **Imperative Mood**: Create commit messages in the imperative mood. Start with a verb to indicate what the commit does.
For example: Use `fix: Fix bug #67` than `fix: Fixed bug #67`

- **Short and Summarized**: Try to fit the subject line inside 50 characters to ensure that messages are readable in various Git tools, such as when using `git log --oneline`. Avoid trailing period and unneccessary words/symbols.

- **Capitalize the description**: This is as easy as it sounds. Start subject line with a capital letter.

### Type and Message Body

- A `type` preifx in the subject line can be used to represent type of the changes included in the commit. Some of the commonly used types are:
  
  - `feat:`: To summarize a new feature in the codebase.

  - `fix:`: To address a fix to the codebase.

  - `build:`, `chore:`, `ci:`, `style:`, `refactor:` are some other examples.

- A `scope` can be added to a commit's type to offer additional contextual information, and it is enclosed in parenthesis, for example, `feat(parser): Add the ability to parse arrays`

- A `body` can be added to the message to include detailed explanations in the commit.

- Body is added by leaving a blank line after the subject line.

- Wrap the body at 72 characters, ie. Use multple lines of body, where each line does not exceed 72 characters.

## Footer and Extended Message Body

- A `footer` is use to convey addiotional information regarding the commit, such as reviewed by, approved by, etc. Example:

 - `Signed-off-by: Alice <alice@example.com>`

- **Breaking Change**:  A `BREAKING CHANGE` refers to rather important major changes in the codebase. It can represented by adding a `!` after type/scope and/or by adding it with `body` or as `footer`

  ```md
  chore!: drop support for Node 6

  BREAKING CHANGE: use JavaScript features not available in Node 6.
  ```

- **Multi-paragraph Body**: In some circumstances, numerous paragraphs help to explain the goal of the commit in greater detail. Example: To describe what, why, and how, about a commit changes.

#### Examples

Various use case examples of commit messages may be found [here](https://www.conventionalcommits.org/en/v1.0.0/#examples).

## Conclusion

Adhering to Git conventions is similar to speaking a common language. However, it is obvious that these standards or conventions are not enforced by any system; hence, the adaptation and extension of use of these standards is entirely up to us.

Embracing these habits will surely improve your Git experience and encourage a collaborative coding environment. Even though we can't follow these in a single blow, gradually adapting to them will undoubtedly make a difference. 

I'm planning to write about **Implementing Git Conventions with Husky**, show your support with reactions and comments. Happy coding!

## References

- [Naming conventions for Git Branches — a Cheatsheet, by Abhay Amin](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534)

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0)

- [Git conventions](https://se-education.org/guides/conventions/git.html)

- [How to Write a Git Commit Message by CBEAMS](https://cbea.ms/git-commit)

- [Git trailers](https://git-scm.com/docs/git-interpret-trailers)
