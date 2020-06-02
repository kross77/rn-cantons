import * as React from "react";
import Svg, { Path } from 'react-native-svg';

export const CenterPoint = (props: any) => {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44" fill="none" {...props}>
      <Path d="M22 29a7 7 0 100-14 7 7 0 000 14z" fill="#CD0102" />
      <Path
        d="M22 42c11.046 0 20-8.954 20-20S33.046 2 22 2 2 10.954 2 22s8.954 20 20 20z"
        stroke="#CD0102"
        strokeWidth={3.5}
      />
    </Svg>
  );
};

export default CenterPoint;
