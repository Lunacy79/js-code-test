import React, { useState } from "react"
import { ListGroup, Form } from "react-bootstrap"
import { orderBy } from "lodash"
import ListItem from "components/ListItem"

/**
 * List for displaying the entered tasks
 *
 * @param {Object[]} props.tasks
 */
const List = (props) => {
  const [sort, setSort] = useState(false)

  const getTasks = (tasks) => {
    const list = sort ? orderBy(tasks, ["completed_at"]) : tasks

    return list.map((task) => {
      return <ListItem key={task.id} task={task} />
    })
  }

  return (
    <>
      <Form.Check
        label="Sort by process time"
        checked={sort}
        onChange={() => setSort(!sort)}
      />
      <ListGroup className="w-50">{getTasks(props.tasks)}</ListGroup>
    </>
  )
}

export default List
