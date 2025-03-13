import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTabs } from './tabs';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
  style?: ViewStyle;
  className?: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TabsContent({ value, children, style, className }: TabsContentProps) {
  const { activeTab, setActiveTab, tabValues, activeIndex } = useTabs();
  const isActive = activeTab === value;
  const currentIndex = tabValues.indexOf(value);

  const translateX = useSharedValue(0);
  const context = useSharedValue({ x: 0 });

  useEffect(() => {
    const offset = (currentIndex - activeIndex) * SCREEN_WIDTH;
    translateX.value = withTiming(offset, { duration: 300 });
  }, [activeIndex, currentIndex]);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-5, 5])
    .onStart(() => {
      context.value = { x: translateX.value };
    })
    .onUpdate((event) => {
      translateX.value = context.value.x + event.translationX;
    })
    .onEnd((event) => {
      const currentPosition = translateX.value;
      const velocity = event.velocityX;

      let snapToIndex = activeIndex;

      if (Math.abs(velocity) > 800) {
        if (velocity < 0 && activeIndex < tabValues.length - 1) {
          snapToIndex = activeIndex + 1;
        } else if (velocity > 0 && activeIndex > 0) {
          snapToIndex = activeIndex - 1;
        }
      } else {
        const dragAmount = currentPosition - (currentIndex - activeIndex) * SCREEN_WIDTH;

        if (dragAmount < -SCREEN_WIDTH / 2 && activeIndex < tabValues.length - 1) {
          snapToIndex = activeIndex + 1;
        } else if (dragAmount > SCREEN_WIDTH / 2 && activeIndex > 0) {
          snapToIndex = activeIndex - 1;
        }
      }

      if (snapToIndex !== activeIndex) {
        runOnJS(setActiveTab)(tabValues[snapToIndex]);
      } else {
        translateX.value = withTiming((currentIndex - activeIndex) * SCREEN_WIDTH, {
          duration: 300,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (!isActive && Math.abs(currentIndex - activeIndex) > 1) {
    return null;
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.content,
          {
            left: SCREEN_WIDTH * (currentIndex - activeIndex),
            width: SCREEN_WIDTH,
          },
          animatedStyle,
        ]}>
        <View className={`p-4 ${className}`} style={[styles.innerContent, style]}>
          {children}
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  innerContent: {
    flex: 1,
  },
});
