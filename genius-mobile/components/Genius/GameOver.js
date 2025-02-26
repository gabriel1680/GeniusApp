import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

export function GameOver({ onRestart }) {
    return (
        <View style={styles.restartContainer}>
            <Text style={styles.restartTitle}>Game Over )=</Text>
            <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
                <Text style={styles.restartButtonText}>Recomeçar</Text>
            </TouchableOpacity>
        </View>
    );
}
