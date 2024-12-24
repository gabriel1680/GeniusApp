import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Score from '../Score';
import Title from '../Title';
import styles from './styles';

import { Clock, GameEngine } from '@genius/engine';

import GeniusButtons from './GeniusButtons';
import { PauseButton } from './PauseButton';

// TODO: extract this to app state or provider
const game = GameEngine.create('New Player');
const clock = new Clock();
game.start();

export default function Genius() {
    // TODO: add sound effects
    const [_, setTick] = useState(0);
    const [isPaused, setIsPaused] = useState(clock.isPaused);

    async function mainLoop() {
        for await (const _ of clock.tick()) {
            game.update();
            setTick(prev => (prev += 1));
        }
    }

    console.debug({ state: game.state });

    useEffect(() => {
        mainLoop();
    }, [isPaused]);

    function onPauseOrResume() {
        clock.togglePause();
        setIsPaused(clock.isPaused);
    }

    function getTitle() {
        if (game.state.isGameOver) return '';
        return game.state.isPlayerTurn ? 'Sua Vez' : 'Observe';
    }

    return (
        <View style={styles.container}>
            {/* TODO: add black overlay when game paused to prevent click buttons */}
            <PauseButton isPaused={clock.isPaused} onPress={onPauseOrResume} />
            <Title text={getTitle()} />
            <GeniusButtons
                disabled={!game.state.isPlayerTurn}
                currentColor={game.state.currentColor}
                onPress={color => game.playerPressColor(color)}
            />
            <Score currentRound={game.state.roundColors.length} />
            {/* TODO: add black overlay when over  */}
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
