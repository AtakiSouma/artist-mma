import {View, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import { globalStyles } from '../style/globalStyles';


interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const SectionComponent = (props: Props) => {
  const {children, styles} = props;

  return <View style={[globalStyles.section, styles]}>{children}</View>;
};

export default SectionComponent;
