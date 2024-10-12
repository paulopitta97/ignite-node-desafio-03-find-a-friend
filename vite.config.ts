import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    coverage: {
      reporter: ['text', 'json', 'html'], // Tipos de relatórios desejados
      exclude: ['node_modules/', 'dist/'], // Excluir arquivos que não devem ser testados
    },
  },
})
