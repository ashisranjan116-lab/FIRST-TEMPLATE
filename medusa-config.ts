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