import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0', // Importante para não ter problemas de conexão
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
