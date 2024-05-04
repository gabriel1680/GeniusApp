export function sleep(ms: number = 100): Promise<void> {
    return new Promise(r => setTimeout(() => r(undefined), ms));
}

