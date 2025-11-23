'use client'
import React, { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'
import {CollisionPriority} from '@dnd-kit/abstract';

function BigTask({children, id, index}:{children: ReactNode, id: string, index: number}) {
  const { ref } = useSortable({ id, index, type: 'bigTask', collisionPriority: CollisionPriority.Low, accept: ['smallTask', 'bigTask'] })

  return <div ref={ref} className="bg-gray-500 p-4 m-2 min-h-20"> Big Task {id}
    <div>
      {children}
    </div>
  
    
  
  </div>
}

export default BigTask
