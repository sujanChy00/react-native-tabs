import React, { useEffect, useRef } from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  findNodeHandle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTabs } from './tabs';

type TabsListProps = {
  children: React.ReactNode;
  style?: ScrollViewProps['style'];
  className?: string;
  indicatorColor?: string;
  contentContainerClassName?: string;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
};

interface MeasurableScrollView extends ScrollView {
  measure(
    callback: (
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number
    ) => void
  ): void;
}

export default function TabsList({
  children,
  className,
  style,
  indicatorColor,
  contentContainerClassName,
  contentContainerStyle,
}: TabsListProps) {
  const { activeIndex } = useTabs();
  const tabPositions = useRef<{ [key: number]: number }>({});
  const tabWidths = useRef<{ [key: number]: number }>({});
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const scrollViewRef = useRef<MeasurableScrollView>(null);

  useEffect(() => {
    if (activeIndex >= 0 && tabPositions.current[activeIndex] !== undefined) {
      indicatorPosition.value = withTiming(tabPositions.current[activeIndex], {
        duration: 300,
      });
      indicatorWidth.value = withTiming(tabWidths.current[activeIndex], {
        duration: 300,
      });

      const scrollPosition = tabPositions.current[activeIndex];
      const tabWidth = tabWidths.current[activeIndex];

      const nodeHandle = scrollViewRef.current && findNodeHandle(scrollViewRef.current);
      if (nodeHandle) {
        scrollViewRef.current?.measure((_x, _y, width, _height, _pageX, _pageY) => {
          const scrollViewWidth = width;
          const idealScrollPosition = scrollPosition - (scrollViewWidth - tabWidth) / 2;
          const finalScrollPosition = Math.max(0, idealScrollPosition);

          scrollViewRef.current?.scrollTo({
            x: finalScrollPosition,
            animated: true,
          });
        });
      }
    }
  }, [activeIndex]);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
      width: indicatorWidth.value,
    };
  });

  const handleTabLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    tabPositions.current[index] = x;
    tabWidths.current[index] = width;

    if (index === activeIndex) {
      indicatorPosition.value = x;
      indicatorWidth.value = width;
    }
  };

  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onLayout: handleTabLayout(index),
      });
    }
    return child;
  });

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={style}
        contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        contentContainerClassName={contentContainerClassName}
        className={className}>
        {enhancedChildren}
        <Animated.View
          style={[
            styles.indicator,
            indicatorColor ? { backgroundColor: indicatorColor } : {},
            indicatorStyle,
          ]}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  scrollContent: {
    flexDirection: 'row',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: '#2563eb',
    borderRadius: 1,
  },
});
