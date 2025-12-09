'use server'
import { pool } from '@/lib/db/db_connection'
import { z } from 'zod'
import { sql } from 'slonik'

export const createBigTask = async (prevState: any, formData: FormData) => {
  const content = formData.get('bigTask') as string
  const userId = 1 // test user id
  console.log(content)
  try {
    const result = await pool.one(sql.type(
      z.object({ id: z.number() }) // specifies the return datatype
    )`INSERT INTO big_tasks (user_id, content) 
    VALUES (${userId}, ${content}) 
    RETURNING id;`) // returns of id of inserted task
    console.log(result)
    return { success: true, message: result.id }
  } catch (error) {
    console.log(error)
    return { success: false, message: error }
  }
}


// schema for just one row, don't need z.array() wrapper. z types correspond to database types
const BigTaskSchema = z.object({
  user_id: z.number(),
  id: z.number(),
  content: z.string(),
  is_done: z.boolean(),
})

export const getBigTasks = async() => {
  const userId = 1; // placeholder
  try {
    const result = await pool.query(sql.type(BigTaskSchema)` SELECT * FROM big_tasks WHERE user_id = ${userId};`)
    // use line below if suspected data from database might not match zod types
    // const validatedRows = result.rows.map(row => BigTaskSchema.parse(row))
    return { success: true, message: result.rows}
    
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}
