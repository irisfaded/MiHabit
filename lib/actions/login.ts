'use server'
import { pool } from '@/lib/db/db_connection'
import { z } from 'zod'
import { sql } from 'slonik'

export const login = async(prevState: any, formData: FormData) => {
    // login logic here
    return { success: true, message: ''}
}