import { View, ViewProps } from 'react-native';
4;

export const TabsContentWrapper = (props: ViewProps) => {
  return (
    <View
      {...props}
      style={[{ flex: 1, position: 'relative' }, props.style]}
      className={`relative flex-1 ${props.className}`}>
      {props.children}
    </View>
  );
};
