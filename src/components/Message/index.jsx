import React from "react"
import { Alert, Row } from "react-bootstrap"

/**
 * Displays a message sent by server
 *
 * @param {string} props.message
 */
const Message = (props) => {
  return (
    <div>
      {props.message.length > 0 ? (
        <Row className="mt-5 mb-5">
          <Alert variant="info" className="position-absolute">
            {props.message}
          </Alert>
        </Row>
      ) : (
        <Row className="mt-5 mb-5"></Row>
      )}
    </div>
  )
}

export default Message
