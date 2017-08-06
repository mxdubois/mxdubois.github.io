import React from 'react'
import T from 'prop-types'
import { Sticky, StickyContainer } from 'react-sticky'

import Position from '../../lib/react-position/Position'

const ScrollingSection = ({ positionKey, viewports, background, children }) =>
  <Position name={positionKey}>
    <StickyContainer
      style={{
        height: `${viewports * 100}vh`,
        background,
      }}
    >
      <Sticky>
        {({ style }) =>
          <Position name={`${positionKey}__content`}>
            <div style={style}>
              {children}
            </div>
          </Position>}
      </Sticky>
    </StickyContainer>
  </Position>

ScrollingSection.propTypes = {
  positionKey: T.string.isRequired,
  viewports: T.number.isRequired,
  background: T.string,
  children: T.node,
}

export default ScrollingSection
