'use client'
import React, { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import {CollisionPriority} from '@dnd-kit/abstract';

function BigTask({children, id, index, content, isDone}:{children: ReactNode, id: string, index: number, content: string, isDone: boolean}) {
  const { ref } = useSortable({ id, index, type: 'bigTask', collisionPriority: CollisionPriority.Low, accept: ['smallTask', 'bigTask'] })

  return <div ref={ref} className="bg-gray-500 p-6 m-2 min-h-20"> Big Task {id}
  <p> {content} </p>
    <div className='min-h-0.5 min-w-0.5'>
      {children}
    </div>
  
    
  
  </div>
}

export default BigTask
