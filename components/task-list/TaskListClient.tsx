import React from 'react'
import TaskListHeader from './TaskListHeader'
import TaskList from './TaskList'
import CreateBigTaskForm from '../forms/CreateBigTaskForm'
import { getBigTasks } from '@/lib/actions/task-list'
import { pool, sql } from '@/lib/db/db_connection'
import z from 'zod'
import { headers } from 'next/headers'

interface BigTaskSchema {
  id: number
  user_id: number
  content: string
  is_done: boolean
}

async function TaskListClient() {
  const requestHeaders = await headers()
  const userId = requestHeaders.get('user-id')
  console.log(userId)
  const bigTasks: readonly BigTaskSchema[] = await pool.many(
    sql.type(
      z.object({ id: z.number(), user_id: z.number(), content: z.string(), is_done: z.boolean() })
    )`SELECT * FROM big_tasks WHERE user_id=${userId}`
  )
  console.log(bigTasks)
  return (
    <>
      <TaskListHeader />
      <CreateBigTaskForm />
      <TaskList />
    </>
  )
}

export default TaskListClient
