FROM mcr.microsoft.com/dotnet/core/sdk:3.0
WORKDIR /app/src/Framething.Web

# Required inside Docker, otherwise file-change events may not trigger
ENV DOTNET_USE_POLLING_FILE_WATCHER 1

# This will build and launch the server in a loop, restarting whenever a *.cs file changes
ENTRYPOINT dotnet watch run
