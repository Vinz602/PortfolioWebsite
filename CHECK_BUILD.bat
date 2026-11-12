@echo off
echo =========================================
echo Checking for build issues...
echo =========================================
echo.

echo Step 1: Running ESLint check...
call npm run lint
echo.

echo Step 2: Running TypeScript check...
call npx tsc --noEmit
echo.

echo Step 3: Running build...
call npm run build
echo.

if %ERRORLEVEL% EQU 0 (
    echo =========================================
    echo SUCCESS! Build completed without errors.
    echo =========================================
    echo.
    echo Your site is ready to deploy!
    echo Next steps:
    echo 1. Double-click PUSH_TO_GITHUB.bat
    echo 2. Go to vercel.com and import your GitHub repo
) else (
    echo =========================================
    echo BUILD FAILED - Check errors above
    echo =========================================
)
echo.
pause
