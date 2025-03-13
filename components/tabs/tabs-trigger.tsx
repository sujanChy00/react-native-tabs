import React from 'react';
import { StyleSheet, Text, Pressable, ViewStyle, TextStyle, LayoutChangeEvent } from 'react-native';
import { useTabs } from './tabs';

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
  style?: ViewStyle;
  activeStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeTextStyle?: TextStyle;
  onLayout?: (event: LayoutChangeEvent) => void;
  className?: string;
  activeClassName?: string;
  textClassName?: string;
  activeTextClassName?: string;
};

export default function TabsTrigger({
  value,
  children,
  style,
  activeStyle,
  textStyle,
  activeTextStyle,
  onLayout,
  className,
  activeClassName,
  textClassName,
  activeTextClassName,
}: TabsTriggerProps) {
  const { activeTab, setActiveTab, registerTab } = useTabs();

  React.useEffect(() => {
    registerTab(value);
  }, [value]);

  const isActive = activeTab === value;

  return (
    <Pressable
      onLayout={onLayout}
      className={className}
      style={[styles.trigger, style, isActive && styles.activeTrigger, isActive && activeStyle]}
      onPress={() => setActiveTab(value)}>
      {typeof children === 'string' ? (
        <Text
          style={[
            styles.text,
            textStyle,
            isActive && styles.activeText,
            isActive && activeTextStyle,
          ]}
          className={textClassName}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  trigger: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  activeTrigger: {
    // backgroundColor: "red",
  },
  text: {
    fontSize: 14,
    color: '#64748b',
  },
  activeText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});
