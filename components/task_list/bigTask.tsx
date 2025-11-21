'use client'
import React from 'react'
import { useSortable } from '@dnd-kit/react/sortable'

function BigTask({id, index}:{id: number, index: number}) {
  const { ref } = useSortable({ id, index })

  return <div ref={ref} className="bg-gray-500 p-4 m-2"> Big Task {id}</div>
}

export default BigTask
