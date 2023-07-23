import React from 'react';

import styles from './styles';

function GeniusButton({ disabled, onPress, opacity }) {
  return (
    <TouchableOpacity onPressOut={onPress} disabled={disabled}>
      <View
        style={[
          styles.geniusButton,
          styles.topLeftButton,
          styles.redButton,
          {
            opacity: opacity,
          },
        ]}
      />
    </TouchableOpacity>
  );
}

export default GeniusButton;