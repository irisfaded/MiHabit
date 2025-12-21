'use client'

import { useSortable } from '@dnd-kit/react/sortable'
import React from 'react'

function SmallTask({
  id,
  index,
  group,
  content,
  isDone
}: {
  id: string
  index: number
  group: string
  content: string
  isDone: boolean
}) {
  const { ref, isDragging } = useSortable({ id, index, type: 'smallTask', accept: 'smallTask', group: group })
  return (
    <div ref={ref} data-dragging={isDragging} className="bg-green-400">
      SmallTask {id}
      <p> {content} </p>
    </div>
  )
}

export default SmallTask
