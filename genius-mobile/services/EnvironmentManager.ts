export enum Environment {
    PROD = 'prod',
    DEV = 'dev',
}

export default class EnvironmentManager {
    private static env: Environment;

    static setEnv(env: Environment) {
        this.env = env;
    }

    static get isDev(): boolean {
        return this.env === Environment.DEV;
    }

    static get isProd(): boolean {
        return this.env === Environment.PROD;
    }
}
