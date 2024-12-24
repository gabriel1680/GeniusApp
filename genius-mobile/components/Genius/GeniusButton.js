import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';

/**
 *
 * @param {{style: import('react-native').ViewStyle, disabled: boolean, onPress: Function}} param0
 * @returns {JSX.Element}
 */
export function GeniusButton({ style, disabled, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={[styles.geniusButton, ...style]} />
        </TouchableOpacity>
    );
}
