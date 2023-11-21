module.exports = {
    preset: "react-native",
    testRegex: '.*\\.spec\\.js$',
    rootDir: '.',
    moduleNameMapper: {
        '^src(.*)$': '<rootDir>/src/$1',
        '^tests(.*)$': '<rootDir>/tests/$1',
    },
}