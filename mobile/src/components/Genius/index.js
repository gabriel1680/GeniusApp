import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Score from '../Score';
import Title from '../Title';
import styles from './styles';

import { GameEngine, Timer } from '@genius/engine';

import GeniusButtons from './GeniusButtons';
import { PauseButton } from './PauseButton';
import { playGameOverSound, playSoundByColor } from './sound';

export default function Genius() {
    const game = GameEngine.create('New Player');
    const timer = new Timer();
    game.onGameOver(playGameOverSound);
    game.onCurrentColorChange(playSoundByColor);
    game.start();

    useEffect(() => {
        async function mainLoop() {
            for await (const _ of timer.tick()) game.update();
        }
        mainLoop();
    }, []);

    function getTitle() {
        if (game.state.isGameOver) return '';
        return game.state.isPlayerTurn ? 'Sua Vez' : 'Observe';
    }

    function getOpacity() {
        return game.state.isGameOver ? 0.3 : 1;
    }

    return (
        <View style={styles.container}>
            {timer.isPaused && (
                <PauseButton onPress={() => timer.togglePause()} />
            )}
            <Title text={getTitle()} />
            <View style={[styles.centerCircle, { opacity: getOpacity() }]} />
            <GeniusButtons
                disabled={game.state.isPlayerTurn}
                currentColor={game.state.currentColor}
                onPress={color => game.playerPressColor(color)}
            />
            <Score currentRound={game.state.roundColors.length} />
            {game.state.isGameOver && (
                <View style={styles.restartContainer}>
                    <Text style={styles.restartTitle}>Game Over )=</Text>
                    <TouchableOpacity
                        onPress={() => game.restart()}
                        style={styles.restartButton}>
                        <Text style={styles.restartButtonText}>Recomeçar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
