import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import styles from './styles';
import Title from '../Title';
import Score from "../Score";

import { playGameOverSound, playSoundByColor } from "./sound";

const colors = ['red', 'green', 'yellow', 'blue'];

function getRandomInt() {
    min = Math.ceil(0);
    max = Math.floor(3);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Genius = () => {

    const [round, setRound] = useState(1);
    const [roundColors, setRoundColors] = useState([]);
    const [colorToBlink, setColorToBlink] = useState('');
    const [isUserTurn, setIsUserTurn] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [timesPressed, setTimesPressed] = useState(0);
    const [colorPressed, setColorPressed] = useState('');

    function addColorToRoundColors() {
        const color = colors[getRandomInt()];
        roundColors.push(color);
    }

    // generate round colors sequence
    useEffect(() => {

        console.log('Adicionando coress!!');

        setTimesPressed(0);

        setIsUserTurn(false);

        addColorToRoundColors();

    }, [round]);

    let currentColor = '';

    // start sequence colors
    useEffect(() => {
        let i = 0;

        if(isUserTurn || isGameOver) return;

        const gameTimerId = setInterval(() => {

            if(roundColors[0] === undefined) {
                addColorToRoundColors();
            }

            if(i > roundColors.length) {
                setIsUserTurn(true);
                return;
            }

            if(!currentColor) {
                currentColor = roundColors[i];
                setColorToBlink(currentColor);
                i++;
                return;
            }

            currentColor = '';
            setColorToBlink('');
        }, 800);

        return () => {
            clearInterval(gameTimerId);
        };

    }, [isUserTurn]);

    // handle the pressed keys
    useEffect(() => {
        if(!colorPressed) return;

        playSoundByColor(colorPressed);

        const currentColor = roundColors[timesPressed];
        const isCorrect = (colorPressed === currentColor);

        if(!isCorrect) {
            setIsGameOver(true);
            return;
        }

        setTimesPressed(timesPressed + 1);
        setColorPressed('');

    }, [colorPressed]);

    // increase the round
    useEffect(() => {
        if(timesPressed === roundColors.length) {
            setRound(round + 1);
            return;
        }
    }, [timesPressed]);

    // game over
    useEffect(() => {

        if(!isGameOver && !isUserTurn) return;

        if(!isGameOver && isUserTurn) {
            setRound(1);
            setIsUserTurn(false);
            setRoundColors([]);
            setColorPressed('');
            return;
        }

        playGameOverSound();

    }, [isGameOver]);

    const redOpacity = (colorToBlink === 'red' || isUserTurn ? (isGameOver ? 0.3 : 1) : 0.5);
    const greenOpacity = (colorToBlink === 'green' || isUserTurn ? (isGameOver ? 0.3 : 1) : 0.5);
    const yellowOpacity = (colorToBlink === 'yellow' || isUserTurn ? (isGameOver ? 0.3 : 1) : 0.5);
    const blueOpacity = (colorToBlink === 'blue' || isUserTurn ? (isGameOver ? 0.3 : 1) : 0.5);

    if(!isGameOver) playSoundByColor(colorToBlink);

    return (
        <View style={styles.container}>

            <Title text={(isGameOver ? '' : (isUserTurn ? 'Sua Vez' : 'Observe'))} />

            <View style={[styles.centerCircle, { opacity: (isGameOver ? 0.3 : 1) }]} />

            <View style={styles.topBottomButton}>
                <TouchableOpacity onPressOut={() => setColorPressed('red')} disabled={!isUserTurn} >
                    <View style={[styles.geniusButton, styles.topLeftButton, styles.redButton, { opacity: redOpacity }]} />
                </TouchableOpacity>

                <TouchableOpacity onPressOut={() => setColorPressed('green')} disabled={!isUserTurn}>
                    <View style={[styles.geniusButton, styles.topRightButton, styles.greenButton, { opacity: greenOpacity }]} />
                </TouchableOpacity>
            </View>

            <View style={styles.topBottomButton}>
                <TouchableOpacity onPressOut={() => setColorPressed('yellow')} disabled={!isUserTurn}>
                    <View style={[styles.geniusButton, styles.bottomLeftButton, styles.yellowButton, { opacity: yellowOpacity }]} />
                </TouchableOpacity>

                <TouchableOpacity onPressOut={() => setColorPressed('blue')} disabled={!isUserTurn}>
                    <View style={[styles.geniusButton, styles.bottomRightButton, styles.blueButton, { opacity: blueOpacity }]} />
                </TouchableOpacity>
            </View>

            <Score currentRound={round} />

            {isGameOver ? (
                <View style={styles.restartContainer}>
                    <Text style={styles.restartTitle}>Game Over )=</Text>
                    <TouchableOpacity onPress={() => setIsGameOver(false)} style={styles.restartButton} >
                        <Text style={styles.restartButtonText}>Recomeçar</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View >
    );
};

export default Genius;