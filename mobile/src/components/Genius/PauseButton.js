/**
 * Pause/Resume game button.
 *
 * @param {{onPress: () => void}} param0
 * @returns {JSX.Element}
 */
export function PauseButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Pause</Text>
        </TouchableOpacity>
    );
}
