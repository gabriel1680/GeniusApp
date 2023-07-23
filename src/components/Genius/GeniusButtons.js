import React from 'react';
import { TouchableOpacity, View } from "react-native";

import styles from './styles';

/**
 * @param {{ game: import('../../engine/GameEngine').GameEngine, disabled: boolean, coloToBlink: string }} param0
 * @returns {JSX.Element}
 */
function GeniusButtons({ game, disabled, coloToBlink }) {
  return (
    <>
      <View style={styles.topBottomButton}>
        <TouchableOpacity
          onPressOut={() => game.playerPressColor('red')}
          disabled={disabled}>
          <View
            style={[
              styles.geniusButton,
              styles.topLeftButton,
              styles.redButton,
              { opacity: coloToBlink === 'red' ? 1 : 0.3 },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPressOut={() => game.playerPressColor('green')}
          disabled={disabled}>
          <View
            style={[
              styles.geniusButton,
              styles.topRightButton,
              styles.greenButton,
              { opacity: coloToBlink === 'green' ? 1 : 0.3 },
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.topBottomButton}>
        <TouchableOpacity
          onPressOut={() => game.playerPressColor('yellow')}
          disabled={disabled}>
          <View
            style={[
              styles.geniusButton,
              styles.bottomLeftButton,
              styles.yellowButton,
              { opacity: coloToBlink === 'yellow' ? 1 : 0.3 },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPressOut={() => game.playerPressColor('blue')}
          disabled={disabled}>
          <View
            style={[
              styles.geniusButton,
              styles.bottomRightButton,
              styles.blueButton,
              { opacity: coloToBlink === 'blue' ? 1 : 0.3 },
            ]}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default GeniusButtons;
