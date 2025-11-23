'use client'
import React, { useState } from 'react'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers'
import BigTask from './BigTask'
import SmallTask from './SmallTask'

type TasksState = Record<string, number[]>
function TaskList() {
  const [tasks, setTasks] = useState<TasksState>({
    bt1: [1, 2, 3],
    bt2: [4, 5],
    bt3: []
  })

  const [groupOrder, setGroupOrder] = useState(() => Object.keys(tasks))
  return (

      <DragDropProvider
        onDragOver={(event) => {
          const { source, target } = event.operation

          if (source?.type === 'bigTask') return

          setTasks((tasks) => move(tasks, event))
        }}
        onDragEnd={(event) => {
          const { source, target } = event.operation
          if (source == null) return
          if (event.canceled || source.type !== 'column') return

          setGroupOrder((groups) => move(groups, event))
        }}
      >
        <div>
          {groupOrder.map((group, groupIndex) => (
            <BigTask key={group} id={group} index={groupIndex}>
              {tasks[group].map((id, index) => (
                <SmallTask key={id} id={id} index={index} group={group} />
              ))}
            </BigTask>
          ))}
        </div>
      </DragDropProvider>
  )
}

export default TaskList
