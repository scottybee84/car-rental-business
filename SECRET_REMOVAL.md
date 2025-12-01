# Removing Exposed API Key from Git History

## ⚠️ CRITICAL: Your OpenAI API Key Was Exposed

Your API key was committed to git history in commit `b3b1ec0`. You need to:

## Step 1: Revoke the Exposed API Key (DO THIS FIRST!)

1. Go to https://platform.openai.com/api-keys
2. Find and delete the exposed API key (it was in commit b3b1ec0)
3. **Delete/Revoke it immediately**
4. Create a new API key
5. Add the new key to GitHub Secrets (Settings → Secrets → Actions → OPENAI_API_KEY)

## Step 2: Remove from Git History

### Option A: Using git filter-repo (Recommended)

```bash
# Install git-filter-repo if needed
# brew install git-filter-repo  # macOS
# or: pip install git-filter-repo

# Remove the secret from all history
git filter-repo --path BLOG_SETUP.md --invert-paths
git filter-repo --path BLOG_SETUP.md

# Or use BFG Repo-Cleaner (easier)
# Download from: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --replace-text passwords.txt
```

### Option B: Simple Approach (if repo is not shared)

```bash
# Create a new commit that removes the secret
# The current file is already fixed, so just commit it
git add BLOG_SETUP.md
git commit -m "Remove exposed API key from documentation"

# Force push (WARNING: Only if you're the only one using this repo!)
git push --force
```

### Option C: Manual History Rewrite (Advanced)

```bash
# Interactive rebase to edit the commit
git rebase -i b3b1ec0^
# Mark the commit as 'edit'
# Remove the API key from the file
git add BLOG_SETUP.md
git commit --amend
git rebase --continue
git push --force
```

## Step 3: Verify

```bash
# Check that the secret is no longer in history
git log --all --full-history -p -- BLOG_SETUP.md | grep "sk-proj"
# Should return nothing
```

## Step 4: Update GitHub Secrets

1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Update `OPENAI_API_KEY` with your new key
3. Delete the old secret value

## Prevention

- ✅ Never commit API keys to git
- ✅ Use GitHub Secrets for all sensitive data
- ✅ Add `.env` and `*.key` to `.gitignore`
- ✅ Use environment variables locally
- ✅ Review files before committing

## Current Status

✅ The current `BLOG_SETUP.md` file is clean (no API key)
❌ The API key still exists in git history (commit b3b1ec0)
⚠️ You must revoke the exposed key and create a new one

