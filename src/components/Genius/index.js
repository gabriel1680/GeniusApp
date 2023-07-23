import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import styles from './styles';
import Title from '../Title';
import Score from "../Score";

import { GameEngine } from './GameEngine';

import { playGameOverSound, playSoundByColor } from "./sound";

const Genius = () => {

    const [isUserTurn, setIsUserTurn] = useState(false);

    const game = new GameEngine();
    game.onGameOver(() => playGameOverSound());
    game.onRoundMove(() => setIsUserTurn(false));

    playSoundByColor(game.round.colors.at(-1));

    return (
        <View style={styles.container}>

            <Title text={(game.isGameOver ? '' : (isUserTurn ? 'Sua Vez' : 'Observe'))} />

            <View style={[styles.centerCircle, { opacity: (game.isGameOver ? 0.3 : 1) }]} />

            <View style={styles.topBottomButton}>
                <TouchableOpacity onPressOut={() => game.playerPressColor('red')} disabled={!isUserTurn} >
                    <View style={[styles.geniusButton, styles.topLeftButton, styles.redButton, { opacity: redOpacity }]} />
                </TouchableOpacity>

                <TouchableOpacity onPressOut={() => game.playerPressColor('green')} disabled={!isUserTurn}>
                    <View style={[styles.geniusButton, styles.topRightButton, styles.greenButton, { opacity: greenOpacity }]} />
                </TouchableOpacity>
            </View>

            <View style={styles.topBottomButton}>
                <TouchableOpacity onPressOut={() => game.playerPressColor('yellow')} disabled={!isUserTurn}>
                    <View style={[styles.geniusButton, styles.bottomLeftButton, styles.yellowButton, { opacity: yellowOpacity }]} />
                </TouchableOpacity>

                <TouchableOpacity onPressOut={() => game.playerPressColor('blue')} disabled={!isUserTurn}>
                    <View style={[styles.geniusButton, styles.bottomRightButton, styles.blueButton, { opacity: blueOpacity }]} />
                </TouchableOpacity>
            </View>

            <Score currentRound={round} />

            {game.isGameOver ? (
                <View style={styles.restartContainer}>
                    <Text style={styles.restartTitle}>Game Over )=</Text>
                    <TouchableOpacity onPress={() => game.restart()} style={styles.restartButton} >
                        <Text style={styles.restartButtonText}>Recomeçar</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View >
    );
};

export default Genius;