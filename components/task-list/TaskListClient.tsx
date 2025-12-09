import React from 'react'
import TaskListHeader from './TaskListHeader'
import TaskList from './TaskList'
import CreateBigTaskForm from '../forms/CreateBigTaskForm'
import { getBigTasks } from '@/lib/actions/task-list'

async function TaskListClient() {
  const tasks = await getBigTasks();
  return (
    <>
      <TaskListHeader />
      <CreateBigTaskForm />
      <TaskList />
    </>
  )
}

export default TaskListClient
