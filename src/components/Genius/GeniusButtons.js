import React from 'react';
import { TouchableOpacity, View } from "react-native";

import styles from './styles';

/**
 * @param {{ game: import('../../engine/GameEngine').GameEngine, disabled: boolean, coloToBlink: string }} param0
 * @returns {JSX.Element}
 */
function GeniusButtons({ game }) {
  return (
    <>
      <View style={styles.topBottomButton}>
        <TouchableOpacity
          onPressOut={() => game.playerPressColor('red')}
          disabled={game.isPlayerTurn}>
          <View
            style={[
              styles.geniusButton,
              styles.topLeftButton,
              styles.redButton,
              { opacity: game.currentColor === 'red' ? 1 : 0.3 },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPressOut={() => game.playerPressColor('green')}
          disabled={game.isPlayerTurn}>
          <View
            style={[
              styles.geniusButton,
              styles.topRightButton,
              styles.greenButton,
              { opacity: game.currentColor === 'green' ? 1 : 0.3 },
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.topBottomButton}>
        <TouchableOpacity
          onPressOut={() => game.playerPressColor('yellow')}
          disabled={game.isPlayerTurn}>
          <View
            style={[
              styles.geniusButton,
              styles.bottomLeftButton,
              styles.yellowButton,
              { opacity: game.currentColor === 'yellow' ? 1 : 0.3 },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPressOut={() => game.playerPressColor('blue')}
          disabled={game.isPlayerTurn}>
          <View
            style={[
              styles.geniusButton,
              styles.bottomRightButton,
              styles.blueButton,
              { opacity: game.currentColor === 'blue' ? 1 : 0.3 },
            ]}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default GeniusButtons;
