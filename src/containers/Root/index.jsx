import React, { useEffect, useState, useContext } from "react"
import { Container } from "react-bootstrap"
import Message from "components/Message"
import Inputform from "components/Inputform"
import List from "components/List"
import TasksContext from "../withSocket"

const Root = (props) => {
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState("")

  const taskState = useContext(TasksContext)

  useEffect(() => {
    taskState.allTasks((allTasks) => setTasks(allTasks))
    taskState.message((message) => setMessage(message))
  }, [])

  return (
    <TasksContext.Provider>
      <Container>
        <Message message={message} />
        <Inputform taskState={taskState} />
        <List tasks={tasks} />
      </Container>
    </TasksContext.Provider>
  )
}

export default Root
