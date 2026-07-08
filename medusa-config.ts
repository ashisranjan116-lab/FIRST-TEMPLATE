import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
      // THESE TWO LINES ARE THE FIX:
      // They force Medusa to use Render's network instead of defaulting to 9000
      host: process.env.HOST || "0.0.0.0",
      port: process.env.PORT ? parseInt(process.env.PORT) : 9000,
    }
  },
  // This absolutely guarantees the admin is disabled on Render
  // while still keeping it active when you work locally on your computer.
  admin: {
    disable: process.env.NODE_ENV === 'production',
  },
  modules: [
    {
      resolve: '@medusajs/medusa/cache-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    {
      resolve: '@medusajs/medusa/event-bus-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
  ],
})