export type TaskListSchema = Array<{
  big_task_id: number
  content: string
  is_done: boolean
  smallTasks: Array<{ small_task_id: number; content: string; is_done: boolean }>
}>