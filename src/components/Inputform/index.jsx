import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"

/**
 * Form for entering a taskname and deciding about prioritisation
 *
 * @param {function} props.taskState
 */
const Inputform = (props) => {
  const [name, setName] = useState("")
  const [priority, setPriority] = useState(false)

  const handleSubmit = () => {
    props.taskState.sendTask(name, priority)
    setName("")
    setPriority(false)
  }

  return (
    <Form onSubmit={handleSubmit} className="w-50 mt-5">
      <Form.Group>
        <Form.Label>Taskname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter taskname"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          type="checkbox"
          label="Process with priority"
          checked={priority}
          onChange={() => setPriority(!priority)}
        />
      </Form.Group>
      <Button className="mb-3" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Inputform
