@echo off
title Nerzon Portfolio Production Build
echo ===================================================
echo   Building Nerzon Portfolio for Production
echo ===================================================
echo.

cd /d "%~dp0react-app"

call npm run build

if errorlevel 1 (
    echo.
    echo [ERROR] Build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo ===================================================
echo [SUCCESS] Production build complete!
echo Output directory: react-app\dist
echo ===================================================
echo.
pause
