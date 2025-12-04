'use server'
import { pool } from '@/lib/db/db_connection'
import { z } from 'zod'
import { sql } from 'slonik'

export const signup = async(prevState: any, formData: FormData) => {
    // validate with zod 
}