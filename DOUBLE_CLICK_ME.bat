@echo off
color 0A
echo.
echo  ========================================
echo   ML PORTFOLIO WEBSITE - SETUP
echo  ========================================
echo.
echo  Hi Vincent! Welcome to your ML Portfolio setup.
echo.
echo  I've fixed the dependency issues for you.
echo  Now let's get your website running!
echo.
echo  ========================================
echo.
pause

echo.
echo  Step 1/3: Cleaning old files...
echo  --------------------------------
if exist node_modules (
    echo  [*] Removing node_modules...
    rmdir /s /q node_modules
    echo  [OK] Removed!
) else (
    echo  [OK] Already clean!
)

if exist package-lock.json (
    echo  [*] Removing package-lock.json...
    del /f /q package-lock.json
    echo  [OK] Removed!
)

if exist .next (
    echo  [*] Removing .next cache...
    rmdir /s /q .next
    echo  [OK] Removed!
)

echo.
echo  Step 2/3: Installing dependencies...
echo  --------------------------------
echo  This will take 1-2 minutes...
echo.
call npm install

if errorlevel 1 (
    echo.
    echo  [ERROR] Installation failed!
    echo  Try running manually: npm install --legacy-peer-deps
    echo.
    pause
    exit
)

echo.
echo  [OK] Installation complete!
echo.
echo  Step 3/3: Starting your website...
echo  --------------------------------
echo.
echo  Your website will open at: http://localhost:3000
echo.
echo  Press Ctrl+C to stop the server when done.
echo.
echo  ========================================
echo.
timeout /t 3 >nul

start http://localhost:3000

call npm run dev

pause
