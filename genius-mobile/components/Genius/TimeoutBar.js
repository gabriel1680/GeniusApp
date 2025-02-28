import { NodeJSScheduler } from '@genius/engine';
import React, { useEffect, useState } from 'react';

import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Timer } from './Timer';

const INTERVAL = 50;

const timer = new Timer(new NodeJSScheduler(), INTERVAL);

/**
 * Timeout bar component
 *
 * @param {{ isPaused: boolean, millis: number }} param0 params
 * @returns {JSX.Element}
 */
export function TimeoutBar({ millis, isPaused = false }) {
    const [step, setStep] = useState(millis);

    useEffect(() => {
        if (!isPaused) {
            timer.start(() => setStep(prev => (prev -= INTERVAL)));
        } else {
            timer.pause();
        }
        return () => timer.stop();
    }, [isPaused]);

    return <ProgressBar step={step} steps={millis} />;
}
