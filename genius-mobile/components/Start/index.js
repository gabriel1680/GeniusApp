import { TouchableOpacity, Text } from 'react-native';

import AppHeader from '../AppHeader';
import { styles } from './styles';

export default function Start({ onStart }) {
    return (
        <>
            <AppHeader />
            <TouchableOpacity onPress={onStart} style={styles.startButton}>
                <Text style={styles.startButtonText}>Começar!</Text>
            </TouchableOpacity>
        </>
    );
}
