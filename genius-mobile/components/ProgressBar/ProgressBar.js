import React, { useState, useEffect } from 'react';
import { useAnimatedValue, Animated, View } from 'react-native';

/**
 * Default progress bar
 *
 * @param {{ step: number, steps: number, height: number}} param0 props
 * @returns {JSX.Element}
 */
export function ProgressBar({ step, steps, height = 10 }) {
    const [width, setWidth] = useState(100);
    const animatedValue = useAnimatedValue(-1000);
    const reactive = useAnimatedValue(1000);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        reactive.setValue(-width + (width * step) / steps);
    }, [step, width]);

    return (
        <View
            style={{
                height: height,
                borderRadius: height,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                width: 200,
                marginBottom: 32,
            }}
            onLayout={e => {
                const newWidth = e.nativeEvent.layout.width;
                setWidth(newWidth);
            }}>
            <Animated.View
                style={{
                    height: height,
                    borderRadius: height,
                    width: '100%',
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    left: 0,
                    top: 0,
                    transform: [
                        {
                            translateX: animatedValue,
                        },
                    ],
                }}
            />
        </View>
    );
}
