# mxdubois/website
Hosted at [michaeldubois.me](michaeldubois.me)

## Usage

**`npm run start`**: Start a dev server

**`npm run start:dashboard`**: Start a dev server with Webpack Dashboard

**`npm run build`**: Compile, minify and fingerprint everything and create static files from routes

**`npm run build:analyze`**: Same as above, but will also output `webpack-bundle-analyzer-stats.json` and `webpack-bundle-analyzer-report.html` for you to analyze. Open the HTML file in a web browser to analyze the bundle. Or from the CLI:

```
open build/webpack-bundle-analyzer-report.html
```

**`npm run eject`**: If you decide to customize the webpack config beyond the
constraints of [app-time](https://github.com/iansinnott/app-time/),
you can eject the default configuration into the project.

## Attributions
The build setup based on [react-static-boilerplate](https://github.com/iansinnott/react-static-boilerplate),
which uses [app-time](https://github.com/iansinnott/app-time/) as a
customizable abstraction of webpack config. This seemed like a reasonable
starting point for a static react site without a lot of longterm buy-in.
