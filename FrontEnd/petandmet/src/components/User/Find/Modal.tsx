import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function AlertDialog(props: any) {
  const [open, setOpen] = React.useState(true)

  const { closeModal } = props

  const handleClose = () => {
    setOpen(false)
    closeModal()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'아이디 찾기'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            잃어버린 아이디는 a81828**** 입니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
