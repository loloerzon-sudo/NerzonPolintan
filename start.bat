@echo off
title Nerzon Portfolio Dev Server
echo ===================================================
echo   Starting Nerzon Portfolio (React + Vite + Motion)
echo ===================================================
echo.

cd /d "%~dp0react-app"

if not exist "node_modules" (
    echo [INFO] Installing project dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed.
        pause
        exit /b %errorlevel%
    )
)

echo [INFO] Launching Vite development server...
echo [INFO] Opening browser at http://localhost:5173
echo.

call npm run dev -- --open

if errorlevel 1 (
    echo.
    echo [ERROR] Server exited with an error.
    pause
)
