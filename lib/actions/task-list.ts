'use server'
import { pool } from '@/lib/db/db_connection'
import { z } from 'zod'
import { sql } from 'slonik'

export const createBigTask = async (prevState: any, formData: FormData) => {
  const content = formData.get('bigTask') as string
  const user_id = 1 // test user id
  console.log(content)
  try {
    const result = await pool.one(sql.type(
      z.object({ id: z.number() }) // specifies the return datatype
    )`INSERT INTO big_tasks (user_id, content) 
    VALUES (${user_id}, '${content}') 
    RETURNING id;`) // returns of id of inserted task
    console.log(result)
    return { success: true, message: result.id }
  } catch (error) {
    console.log(error)
    return { success: false, message: error }
  }
}
