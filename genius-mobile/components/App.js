import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

import Genius from './Genius';
import Start from './Start';

export default function App() {
    const [isStart, setStart] = useState(false);

    function onStart() {
        return setStart(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <View style={styles.container}>
                {isStart ? <Genius /> : <Start onStart={onStart} />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
