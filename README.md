# FindMe Movies

![CI][ci-url]
[![MIT License][license-shield]][license-url]
![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=find-me-movies)

A cinematic movie discovery app built with React and powered by the [TMDB API](https://www.themoviedb.org/documentation/api). Browse trending films, explore genres, watch trailers, and dive into full cast and crew details — all wrapped in a sleek dark UI with a gold accent design system.

[**Live site →**](https://find-me-movies.vercel.app/)

---

## Features

### Discovery

- **Hero carousel** — auto-playing crossfade slideshow of featured movies with backdrop imagery, ratings, and quick actions
- **Trending** — day/week toggle to see what's hot right now
- **Popular & Top Rated** — curated grids updated in real time from TMDB
- **Upcoming** — movies releasing soon
- **In Theaters** — what's currently showing near you
- **Browse by Genre** — colour-coded genre cards leading to filtered, sortable movie lists with infinite scroll
- **Recently Viewed** — locally persisted history of movies you've visited (no login required)

![alt text](</docs/assets/Screenshot 2026-03-21 at 14.35.32.png>)

![alt text](</docs/assets/Screenshot 2026-03-21 at 14.36.04.png>)

### Movie Detail

- Full backdrop hero with poster, rating, runtime, language, and release info
- **Watch Trailer** — plays the official YouTube trailer in an in-app dialog
- **Where to Watch** — streaming, rental, and purchase providers powered by JustWatch data
- Cast & crew cards with clickable actor/director profiles
- User reviews with expandable content
- Keywords and similar movie recommendations
- **Share** button using the Web Share API with clipboard fallback

![alt text](</docs/assets/Screenshot 2026-03-21 at 14.43.10.png>)

![alt text](</docs/assets/Screenshot 2026-03-21 at 14.43.40.png>)

### Person Pages

- Actor/director profile with photo, biography (expandable), and personal info (born, died, place of birth, also known as, popularity)
- Full filmography grid with character or job labels, sorted by popularity
- Direct link to IMDb and personal homepage where available

![alt text](</docs/assets/Screenshot 2026-03-21 at 15.33.40.png>)

### Search

- Live search with poster thumbnails in the dropdown results
- `⌘K` / `Ctrl+K` keyboard shortcut to focus the search field from anywhere on the page

### Navigation

- Animated active indicator on the top nav bar (desktop)
- Slide-out drawer for mobile with all routes
- Fixed bottom navigation bar on mobile (Home, Popular, Search, Trending, Genres)

![alt text](</docs/assets/Screenshot 2026-03-21 at 14.44.26.png>)

![alt text](<Screenshot 2026-03-21 at 14.44.08.png>)

---

## Tech Stack

| Layer             | Library / Tool                     |
| ----------------- | ---------------------------------- |
| UI framework      | React 18                           |
| Component library | MUI v5 (`@mui/material`)           |
| Routing           | React Router v5                    |
| Animations        | Framer Motion                      |
| Carousel          | Swiper v8                          |
| HTTP client       | Axios                              |
| Build tool        | Vite 5                             |
| Linting           | ESLint + eslint-plugin-react       |
| Package manager   | pnpm                               |
| Deployment        | Vercel (with serverless API proxy) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm — `npm install -g pnpm`
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
git clone https://github.com/gayankanishka/find-me-movies-react.git
cd find-me-movies-react
pnpm install
```

### Environment variables

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

> In production the key is kept server-side via a Vercel serverless proxy (`api/[...path].js`). For local development it is read from `VITE_TMDB_API_KEY`.

### Run locally

```bash
pnpm start
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
pnpm build
pnpm preview   # preview the built output locally
```

---

## Deployment

The app is deployed on [Vercel](https://vercel.com/). To deploy your own instance:

1. Import the repository in Vercel
2. Add the environment variable `TMDB_API_KEY` in the Vercel project settings
3. Deploy — Vercel automatically handles the `api/` directory as serverless functions

---

## Project Structure

```
src/
├── components/          # Shared layout components (Header, Footer, BottomNav, Layout)
├── modules/
│   └── movies/
│       └── components/  # Movie-specific components (MovieCard, MovieCarousel, MovieSearch, …)
├── pages/               # Route-level page components
├── services/            # API service layer (movie-db.service, navigation.service)
├── utils/               # Helpers (recently-viewed.utils)
├── theme.js             # MUI dark theme with gold accent design tokens
├── routeConfig.js       # Lazy-loaded route definitions
└── App.jsx              # Root with Router, ThemeProvider, AnimatePresence

api/
└── [...path].js         # Vercel serverless proxy for TMDB API
```

---

## Design System

| Token          | Value                         |
| -------------- | ----------------------------- |
| Primary accent | `#e8b84b` — cinematic gold    |
| Background     | `#0a0a0a`                     |
| Surface        | `#141414`                     |
| Muted text     | `#999999`                     |
| Glass morphism | `backdrop-filter: blur(20px)` |

---

## License

Licensed under the [MIT](LICENSE) license.

Movie data provided by [TMDB](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.

[ci-url]: https://github.com/gayankanishka/find-me-movies/workflows/CI/badge.svg
[license-shield]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: https://github.com/gayankanishka/find-me-movies/blob/master/LICENSE
