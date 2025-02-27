import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

export default function Start({ onStart }) {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>GeniusApp</Text>
                <Text style={styles.subTitle}>Teste Sua Memória!</Text>
            </View>
            <TouchableOpacity onPress={onStart} style={styles.startButton}>
                <Text style={styles.startButtonText}>Começar!</Text>
            </TouchableOpacity>
        </>
    );
}
