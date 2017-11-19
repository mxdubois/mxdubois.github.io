import R from 'ramda'

// A general-purpose interpolator for tweening `progress` on a component as
// a "playhead" node, moves through a "container" node.
//
// The playhead and container must be defined using <Position> with a `name`
// matching the playheadKey or containerKey, respectively.
//
// Usually the playhead is a react-sticky Sticky node that will stick to the
// window within a StickyContainer container. Then the height of the
// StickyContainer defines the speed/duration of the animation.
//
// However, the playhead could also be a static node if the window is used as
// the container, in which case window height defines the speed/duration.
//
// This is a very simple example of a Position interpolator. More often, it
// is useful to define keyframes, which requires additional utilities.
// Contact michael@michaeldubois.me if you want to hear more about that.

const containerInterpolator = R.memoize(
  (containerKey, playheadKey) => positions => {
    const { self, window: viewport } = positions
    const container = positions[containerKey]
    const playhead = positions[playheadKey] || viewport

    let start
    let end
    if (container && playhead) {
      start = container.top
      end = container.bottom - playhead.height
    } else {
      start = self.top - viewport.height
      end = self.top // self.bottom
    }

    return {
      progress: (playhead.top - start) / (end - start),
      // TODO reconcile names/concepts here
      galleryWidth: self.width,
      galleryHeight: self.height,
    }
  },
)

export default containerInterpolator
