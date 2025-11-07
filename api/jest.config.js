/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    clearMocks: true,
    verbose: true,

    // 1️⃣  Carga de entorno antes de correr los tests
    setupFiles: ['<rootDir>/jest.setup.ts'],

    // 2️⃣  Si usas imports absolutos (por ejemplo import X from "@/utils/X")
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    // 3️⃣  Asegura compatibilidad total con ESModules si usas "type": "module"
    transform: {
        '^.+\\.ts?$': [
            'ts-jest',
            {
                useESM: false,
                diagnostics: {
                    warnOnly: true,
                },
            },
        ],
    },
};
