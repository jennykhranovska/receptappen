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
- Söka efter recept, råvaror och kategorier

## Starta frontend

### Förutsättningar

För att köra projektet behöver Node.js och npm finnas installerat.

### Installation

Klona repot och öppna projektmappen i en terminal.

Installera projektets dependencies:

```bash
npm install
```

Starta utvecklingsservern:

```bash
npm run dev
```

Frontend startar på: `http://localhost:5173`

## Starta backend

Backend är byggd med ASP.NET Core Web API.

Backend-repo: [jennykhranovska/receptappen-api](https://github.com/jennykhranovska/receptappen-api)

### Förutsättningar

För att köra backend behöver .NET SDK finnas installerat.

### Installation

Klona backend-repot från GitHub och öppna projektmappen i en terminal.

Starta API:t:

```bash
dotnet run
```

API:t startar på `http://localhost:5008`.

Låt backend vara igång samtidigt som frontend används.

## Tekniska val

Jag har delat upp frontend i flera React-komponenter för att göra koden lättare att läsa och underhålla. Exempelvis ligger formuläret i RecipeForm och visningen av ett receptkort i RecipeCard.

API-adressen ligger i en separat api.js-fil eftersom flera komponenter använder samma adress. På så sätt behöver adressen bara ändras på ett ställe.

Jag använder React Router för att kunna navigera mellan receptlistan, detaljsidan, formuläret för nya recept och sidan för redigering utan att ladda om hela webbapplikationen.
