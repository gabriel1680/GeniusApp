import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerCircle: {
        backgroundColor: '#7f8c8d',
        height: 40,
        width: 40,
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#000',
        opacity: 1,
        zIndex: 4,
        borderRadius: 20,
        top: '50%',
        left: '23%',
        transform: [{ translateX: -20 }, { translateY: -20 }],
    },
    buttonsContainer: {
        flex: 1,
        position: 'relative',
    },
    buttonsList: {
        position: 'relative',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    geniusButton: {
        alignItems: 'center',
        padding: 10,
        height: 90,
        width: 90,
    },
    topBottomButton: {
        flexDirection: 'row',
        borderRadius: 50,
    },
    topRightButton: {
        borderTopRightRadius: 50,
    },
    topLeftButton: {
        borderTopLeftRadius: 50,
    },
    bottomRightButton: {
        borderBottomRightRadius: 50,
    },
    bottomLeftButton: {
        borderBottomLeftRadius: 50,
    },
    redButton: {
        backgroundColor: '#e74c3c',
    },
    greenButton: {
        backgroundColor: '#2ecc71',
    },
    blueButton: {
        backgroundColor: '#3498db',
    },
    yellowButton: {
        backgroundColor: '#f1c40f',
    },
    restartContainer: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 6,
    },
    restartButton: {
        width: 150,
        height: 65,
        padding: 20,
        zIndex: 8,
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    restartTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        padding: 20,
    },
    restartButtonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default styles;
