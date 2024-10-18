import { Button, Group, Modal } from '@mantine/core'
import React from 'react'

const ConfirmModal = ({opened,close, handleAction}) => {

  return (
    <>
    <Modal opened={opened} onClose={close} title="Confirm" centered>
      <h3>Confirm action</h3>
      <Group mt="xl">
          <Button onClick={handleAction}>Ok</Button>
          <Button onClick={close}>Cancel</Button>
        </Group>
    </Modal>
  </>
  )
}

export default ConfirmModal