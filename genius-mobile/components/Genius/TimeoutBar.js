import React, { useState, useEffect, createContext, useContext } from 'react';
import { Clock } from '@genius/engine';

import { ProgressBar } from '../ProgressBar/ProgressBar';

const ClockContext = createContext();

/**
 * ClockContext wrapper hook
 *
 * @returns {{ isPaused: true, setPause: (pause: boolean) => void }}
 */
function useClockContext() {
    const ctx = useContext(ClockContext);
    if (!ctx) {
        throw new Error('ClockContext is not available');
    }
    return ctx;
}

const clock = new Clock();

function ClockProvider({ children }) {
    const [isPaused, setIsPaused] = useState(clock.isPaused);

    const setPause = () => {
        clock.togglePause();
        setIsPaused(clock.isPaused);
    };

    return (
        <ClockContext.Provider value={{ isPaused, setPause }}>
            {children}
        </ClockContext.Provider>
    );
}

/**
 * Timeout bar component
 *
 * @param {{ isPaused: boolean, millis: number }} param0 params
 * @returns {JSX.Element}
 */
export function TimeoutBar({ millis, isPaused = false }) {
    const [step, setStep] = useState(millis);
    const [pause, setPause] = useState(isPaused);

    // TODO: Fix bug, when pause game, this timer continues to clock down.
    // Maybe add a context with clock global state.
    useEffect(() => {
        const countingRatio = 100;
        const intervalId = setInterval(() => {
            if (step === 0 || pause) {
                return;
            }
            setStep(prev => (prev -= countingRatio));
        }, countingRatio);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setPause(isPaused);
    }, [isPaused]);

    return <ProgressBar step={step} steps={millis} />;
}
