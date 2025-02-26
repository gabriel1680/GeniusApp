import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import Score from '../Score';
import Title from '../Title';
import styles from './styles';

import { Clock, GameEngine, GameEvent } from '@genius/engine';

import GeniusButtons from './GeniusButtons';
import { PauseButton } from './PauseButton';
import { TimeoutBar } from './TimeoutBar';
import { GameOver } from './GameOver';
import SoundPlayer from '@/services/sound/SoundPlayer';
import EnvironmentManager from '@/services/EnvironmentManager';

// TODO: extract this to app state or provider
const game = GameEngine.create('New Player');
const clock = new Clock();
game.start();

const soundPlayer = new SoundPlayer();
game.on(GameEvent.COLOR_CHANGED, color => soundPlayer.playFor(color));
game.on(GameEvent.GAME_OVER, () => soundPlayer.playFor('gameOver'));

export default function Genius() {
    const [_, setTick] = useState(0);
    const [isPaused, setIsPaused] = useState(clock.isPaused);

    async function mainLoop() {
        for await (const _ of clock.tick()) {
            game.update();
            setTick(prev => (prev += 1));
        }
    }

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

    if (EnvironmentManager.isDev) {
        console.debug({ state: game.state });
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
            {game.state.isPlayerTurn && (
                <TimeoutBar
                    isPaused={isPaused}
                    millis={game.state.roundColors.length * 1000}
                />
            )}
            <Score currentRound={game.state.roundColors.length} />
            {/* TODO: add black overlay when over  */}
            {game.state.isGameOver && (
                <GameOver onRestart={() => game.restart()} />
            )}
        </View>
    );
}
