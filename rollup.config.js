import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'

const getConfig = () => (
    defineConfig({
        input: 'src/index.ts',
        output: [
            {
                file: 'build/index.js',
                format: 'cjs',
                sourcemap: true,
            },
        ],
        plugins: [
            typescript({
                clean: true,
            }),
        ]
    })
)

export default getConfig