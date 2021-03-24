import React, { useState } from 'react'
import { Button, Icon, Confirm } from 'semantic-ui-react'

import NewPopup from '../util/NewPopup'

const DeleteButton = ({ content, onDelete }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <NewPopup content={content}>
        <Button
          as='div'
          color='red'
          floated='right'
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name='trash' style={{ margin: 0 }} />
        </Button>
      </NewPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
            onDelete();
            setConfirmOpen(false);
        }}
      />
    </>
  )
}



export default DeleteButton;
