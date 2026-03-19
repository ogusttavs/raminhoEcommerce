@echo off
setlocal
set "CHROME=C:\Program Files\Google\Chrome\Application\chrome.exe"
set "PROFILE=Profile 14"
set "LOGFILE=%~dp0shopify-browser-launch.log"

if not exist "%CHROME%" (
  echo Chrome nao encontrado em "%CHROME%"
  exit /b 1
)

echo %date% %time% ^| %~1>>"%LOGFILE%"
"%CHROME%" --profile-directory="%PROFILE%" "%~1"
