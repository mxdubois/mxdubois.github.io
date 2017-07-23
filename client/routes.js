import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from './views/app/App'
import Feed from './views/feed/Feed'
import About from './views/about/About'
import Home from './views/home/Home'
import NotFound from './views/not-found/NotFound'

const feedItems = [
  {
    key: 'home',
    component: Home,
  },
]

const feedItemProps = {
  main: Home,
  aside: About,
  items: feedItems,
}

const routes = (
  <Route component={App}>
    <Route path="/" component={Feed}>
      <IndexRoute title="App" components={feedItemProps} />
      {feedItems.map(item =>
        <Route
          key={item.key}
          path={item.key}
          components={{
            ...feedItemProps,
            activeKey: item.key,
            activeComponent: item.component,
          }}
        />,
      )}
      <IndexRoute title="App" components={feedItemProps} />
      <Redirect from="about" to="/" />
    </Route>
    <Route path="*" title="404: Not Found" component={NotFound} />
  </Route>
)

export default routes
