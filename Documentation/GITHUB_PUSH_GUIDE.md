# 🚀 Quick Start: Push to GitHub Safely

## Before You Push - Critical Steps

### 1️⃣ Verify No Secrets in Tracked Files

```bash
# Check what will be committed
git status

# Search for potential secrets (should find none in application.properties)
grep -r "rhm691g2HqU8EFJG" .
grep -r "CNVKeRb-TzdiUtF2qZzx6wZw8d4" .
grep -r "y4h4YZLPyCMJpyeAsgH1RPYS" .
```

If any secrets are found, they should only be in `.env` files (which are gitignored).

### 2️⃣ Verify .gitignore is Working

```bash
# These commands should show nothing (files are ignored)
git status | grep ".env"
git status | grep "application-local.properties"

# Verify .gitignore entries
cat ResumeBuilderBackend/.gitignore | grep -A 3 "Environment Variables"
cat resume-builder-frontend/.gitignore | grep -A 3 "Environment Variables"
```

### 3️⃣ Create Your Local .env Files (DO NOT COMMIT)

**Backend:**
```bash
cd ResumeBuilderBackend
cp .env.example .env
# Edit .env with your actual credentials
nano .env  # or use any editor
```

**Frontend:**
```bash
cd ../resume-builder-frontend
cp .env.example .env
# Edit .env with your backend URL
nano .env  # or use any editor
```

### 4️⃣ Clean Git History (If Secrets Were Previously Committed)

```bash
# Check if sensitive files are in git history
git log --all --full-history -- "*application.properties"

# If you find commits with secrets, you need to clean history
# WARNING: This rewrites history, coordinate with team if shared repo

# Option A: Remove specific file from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch ResumeBuilderBackend/src/main/resources/application.properties" \
  --prune-empty --tag-name-filter cat -- --all

# Option B: Use BFG Repo-Cleaner (recommended for large repos)
# Download from: https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files application.properties

# After cleaning, force push (if repo already exists)
git push origin --force --all
```

### 5️⃣ Initial Commit and Push

```bash
# Make sure you're in the root directory
cd /home/officialhari/Downloads/ResumeBuilderFinal

# Add all files
git add .

# Verify .env files are NOT staged
git status | grep ".env"
# Should show nothing or "Untracked files" (but not in staged section)

# Commit
git commit -m "Initial commit: Resume Builder with secure environment configuration"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/resume-builder.git

# Push to GitHub
git push -u origin main
```

---

## ✅ Post-Push Checklist

After pushing, verify on GitHub:

- [ ] `.env` files are NOT visible in the repository
- [ ] `.env.example` files ARE present (template for others)
- [ ] `application.properties` has `${VARIABLE}` syntax, no hardcoded secrets
- [ ] `.gitignore` files are properly configured
- [ ] `ENVIRONMENT_SETUP.md` is visible for contributors

---

## 🔄 For Team Members Cloning the Repo

```bash
# Clone the repository
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder

# Follow the environment setup guide
cat ENVIRONMENT_SETUP.md

# Create .env files
cd ResumeBuilderBackend
cp .env.example .env
# Edit with your credentials

cd ../resume-builder-frontend
cp .env.example .env
# Edit with your backend URL

# Install and run
# See ENVIRONMENT_SETUP.md for detailed instructions
```

---

## 🆘 Emergency: Secrets Exposed on GitHub

If you accidentally pushed secrets:

1. **Immediately invalidate compromised credentials:**
   - Regenerate JWT secret
   - Revoke and create new API keys (Cloudinary, Razorpay, Brevo)
   - Change database passwords

2. **Remove secrets from GitHub:**
   ```bash
   # Clean history (see step 4 above)
   # Force push cleaned history
   git push origin --force --all
   ```

3. **Verify on GitHub:**
   - Check commit history for secrets
   - Use GitHub's secret scanning feature

---

## 📚 Additional Resources

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Git Secrets Tool](https://github.com/awslabs/git-secrets)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
