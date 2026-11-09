@echo off
title Sahithi Chukka Portfolio Dev Server
cd /d "%~dp0"
echo ============================================================
echo   Starting Sahithi Chukka Portfolio (React + Vite)
echo ============================================================
echo.
echo Starting local Vite server at http://localhost:5173 ...
echo.
start "" "http://localhost:5173"
npm run dev
pause

