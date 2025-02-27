import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 15,
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 15,
    },
    startButton: {
        width: 150,
        height: 65,
        padding: 20,
        zIndex: 8,
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startButtonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
