# Markdown Task


## 1 - Getting Started

These instructions will guide you through setting up your local development environment for this project.

**1. Initialize the repository**


```bash
git init
```

**2. Create the file:**
```bash
touch Readme.md
```

## 2 - Adding and Committing Changes (Version Control Process):**

1. **Stage changes:** Use the `git add` command to add files or changes you want to track in Git's version control. For example:

    ```bash
    git add Readme.md
    ```

2. **Commit changes:** When you're ready to create a snapshot of the current project state, run `git commit` with a descriptive message. This message explains the changes you made:

    ```bash
    git commit -m "initial commit"
    ```

## 3 - Pushing Changes to a Remote Repository:**

1. **Create a new repository on GitHub::**

* Log in to your GitHub account.
* Click the "New repository" button.
* Give your repository a name (matching your local repository is recommended).
* Click "Create repository".

2. **Add the remote repository to your local repository:** 

    ```bash
    git remote add origin https://github.com/your_username/your_repository_name.git
    ```

3. **Push changes:** Once configured, use `git push` to upload your local commits to the remote repository. For example:

    ```bash
    git push -u origin main  # Pushes to the "main" branch on your remote repository
    ```
