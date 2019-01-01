import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Modali extends Component {

  render() {
    const {isOpen, toggle,children, title, footer} = this.props
    const {action, actionText} = footer
    const showActionButtons = (action)?true:false
    
    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle} className={this.props.className}>
          <ModalHeader toggle={toggle}>{title || "Modal title"}</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            {showActionButtons && <div>
              <Button color="primary" onClick={footer.action}>{actionText}</Button>{' '}
              {<Button color="secondary" onClick={toggle}>Cancel</Button>}
              </div>}
            {showActionButtons || <Button color="secondary" onClick={toggle}>Close</Button>}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Modali