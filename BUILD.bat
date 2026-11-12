@echo off
echo Building the portfolio website...
echo.
call npm run build
echo.
if %ERRORLEVEL% EQU 0 (
    echo Build successful!
) else (
    echo Build failed. Check the errors above.
)
echo.
pause
