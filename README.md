# Receptappen

Receptappen är en webbapplikation där användaren kan samla och hantera sina recept.

Frontend är byggd med React och kommunicerar med ett separat ASP.NET Core Web API.

## Funktioner

- Visa sparade recept
- Lägga till nya recept
- Redigera befintliga recept
- Ta bort recept
- Ladda upp en bild till ett recept
- Visa uppladdade bilder
- Visa felmeddelande om kommunikationen med API:et misslyckas

## Starta frontend

### Förutsättningar

För att köra projektet behöver Node.js och npm finnas installerat.

### Installation

Klona repot och öppna projektmappen i en terminal.

Installera projektets dependencies:

### bash

npm install

Starta utvecklingsservern:

npm run dev

Frontend startar på: http://localhost:5173

## Starta backend

Backend är byggd med ASP.NET Core Web API.

### Förutsättningar

För att köra backend behöver .NET SDK finnas installerat.

### Installation

Klona backend-repot från GitHub och öppna projektmappen i en terminal.

Starta API:t:

```bash
dotnet run
```

API:t startar på http://localhost:5008
