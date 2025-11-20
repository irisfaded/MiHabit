import { createPool } from 'slonik'
import { createPgDriverFactory } from '@slonik/pg-driver'

export const pool = await createPool(process.env.DATABASE_URI, { driverFactory: createPgDriverFactory() })

console.log(pool.state());