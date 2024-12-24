import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import styles from './styles';

/**
 * Game buttons.
 *
 * @param {{ onPress: (color: string) => void, disabled: boolean, currentColor: boolean }} param0
 * @returns {JSX.Element}
 */
function GeniusButtons({ disabled, currentColor, onPress }) {
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
    return (
        <View style={styles.buttonsContainer}>
            <FlatList
                contentContainerStyle={styles.buttonsList}
                numColumns={2}
                data={buttonsSchema}
                renderItem={({ item }) => (
                    <GeniusButton
                        schema={item}
                        disabled={disabled}
                        opacity={currentColor === item.color ? 1 : 0.3}
                        onPress={() => onPress(item.color)}
                    />
                )}
                keyExtractor={item => item.color}
            />
            <View style={styles.centerCircle} />
        </View>
    );
}

function GeniusButton({ schema, opacity, disabled, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View
                style={[
                    styles.geniusButton,
                    ...schema.styles,
                    {
                        opacity: opacity,
                    },
                ]}
            />
        </TouchableOpacity>
    );
}

export default GeniusButtons;
