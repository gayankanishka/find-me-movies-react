# Find me Movies

![CI][ci-url]
[![MIT License][license-shield]][license-url]
![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=find-me-movies)

The `Find me Movies` is a React based web application built on top of the The Movie DB API. The application will easily help you to find Trending and Upcoming Movies. 

## Main application screens

### Home page

![Capture1](https://user-images.githubusercontent.com/32380979/118348897-e5b5f480-b56a-11eb-9682-5daf0320cbc4.PNG)

![Capture2](https://user-images.githubusercontent.com/32380979/118348902-eb133f00-b56a-11eb-8ffc-5e9b2e047525.PNG)

### Popular movies, Top rated movies, Upcoming movies and currently screening movies will have a similar view as below

![Capture3](https://user-images.githubusercontent.com/32380979/118348939-27469f80-b56b-11eb-8088-6718edb0e71a.PNG)

### Movie detail view

![Capture4](https://user-images.githubusercontent.com/32380979/118348951-3d546000-b56b-11eb-9a60-2067ba5705d1.PNG)

What's included:

- Uses [`React`](https://reactjs.org/) as the web application framework
- Uses [`TMDB API`](https://developers.themoviedb.org/3/getting-started/introduction) to retrieve movie information
- Uses [`Material UI`](https://material-ui.com/) to style the components
- Uses [`Axios`](https://www.npmjs.com/package/axios) as the HTTP client
- Uses [`Fastify`](https://www.fastify.io/) as the proxy API framework
- Hosted with [`Vercel`](https://vercel.com/)

## Table of Content

- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Development Environment Setup](#development-environment-setup)
  - [Build and run](#build-and-run-from-source)
  - [Available scripts](#available-scripts)
- [License](#license)

## Quick Start

After setting up your local DEV environment, you can clone this repository and run the solution using `yarn start` command. Make sure to create and configure the `.env` file with the provided setting value.

```
REACT_APP_TMDB_PROXY_BASE_URL=https://find-me-movies.vercel.app/api/
REACT_APP_TMDB_POSTER_BASE_URL=https://image.tmdb.org/t/p/w220_and_h330_face/
REACT_APP_TMDB_BACKDROP_BASE_URL=https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/
```

### Prerequisites

You'll need the following tools:

- [Yarn package manager](https://yarnpkg.com/getting-started/install)
- [Node.js](https://nodejs.org/en/), version `>=14`
- [VS Code](https://code.visualstudio.com/)
- [TMDB developer account](https://www.themoviedb.org/signup)


### Build and run from source

First clone this repository locally.

- Run `yarn` command from the repository root
- Add `.env` file with the configs mentioned above
- Run `yarn start`
- Local site will be available in `[http://localhost:3000]`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## License

Licensed under the [MIT](LICENSE) license.

[ci-url]: https://github.com/gayankanishka/find-me-movies/workflows/CI/badge.svg
[contributors-shield]: https://img.shields.io/badge/CONTRIBUTORS-green.svg
[contributors-url]: https://github.com/gayankanishka/find-me-movies/graphs/contributors
[forks-shield]: https://img.shields.io/badge/FORKS-blue.svg
[forks-url]: https://github.com/gayankanishka/find-me-movies/network/members
[stars-shield]: https://img.shields.io/badge/STARS-blue.svg
[stars-url]: https://github.com/gayankanishka/find-me-movies/stargazers
[issues-shield]: https://img.shields.io/badge/ISSUES-orange.svg
[issues-url]: https://github.com/gayankanishka/find-me-movies/issues
[license-shield]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: https://github.com/gayankanishka/find-me-movies/blob/master/LICENSE

<!-- [product-screenshot]: images/screenshot.png -->
