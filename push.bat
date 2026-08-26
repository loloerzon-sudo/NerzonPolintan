@echo off
title Push to GitHub - NerzonPolintan
echo ===================================================
echo   Pushing Portfolio to GitHub (loloerzon-sudo/NerzonPolintan)
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging all updated files...
git add .

echo [2/3] Creating commit...
git commit -m "feat: upgrade portfolio to React + Vite + Minimal Cyber Bento Hub with recent projects"

echo [3/3] Pushing to main branch...
git push -u origin main

if errorlevel 1 (
    echo.
    echo [NOTE] If rejected due to remote history differences, attempting force push...
    git push -u origin main --force
)

if errorlevel 1 (
    echo.
    echo [ERROR] Push failed. Please check your GitHub credentials or internet connection.
    pause
    exit /b %errorlevel%
)

echo.
echo ===================================================
echo [SUCCESS] Successfully pushed to GitHub!
echo https://github.com/loloerzon-sudo/NerzonPolintan
echo ===================================================
echo.
pause
