import { FormLabel } from "@/components/FormLabel"
import { Modal } from "@/components/Modal"
import { TextField } from "@/components/TextField"
import { useState } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
}

export const LoginModal = ({ isOpen, onClose, onLogin }: Props) => {

  const [formEmail, setFormEmail] = useState<string>('')
  const [formPassword, setFormPassword] = useState<string>('')

  return (
    <Modal
      isOpen={isOpen}
      headerText="Login with e-mail"
      footer={{
        cancelButton: { text: 'Cancel', onClick: onClose},
        submitButton: { text: 'Login', onClick: () => onLogin(formEmail, formPassword)}
      }}
      onClose={() => onClose()}
    >
      <div>
        <FormLabel required>E-mail</FormLabel>
        <div>
          <TextField
            value={formEmail}
            className="h-10 px-4 rounded-md w-96 border border-slate-300"
            onChange={e => setFormEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <FormLabel required>Password</FormLabel>
        <div>
          <TextField
            type="password"
            value={formPassword}
            className="h-10 px-4 rounded-md w-96 border border-slate-300"
            onChange={e => setFormPassword(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  )
}