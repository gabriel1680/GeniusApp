import React, { useState, useEffect } from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';

/**
 * Timeout bar component
 *
 * @param {{ millis: number }} param0 params
 * @returns {JSX.Element}
 */
export function TimeoutBar({ millis }) {
    const [step, setStep] = useState(millis);

    useEffect(() => {
        const countingRatio = 100;
        const intervalId = setInterval(() => {
            if (step === 0) {
                return;
            }
            setStep(prev => (prev -= countingRatio));
        }, countingRatio);

        return () => clearInterval(intervalId);
    }, []);

    return <ProgressBar step={step} steps={millis} />;
}
