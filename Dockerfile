FROM mcr.microsoft.com/dotnet/core/sdk:2.2-bionic AS build

RUN apt-get update && apt-get install -y build-essential nodejs npm

WORKDIR /app

# Restore npm packages now so that this step is cached
COPY src/OpenWoW.Web/package*.json /app/openwow.io/src/OpenWoW.Web/
WORKDIR /app/src/Framething.Web
RUN npm install

WORKDIR /app
COPY . .
#RUN dotnet test

WORKDIR /app/src/Framething.Web
RUN npm run build-prod
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/core/aspnet:2.2-alpine AS runtime
WORKDIR /app
COPY --from=build /app/src/Framething.Web/out ./

ENV ASPNETCORE_URLS "http://0:5000"
EXPOSE 5000
ENTRYPOINT ["dotnet", "Framething.Web.dll"]
