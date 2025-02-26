import { Sound } from 'expo-av/build/Audio';

import { SoundsRegistry } from './Sounds';

export default class SoundPlayer {
    async playFor(key?: string) {
        if (!key || !SoundsRegistry.has(key)) return;
        const sound = SoundsRegistry.get(key);
        const avSound = await Sound.createAsync(sound!);
        await avSound.sound.setVolumeAsync(1);
        await avSound.sound.playAsync();
    }
}
