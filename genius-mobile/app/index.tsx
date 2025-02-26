import { soundConfig } from '@/services/sound/soundCondifg';
import App from '../components/App';
import { SoundsRegistry } from '@/services/sound/Sounds';
import EnvironmentManager, { Environment } from '@/services/EnvironmentManager';

function populateSoundsRegistry() {
    for (const [key, value] of Object.entries(soundConfig)) {
        SoundsRegistry.set(key, value);
    }
}

function setEnv() {
    const env = process.env.APP_ENV;
    console.log(env)
    EnvironmentManager.setEnv((env as Environment) || Environment.DEV);
}

function configureApp() {
    populateSoundsRegistry();
    setEnv();
}

export default function HomeScreen() {
    configureApp();
    return <App />;
}
