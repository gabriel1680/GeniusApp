import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Score from "../Score";
import Title from "../Title";
import styles from "./styles";

import { GameEngine } from "../../engine/GameEngine";

import GeniusButtons from "./GeniusButtons";
import { playGameOverSound, playSoundByColor } from "./sound";

const Genius = () => {

    const game = new GameEngine();
    game.onGameOver(playGameOverSound);
    game.onCurrentColorChange(playSoundByColor);
    game.start();

    return (
        <View style={styles.container}>
            <Title text={getTitle()} />
            <View style={[styles.centerCircle, { opacity: (game.isGameOver ? 0.3 : 1) }]} />
            <GeniusButtons game={game} />
            <Score currentRound={game.round.colors.length} />
            {game.isGameOver && (
                <View style={styles.restartContainer}>
                    <Text style={styles.restartTitle}>Game Over )=</Text>
                    <TouchableOpacity onPress={game.restart} style={styles.restartButton} >
                        <Text style={styles.restartButtonText}>Recomeçar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View >
    );

    function getTitle() {
        if (game.isGameOver) return "";
        return game.isPlayerTurn ? "Sua Vez" : "Observe";
    }
};

export default Genius;