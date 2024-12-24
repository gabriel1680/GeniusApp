import React from 'react';
import { FlatList, View } from 'react-native';

import { GeniusButton } from './GeniusButton';
import styles from './styles';

/**
 * Game buttons.
 *
 * @param {{ onPress: (color: string) => void, disabled: boolean, currentColor: boolean }} param0
 * @returns {JSX.Element}
 */
function GeniusButtons({ disabled, currentColor, onPress }) {
    function getOpacity(color) {
        return currentColor === color ? 1 : 0.3;
    }

    return (
        <View style={styles.buttonsContainer}>
            <FlatList
                contentContainerStyle={styles.buttonsList}
                numColumns={2}
                data={buttonsSchema}
                renderItem={({ item }) => (
                    <GeniusButton
                        style={[
                            ...item.styles,
                            { opacity: getOpacity(item.color) },
                        ]}
                        disabled={disabled}
                        onPress={() => onPress(item.color)}
                    />
                )}
                keyExtractor={item => item.color}
            />
            <View style={styles.centerCircle} />
        </View>
    );
}

const buttonsSchema = [
    {
        color: 'red',
        styles: [styles.topLeftButton, styles.redButton],
    },
    {
        color: 'green',
        styles: [styles.topRightButton, styles.greenButton],
    },
    {
        color: 'yellow',
        styles: [styles.bottomLeftButton, styles.yellowButton],
    },
    {
        color: 'blue',
        styles: [styles.bottomRightButton, styles.blueButton],
    },
];

export default GeniusButtons;
