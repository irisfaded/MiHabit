'use client'

import { useSortable } from '@dnd-kit/react/sortable'
import React from 'react'

function SmallTask({ id, index, group }: {id: number, index: number, group: string}) {
  const { ref, isDragging } = useSortable({ id, index, type: 'smallTask', accept: 'smallTask', group: group })
  return (
    <div ref={ref} data-dragging={isDragging} className='bg-green-400'>SmallTask {id} </div>
  )
}

export default SmallTask