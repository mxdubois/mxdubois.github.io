import { isNil } from 'ramda'

import clamp from './clamp'

export const parsePercentage = (str = '') => {
  const trimmed = `${str}`.trim();
  const hasPercent = trimmed.length > 0 && trimmed.indexOf('%') === trimmed.length - 1;
  return hasPercent ? Number.parseFloat(trimmed) / 100 : undefined;
};

export const fixedOrPercentage = (fixed, percentage, container) => {
  return !isNil(percentage) ? percentage * container : fixed;
};

export const computeLength = (length, containerLength) => {
  return fixedOrPercentage(length, parsePercentage(length), containerLength);
};

export const computeSize = ({
  width,
  height,
  minWidth = 0,
  minHeight = 0,
  maxWidth = Number.POSITIVE_INFINITY,
  maxHeight = Number.POSITIVE_INFINITY,
}) => {
  const computedMinHeight = computeLength(minHeight, height)
  const computedMaxHeight = computeLength(maxHeight, height)
  const computedMinWidth = computeLength(minWidth, width)
  const computedMaxWidth = computeLength(maxWidth, width)

  return {
    width: clamp(computedMinWidth, computedMaxWidth, width),
    height: clamp(computedMinHeight, computedMaxHeight, height),
  }
}
