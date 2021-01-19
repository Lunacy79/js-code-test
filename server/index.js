import Koa from "koa"
import Io from "socket.io"
import { createServer } from "http"
import sleep from "sleep-promise"
import uuid from "uuid/v4"
import moment from "moment"
import { orderBy } from "lodash"

const app = new Koa()
const server = createServer(app.callback())
const io = Io(server)

let completedTasks = []

let prioritizedUncompletedTasks = []

let uncompletedTasks = []

io.on("connection", (client) => {
  console.log("client connected")

  // send all tasks to the connected client
  client.emit(
    "all_tasks",
    orderBy(
      [...completedTasks, ...prioritizedUncompletedTasks, ...uncompletedTasks],
      ["created_at"],
      ["asc"]
    )
  )
  // accept newly created tasks
  client.on("sendTask", (task) => {
    // create id, timestamp and add isCompleted and completed_at
    const newTask = {
      ...task,
      id: uuid(),
      isCompleted: false,
      created_at: moment().toISOString(),
      completed_at: "null",
    }

    // add task to corresponding array
    newTask.isPriority
      ? prioritizedUncompletedTasks.push(newTask)
      : uncompletedTasks.push(newTask)

    // send message and tasks to all clients to show newly added tasks to everyone right away
    io.sockets.emit("broadcast", `New Task ${newTask.name} added`)
    io.sockets.emit(
      "all_tasks",
      orderBy(
        [
          ...completedTasks,
          ...prioritizedUncompletedTasks,
          ...uncompletedTasks,
        ],
        ["created_at"],
        ["asc"]
      )
    )
  })
})

async function run() {
  while (true) {
    // check tasks
    console.log("Checking tasks...")
    if (prioritizedUncompletedTasks.length > 0 || uncompletedTasks.length > 0) {
      const processedTask =
        prioritizedUncompletedTasks[0] || uncompletedTasks[0]

      if (processedTask) {
        // wait randomly generated time between 5 and ten seconds
        await sleep(Math.floor(Math.random() * (10000 - 5000) + 5000))

        // remove task from original array
        processedTask.isPriority
          ? prioritizedUncompletedTasks.shift()
          : uncompletedTasks.shift()

        // add task to completedTasks array with completed_at timestring
        completedTasks.push({
          ...processedTask,
          isCompleted: true,
          completed_at: moment().toISOString(),
        })

        // send message and tasks to all clients
        io.sockets.emit(
          "broadcast",
          `Task ${processedTask.name}: processing completed`
        )
        io.sockets.emit(
          "all_tasks",
          orderBy(
            [
              ...completedTasks,
              ...prioritizedUncompletedTasks,
              ...uncompletedTasks,
            ],
            ["created_at"],
            ["asc"]
          )
        )
      }
    } else {
      await sleep(1000)
    }
  }
}

// Launch server and runner
server.listen(4000)
console.log("Server listening on port 4000")
;(async function () {
  await run()
})()
