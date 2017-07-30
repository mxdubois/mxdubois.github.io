import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from './views/app/App'
import Feed from './views/feed/Feed'
import About from './views/about/About'
import Home from './views/home/Home'
import NotFound from './views/not-found/NotFound'

// NOTE: react-static-webpack-plugin requires the root Route to have a path
export const routes = (
  <Route path="/" component={App}>
    <Route component={Feed}>
      <IndexRoute title="Michael DuBois"
        components={{
          main: Home,
          aside: About,
        }}
      />
      <Redirect from="about" to="/" />
    </Route>
    <Route path="*" title="Not Found - Michael DuBois" component={NotFound} />
  </Route>
)

export default routes
