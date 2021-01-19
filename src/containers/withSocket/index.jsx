import React from "react"
import io from "socket.io-client"

const socket = io("http://localhost:4000")

const TasksContext = React.createContext({
  allTasks: (getTasks) => {
    socket.on("all_tasks", (allTasks) => getTasks(allTasks))
  },
  sendTask: (name, priority) => {
    socket.emit("sendTask", {
      name: name,
      isPriority: priority,
    })
  },
  message: (getMessage) => {
    socket.on("broadcast", (message) => getMessage(message))
  },
})

export default TasksContext
