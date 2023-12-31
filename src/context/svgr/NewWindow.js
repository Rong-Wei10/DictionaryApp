import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const NewWindow = ({props}) => {
    return (
        <Svg width={14} height={14} viewBox="0 0 14 14" {...props}>
          <Path
            fill="none"
            stroke="#838383"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
          />
        </Svg>
      );
  }

export default NewWindow;