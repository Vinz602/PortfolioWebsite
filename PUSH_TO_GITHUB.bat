@echo off
echo =========================================
echo Pushing changes to GitHub
echo =========================================
echo.

echo Step 1: Checking git status...
call git status
echo.

echo Step 2: Adding all changes...
call git add .
echo.

echo Step 3: Committing changes...
call git commit -m "Fix ESLint errors for Vercel deployment"
echo.

echo Step 4: Pushing to GitHub...
echo NOTE: If you haven't set up the remote yet, you'll need to:
echo   1. Create a repo on GitHub (github.com/Vinz602/ml-portfolio)
echo   2. Run: git remote add origin https://github.com/Vinz602/ml-portfolio.git
echo   3. Run this script again
echo.

call git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Push failed. If this is your first push:
    echo 1. Go to github.com and create a new repository
    echo 2. Run: git remote add origin https://github.com/Vinz602/YOUR_REPO_NAME.git
    echo 3. Run: git push -u origin main
)

echo.
echo =========================================
echo Next: Deploy to Vercel
echo =========================================
echo 1. Go to vercel.com and sign in
echo 2. Click "Add New Project"
echo 3. Import your GitHub repository
echo 4. Vercel will auto-detect Next.js settings
echo 5. Click Deploy!
echo.
pause
