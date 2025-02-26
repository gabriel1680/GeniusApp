import { soundConfig } from '@/services/sound/soundCondifg';
import App from '../components/App';
import { SoundsRegistry } from '@/services/sound/Sounds';

function populateSoundsRegistry() {
    for (const [key, value] of Object.entries(soundConfig)) {
        SoundsRegistry.set(key, value);
    }
}

export default function HomeScreen() {
    populateSoundsRegistry();
    return <App />;
}
