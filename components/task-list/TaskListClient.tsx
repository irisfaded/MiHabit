import React from 'react'
import TaskListHeader from './TaskListHeader'
import TaskList from './TaskList'
import CreateBigTaskForm from '../forms/CreateBigTaskForm'

function TaskListClient() {
  return (
    <>
      <TaskListHeader />
      <CreateBigTaskForm />
      <TaskList />
    </>
  )
}

export default TaskListClient
