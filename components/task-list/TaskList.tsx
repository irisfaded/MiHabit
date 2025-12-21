'use client'
import React, { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
import BigTask from './BigTask'
import SmallTask from './SmallTask'
import { TaskListSchema } from '@/lib/types/taskListSchema'


function TaskList({ taskList }: { taskList: TaskListSchema }) {
  const [tasks, setTasks] = useState<TaskListSchema>(taskList)
  const [groupOrder, setGroupOrder] = useState(() => {
    const groupOrderArray: Array<string> = []
    for(let bigTask of tasks) {
      groupOrderArray.push(bigTask.big_task_id.toString())
    }
    return groupOrderArray
  })
  console.log(groupOrder)
  console.log(tasks)
  return (
    <DragDropProvider
      onDragOver={(event) => {
        const { source, target } = event.operation

        if (source?.type === 'bigTask') return

        setTasks((tasks: any): any => move(tasks, event))
      }}
      onDragEnd={(event) => {
        const { source, target } = event.operation
        if (source == null) return
        if (event.canceled || source.type !== 'smallTask') return

        setGroupOrder((groups:any):any => move(groups, event))
      }}
    >
      <div>
        {groupOrder.map((group, groupIndex) => (
          <BigTask key={group} id={group} index={groupIndex} content={tasks[groupIndex].content} isDone={tasks[groupIndex].is_done}>
            {tasks[groupIndex].smallTasks.map((smallTask, index) => (
              <SmallTask key={smallTask.small_task_id.toString()} id={smallTask.small_task_id.toString()} index={index} group={group} content={smallTask.content} isDone={smallTask.is_done} />
            ))}
          </BigTask>
        ))}
      </div>
    </DragDropProvider>
  )
}

export default TaskList
