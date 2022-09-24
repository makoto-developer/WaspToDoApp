import React from 'react'

import {useQuery} from '@wasp/queries'
import getTasks from '@wasp/queries/getTasks'
import createTask from '@wasp/actions/createTask'

const MainPage = () => {
  const { data: tasks, isFetching, error } = useQuery(getTasks)

  return (
      <div>
        <NewTaskForm />

        {tasks && <TasksList tasks={tasks} />}

        {isFetching && 'Fetching...'}
        {error && 'Error: ' + error}
      </div>
  )
}

const Task = (props) => {
  return (
      <div>
        <input
            type='checkbox' id={props.task.id}
            checked={props.task.isDone} readonly
        />
        {props.task.description}
      </div>
  )
}

const TasksList = (props) => {
  if (!props.tasks?.length) return 'No tasks'
  return props.tasks.map((task, idx) => <Task task={task} key={idx} />)
}

const NewTaskForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const description = event.target.description.value
      event.target.reset()
      await createTask({ description })
    } catch (err) {
      window.alert('Error: ' + err.message)
    }
  }

  return (
      <form onSubmit={handleSubmit}>
        <input
            name='description'
            type='text'
            defaultValue=''
        />
        <input type='submit' value='Create task' />
      </form>
  )
}

export default MainPage
