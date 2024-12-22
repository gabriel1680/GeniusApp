import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

const AppHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>GeniusApp</Text>
            <Text style={styles.subTitle}>Teste Sua Memória!</Text>
        </View>
    );
};

export default AppHeader;