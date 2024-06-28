import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Score from "../Score";
import Title from "../Title";
import styles from "./styles";

import { GameEngine } from "@genius/engine";

import GeniusButtons from "./GeniusButtons";
import { playGameOverSound, playSoundByColor } from "./sound";

export default function Genius() {
    const game = new GameEngine();
    game.onGameOver(playGameOverSound);
    game.onCurrentColorChange(playSoundByColor);
    game.start();

    function getTitle() {
        if (game.state.isGameOver) return "";
        return game.state.isPlayerTurn ? "Sua Vez" : "Observe";
    }

    function getOpacity() {
        return game.state.isGameOver ? 0.3 : 1;
    }

    return (
        <View style={styles.container}>
            <Title text={getTitle()} />
            <View style={[styles.centerCircle, { opacity: getOpacity() }]} />
            <GeniusButtons game={game} />
            <Score currentRound={game.state.roundColors.length} />
            {game.state.isGameOver && (
                <View style={styles.restartContainer}>
                    <Text style={styles.restartTitle}>Game Over )=</Text>
                    <TouchableOpacity onPress={game.restart} style={styles.restartButton} >
                        <Text style={styles.restartButtonText}>Recomeçar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View >
    );
}
