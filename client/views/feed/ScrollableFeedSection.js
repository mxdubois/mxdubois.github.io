import R from 'ramda'
import React from 'react'
import T from 'prop-types'

import FeedSection from './FeedSection'
import ScrollingSection from './ScrollingSection'

const ScrollableFeedSection = ({ viewports, ...rest }) =>
  !R.isNil(viewports)
    ? <ScrollingSection
        positionKey={rest.title}
        background={rest.primaryColor}
        viewports={viewports}
      >
        <FeedSection size="fullscreen" {...rest} />
      </ScrollingSection>
    : <FeedSection {...rest} />

ScrollableFeedSection.propTypes = {
  viewports: T.number,
}

export default ScrollableFeedSection
