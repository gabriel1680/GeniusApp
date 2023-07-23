import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Score from "../Score";
import Title from '../Title';
import styles from './styles';

import { GameEngine } from '../../engine/GameEngine';

import { playGameOverSound, playSoundByColor } from "./sound";
import GeniusButtons from "./GeniusButtons";

const Genius = () => {

    const [colorToBlink, setColorToBlink] = useState('');
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);

    const game = new GameEngine();
    game.onGameOver(() => playGameOverSound());
    game.onRoundMove(() => setIsPlayerTurn(false));


    playSoundByColor(game.getRoundLastColor());

    useEffect(() => {
        blinkRoundColors();
    }, [game.round.colors.length]);

    async function blinkRoundColors() {
        for (const color of game.round.colors) {
            await sleep();
            setColorToBlink(color);
            await sleep();
            setColorToBlink('');
        }
        setIsPlayerTurn(true);
    }

    function sleep(ms = 300) {
        return new Promise(r => setTimeout(() => r(null), ms));
    }

    return (
        <View style={styles.container}>

            <Title text={(game.isGameOver ? '' : (isPlayerTurn ? 'Sua Vez' : 'Observe'))} />

            <View style={[styles.centerCircle, { opacity: (game.isGameOver ? 0.3 : 1) }]} />

            <GeniusButtons game={game} disabled={!isPlayerTurn} colorToBlink={colorToBlink} />

            <Score currentRound={game.round.colors.length} />

            {game.isGameOver && (
                <View style={styles.restartContainer}>
                    <Text style={styles.restartTitle}>Game Over )=</Text>
                    <TouchableOpacity onPress={() => game.restart()} style={styles.restartButton} >
                        <Text style={styles.restartButtonText}>Recomeçar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View >
    );
};

export default Genius;