import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';

/**
 *
 * @param {{style: import('react-native').ViewStyle, opacity: number, disabled: boolean, onPress: Function}} param0
 * @returns
 */
export function GeniusButton({ style, opacity, disabled, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View
                style={[
                    styles.geniusButton,
                    ...style,
                    {
                        opacity: opacity,
                    },
                ]}
            />
        </TouchableOpacity>
    );
}
