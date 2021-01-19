import React from "react"
import { ListGroup } from "react-bootstrap"

import Spinner from "components/Spinner"

/**
 * A single task in the list
 *
 * @param {Object} props.task
 */
const ListItem = (props) => {
  return (
    <ListGroup.Item
      style={{ backgroundColor: props.task.isPriority ? "grey" : "#fff" }}
    >
      {props.task.name}
      {!props.task.isCompleted && <Spinner className="ml-2" />}
    </ListGroup.Item>
  )
}

export default ListItem
