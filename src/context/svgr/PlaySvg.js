import React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const PlaySvg = ({props}) => {
    return (
      <Svg width={75} height={75} viewBox="0 0 75 75" {...props}>
      <Circle cx={37.5} cy={37.5} r={37.5} opacity={0.25} fill="#A445ED" />
      <Path d="M29 27v21l21-10.5z" fill="#A445ED" fillRule="evenodd" />
    </Svg>
    );
  }

export default PlaySvg;