import React, { useState } from 'react';
import { Text, SafeAreaView, StatusBar, TouchableOpacity, View, StyleSheet } from 'react-native';

import Genius from './components/Genius';
import AppHeader from './components/AppHeader';


export default function App() {

    const [isStart, setStart] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <View style={styles.container}>
                {
                    isStart ?
                        <Genius /> :
                        (<>
                            <AppHeader />
                            <TouchableOpacity onPress={() => setStart(true)} style={styles.startButton}>
                                <Text style={styles.startButtonText}>Começar!</Text>
                            </TouchableOpacity>
                        </>)
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    startButton: {
        width: 150,
        height: 65,
        padding: 20,
        zIndex: 8,
        backgroundColor: '#2c3e50',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startButtonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
