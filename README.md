# Elena's Elixirs

**An early prototype exploring how AI can design custom craft cocktails.**

🔮 Live at **[elenaselixirs.com](https://elenaselixirs.com)**

You tell it what you're in the mood for — flavors, spirits, how fancy you want to get, and a free-form description in your own words — and it returns a complete, original cocktail recipe built around your answers. Recipes are generated fresh each time, so no two elixirs are quite alike.

The app leans into a mystical, witchy mixologist persona: alongside the recipe you get a tarot card reading, a moon phase, and an "energy level" for your drink. It's meant to be playful.

> ⚗️ **Status: early prototype.** This is a personal project I built to experiment with AI-generated recipes. It works end to end and is deployed, but it's rough around the edges — no user accounts, no server-side persistence, and the test suite is still the Angular CLI boilerplate. See [Known limitations](#known-limitations) for the honest list. Treat it as a sketch, not a product.

## What it does

1. **Pick your inputs** on the home page:
   - **Flavors** — tropical, fruity, crisp, herbal, earthy, spicy, chocolaty, basic
   - **Spirits** — champagne, whiskey, gin, tequila, rum, vodka, sake
   - **Fanciness** — a 1–10 slider, from simple and approachable up to rare premium ingredients
   - **Mood** — sets the vibe of the drink and its presentation
   - **Description** — free text, in your own words
2. **The request goes to a Lambda** that assembles a prompt and calls OpenAI's `gpt-4.1-mini`, asking for a structured JSON recipe.
3. **You get a full recipe back** — ingredients with real measurements, step-by-step instructions with technique, glassware, garnish, difficulty, prep time, and flavor profile, plus the mystical extras.

## How it's built

| Layer | Stack |
| --- | --- |
| Frontend | Angular 18 (standalone components) with SSR via `@angular/ssr`, Angular Material, SCSS |
| Backend | AWS Lambda running Express through `aws-serverless-express`, fronted by API Gateway |
| AI | OpenAI `gpt-4.1-mini`, prompted to return strict JSON |
| Infra & hosting | AWS Amplify (`amplify/` holds the CLI-managed backend definitions) |

The frontend is a two-page app — a builder at `/` and the result at `/recipe` — talking to a single `POST /cocktail-generator` endpoint. Generated cocktails are saved to `localStorage`, which is what carries the recipe between the two pages.

## Running it locally

```bash
npm install
npm start          # dev server at http://localhost:4200
```

Other useful scripts:

```bash
npm run build      # production build to dist/elenas-elixirs
npm test           # Karma + Jasmine
npm run watch      # rebuild on change (development configuration)
```

The dev server talks to the **deployed** API Gateway endpoint hardcoded in [`src/app/services/cocktail.service.ts`](src/app/services/cocktail.service.ts), so the frontend runs on its own without any AWS setup.

### Running the backend

The Lambda lives in [`amplify/backend/function/cocktailGenerator/src/`](amplify/backend/function/cocktailGenerator/src/) and needs an OpenAI API key:

```bash
cd amplify/backend/function/cocktailGenerator/src
npm install
```

Set `OPENAI_API_KEY` in the function's environment (`amplify update function` → environment variables, or a local `.env` for testing — both are gitignored). Deploy with `amplify push`.

## Known limitations

Being upfront about the rough edges, since this is a prototype:

- **`previewGenerator` is a near-duplicate** of `cocktailGenerator`, left over from an experiment. Only `cocktailGenerator` is wired up to the frontend.
- **The API endpoint is hardcoded** in `cocktail.service.ts` rather than living in Angular environment files.
- **CORS is wide open** (`Access-Control-Allow-Origin: *`) and the endpoint is unauthenticated and unthrottled — fine for a toy, not for anything real.
- **The model response is `JSON.parse`d directly** with no schema validation, so a malformed generation surfaces as a 500.
- **Recipe history and favorites are written to `localStorage`** but nothing in the UI surfaces them yet.
- **Spec files are the Angular CLI defaults** and don't meaningfully test anything.
- **`Cocktail.estimatedAlcoholContent`** guesses strength by substring-matching ingredient names — approximate at best.

## Repository layout

```
src/                                  Angular app
  app/components/                     builder UI (flavor grid, sliders, selectors)
  app/pages/                          home + recipe pages
  app/services/cocktail.service.ts    API client
  app/models/cocktail.model.ts        Cocktail model
amplify/backend/function/             Lambda functions (Express + OpenAI)
amplify.yml                           Amplify build pipeline
server.ts                             SSR entry point
```

---

Built by [Elena Filatova](https://github.com/filatova-elena). 🍹✨
