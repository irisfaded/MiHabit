import { createPool } from 'slonik'
import { createPgDriverFactory } from '@slonik/pg-driver'
import { env } from 'node:process';

export const pool = await createPool(env.DATABASE_URI!, { driverFactory: createPgDriverFactory() })

console.log(pool.state());