'use client'
import React, { useActionState, useEffect, useState } from 'react'
import { createBigTask } from '../../lib/actions/task-list'

const initialState = {
  message: '',
  success: false
}

function CreateBigTaskForm() {
  const [state, formAction, isPending] = useActionState(createBigTask, initialState)
  const [bigTask, setBigTask] = useState<string>('')
  useEffect(() => {
    if(state.success) {
      setBigTask(() => '')
    }
    console.log(state)
    }, [state])
  return (
    <form action={formAction}>
      <input type="text" name="bigTask" value={bigTask} onChange={e => setBigTask(e.target.value)} placeholder="Create your next task" />
      <button type="submit" className='cursor-pointer' disabled={isPending}>Create Big Task</button>
    </form>
  )
}

export default CreateBigTaskForm
