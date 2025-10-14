import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().nullable().default("5432").transform(Number),
  APP_PORT: z.string().nullable().default("3000").transform(Number),
  LOKI_URL: z.url(),
})

const env = envSchema.parse(process.env)

export { env }