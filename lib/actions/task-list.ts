'use server'
import { pool } from '@/lib/db/db_connection'

export const createBigTask = async(prevState: any, formData: FormData) => {
    console.log("creating big task"+formData.get('bigTask'))
    // checks if pool is connected, just testing
    await pool.connect(() => {
        console.log(pool.state());
        return pool.end()
    })
    return { message: "passed!", success: true }
}