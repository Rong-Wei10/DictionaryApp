import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const ArrowDown = ({props}) => {
    return (
        <Svg width="14" height="8" viewBox="0 0 14 8" {...props}>
          <Path
            fill="none"
            stroke="#A445ED"
            strokeWidth="1.5"
            d="m1 1 6 6 6-6"
          />
        </Svg>
      );
  }

export default ArrowDown;