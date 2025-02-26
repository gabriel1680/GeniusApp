import { Clock } from '@genius/engine';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
    const [intervalId, setIntervalId] = useState(undefined);

    function createInterval() {
        const countingRatio = 100;
        const interval = setInterval(() => {
            if (step === 0 || isPaused) {
                clearInterval(interval || intervalId);
                return;
            }
            setStep(prev => (prev -= countingRatio));
        }, countingRatio);
        return interval;
    }

    useEffect(() => {
        if (isPaused) {
            intervalId && clearInterval(intervalId);
        } else {
            const interval = createInterval();
            setIntervalId(interval);
            return () => intervalId && clearInterval(intervalId);
        }
    }, [isPaused]);

    return <ProgressBar step={step} steps={millis} />;
}
