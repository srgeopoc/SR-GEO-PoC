# SR-GEO-PoC Tracker - GitHub Pages Deployment Instructions

This guide will help you deploy the SR-GEO-PoC Tracker to your GitHub repository for permanent hosting via GitHub Pages.

## What's Included in the Package

The `sr_geo_poc_tracker_github_pages.zip` file contains the production-ready build of the SR-GEO-PoC Tracker, specifically configured for your GitHub repository. All files are optimized and ready to be uploaded to your repository.

## Deployment Steps

### Option 1: Deploy to a Dedicated "tracker" Directory (Recommended)

This option keeps your existing repository structure intact and adds the tracker in a subdirectory.

1. **Extract the zip file** on your local computer
2. **Create a new directory** named "tracker" in your GitHub repository
3. **Upload all files** from the extracted zip to this "tracker" directory
4. **Commit and push** the changes to your repository
5. **Enable GitHub Pages** in your repository settings:
   - Go to your repository → Settings → Pages
   - Set the source to "Deploy from a branch"
   - Select the branch (usually "main" or "master")
   - Save the settings

Your tracker will be available at: `https://srgeopoc.github.io/SR-GEO-PoC/tracker/`

### Option 2: Deploy to a Dedicated Branch (gh-pages)

This option keeps the tracker separate from your main code branch.

1. **Create a new branch** named "gh-pages" in your repository
2. **Extract the zip file** on your local computer
3. **Upload all files** from the extracted zip to the root of this branch
4. **Commit and push** the changes to the gh-pages branch
5. **Enable GitHub Pages** in your repository settings:
   - Go to your repository → Settings → Pages
   - Set the source to "Deploy from a branch"
   - Select the "gh-pages" branch and "/ (root)" folder
   - Save the settings

Your tracker will be available at: `https://srgeopoc.github.io/SR-GEO-PoC/`

## Verifying Deployment

After enabling GitHub Pages, it may take a few minutes for your site to be published. You can check the status in the GitHub Pages section of your repository settings.

Once published, you can access your tracker at the URL provided in the GitHub Pages settings.

## Customizing Your Tracker

If you want to make changes to the tracker in the future:

1. Download the source code from the temporary deployment
2. Make your modifications
3. Rebuild the application with the correct homepage setting
4. Re-upload the new build files to your GitHub repository

## Troubleshooting

If your tracker doesn't appear or shows a 404 error:
- Make sure GitHub Pages is enabled in your repository settings
- Check that the files are in the correct location based on your deployment option
- Verify that the repository is public (required for GitHub Pages)
- Wait a few minutes as GitHub Pages deployment can take some time

## Need Help?

If you encounter any issues with the deployment, please reach out for assistance.
