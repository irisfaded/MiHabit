import React from 'react'
import TaskListHeader from './TaskListHeader'
import TaskList from './TaskList'
import CreateBigTaskForm from '../forms/CreateBigTaskForm'
import { getBigTasks } from '@/lib/actions/task-list'
import { pool, sql } from '@/lib/db/db_connection'
import z from 'zod'
import { headers } from 'next/headers'
import { TaskListSchema } from '@/lib/types/taskListType'

async function TaskListClient() {
  const requestHeaders = await headers()
  const userId = requestHeaders.get('user-id')
  console.log(userId)
  // get user data from database
  const bigTasks = await pool.many(
    sql.type(
      z.object({ id: z.number(), content: z.string(), is_done: z.boolean() })
    )`SELECT id, content, is_done FROM big_tasks WHERE user_id=${userId}`
  )
  const smallTasks = await pool.many(
    sql.type(
      z.object({ id: z.number(), big_task_id: z.number(), content: z.string(), is_done: z.boolean() })
    )`select st.id, st.big_task_id, st.content, st.is_done from small_tasks st join big_tasks bt on st.big_task_id = bt.id;`
  )
  console.log(bigTasks)
  console.log(smallTasks)
  // sort user data into one tasks array
  let tasks = [] as TaskListSchema
  // sorting
  for (let bigTask of bigTasks) {
    let bigTaskObject = {
      big_task_id: bigTask.id,
      content: bigTask.content,
      is_done: bigTask.is_done,
      smallTasks: [] as Array<{ small_task_id: number; content: string; is_done: boolean }>
    }
    for (let smallTask of smallTasks) {
      if (smallTask.big_task_id === bigTask.id) {
        bigTaskObject.smallTasks.push({ small_task_id: smallTask.id, content: smallTask.content, is_done: smallTask.is_done })
      }
    }
    // pushing bigTask with
    tasks.push(bigTaskObject)
  }
  console.log(tasks)
  return (
    <>
      <TaskListHeader />
      <CreateBigTaskForm />
      <TaskList taskList={tasks} />
    </>
  )
}

export default TaskListClient
