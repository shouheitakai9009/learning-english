import { FormLabel } from "@/components/FormLabel"
import { Modal } from "@/components/Modal"
import { TextField } from "@/components/TextField"
import { useState } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
  onRegister: () => void
}

export const RegisterModal = ({ isOpen, onClose, onRegister }: Props) => {

  const [formNickname, setFormNickname] = useState<string>('')
  const [formEmail, setFormEmail] = useState<string>('')
  const [formPassword, setFormPassword] = useState<string>('')

  return (
    <Modal
      isOpen={isOpen}
      headerText="Register new member"
      footer={{
        cancelButton: { text: 'Cancel', onClick: onClose},
        submitButton: { text: 'Registration', onClick: onRegister}
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
      <div className="mt-4">
        <FormLabel required>Nickname</FormLabel>
        <div>
          <TextField
            value={formNickname}
            className="h-10 px-4 rounded-md w-96 border border-slate-300"
            onChange={e => setFormNickname(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  )
}