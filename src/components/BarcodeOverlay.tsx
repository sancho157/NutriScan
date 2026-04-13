import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

export const BarcodeOverlay = () => {
  const scanLine = useSharedValue(0);

  useEffect(() => {
    scanLine.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLine.value * 200 }],
  }));

  return (
    <View style={styles.overlay}>
      <View style={styles.boundingBox}>
        <Animated.View style={[styles.scanLine, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  boundingBox: {
    width: 280,
    height: 200,
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 12,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#00FF00',
  },
});