export class SoundsRegistry {
    private static readonly _sounds: Map<string, number> = new Map();

    static has(key: string): boolean {
        return this._sounds.has(key);
    }

    static get(key: string) {
        return this._sounds.get(key);
    }

    static set(key: string, sound: number) {
        this._sounds.set(key, sound);
    }
}
