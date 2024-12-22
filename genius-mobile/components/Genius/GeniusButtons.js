import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';

/**
 * Game buttons.
 *
 * @param {{ onPress: (color: string) => void, disabled: boolean, currentColor: boolean }} param0
 * @returns {JSX.Element}
 */
function GeniusButtons({ disabled, currentColor, onPress }) {
    return (
        <>
            <View style={styles.topBottomButton}>
                <TouchableOpacity
                    onPress={() => onPress('red')}
                    disabled={disabled}>
                    <View
                        style={[
                            styles.geniusButton,
                            styles.topLeftButton,
                            styles.redButton,
                            { opacity: currentColor === 'red' ? 1 : 0.3 },
                        ]}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onPress('green')}
                    disabled={disabled}>
                    <View
                        style={[
                            styles.geniusButton,
                            styles.topRightButton,
                            styles.greenButton,
                            { opacity: currentColor === 'green' ? 1 : 0.3 },
                        ]}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.topBottomButton}>
                <TouchableOpacity
                    onPress={() => onPress('yellow')}
                    disabled={disabled}>
                    <View
                        style={[
                            styles.geniusButton,
                            styles.bottomLeftButton,
                            styles.yellowButton,
                            { opacity: currentColor === 'yellow' ? 1 : 0.3 },
                        ]}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onPress('blue')}
                    disabled={disabled}>
                    <View
                        style={[
                            styles.geniusButton,
                            styles.bottomRightButton,
                            styles.blueButton,
                            { opacity: currentColor === 'blue' ? 1 : 0.3 },
                        ]}
                    />
                </TouchableOpacity>
            </View>
        </>
    );
}

export default GeniusButtons;
