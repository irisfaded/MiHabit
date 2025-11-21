'use client'
import React, { useState } from 'react'
import BigTask from './bigTask'


function Todo() {
  const items = [1, 2, 3, 4]
  return (
    <div>
      {items.map((id, index) => 
        <BigTask key={id} id={id} index={index}/>
      )}
    </div>
  )
}

export default Todo
