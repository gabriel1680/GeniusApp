import React, { useState } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

const Score = ({ currentRound }) => {

    const [lastRound, setLastRound] = useState(0);

    if(currentRound - 1 > lastRound)
        setLastRound(currentRound - 1);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: (currentRound > lastRound ? '#b33939' : '#000') }]}>Round: {currentRound}</Text>
            <Text style={styles.text}>Melhor Pontuação: {lastRound}</Text>
        </View >
    );
};

export default Score;