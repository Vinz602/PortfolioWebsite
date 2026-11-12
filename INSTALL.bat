@echo off
echo ========================================
echo  ML Portfolio - Installation Script
echo ========================================
echo.
echo This will:
echo 1. Delete old node_modules folder
echo 2. Delete package-lock.json
echo 3. Install fresh dependencies
echo.
pause

echo.
echo Step 1: Cleaning old files...
if exist node_modules (
    echo Deleting node_modules...
    rmdir /s /q node_modules
    echo Done!
) else (
    echo node_modules not found, skipping...
)

if exist package-lock.json (
    echo Deleting package-lock.json...
    del /f /q package-lock.json
    echo Done!
) else (
    echo package-lock.json not found, skipping...
)

echo.
echo Step 2: Installing dependencies...
echo This may take a few minutes...
echo.
call npm install

echo.
echo ========================================
echo  Installation Complete!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Or double-click START_SERVER.bat
echo.
pause
