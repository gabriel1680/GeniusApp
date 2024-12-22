import { TouchableOpacity, Text } from 'react-native';

/**
 * Pause/Resume game button.
 *
 * @param {{isPaused: boolean onPress: () => void}} param0
 * @returns {JSX.Element}
 */
export function PauseButton({ isPaused, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>{isPaused ? '️▶️ Resume' : '⏸️ Pause'}</Text>
        </TouchableOpacity>
    );
}
