import { FormLabel } from "@/components/FormLabel"
import { Modal } from "@/components/Modal"
import { TextField } from "@/components/TextField"
import { useState } from "react"

interface Props {
  isOpen: boolean
  submitting: boolean
  onClose: () => void
  onRegister: () => void
}

export const RegisterModal = ({ isOpen, submitting, onClose, onRegister }: Props) => {

  const [formNickname, setFormNickname] = useState<string>('')
  const [formEmail, setFormEmail] = useState<string>('')
  const [formPassword, setFormPassword] = useState<string>('')

  return (
    <Modal
      isOpen={isOpen}
      headerText="登録"
      footer={{
        cancelButton: { text: 'キャンセル', onClick: onClose},
        submitButton: { text: '新規登録する', submitting, onClick: onRegister}
      }}
      onClose={() => onClose()}
    >
      <div>
        <FormLabel required>メールアドレス</FormLabel>
        <div>
          <TextField
            value={formEmail}
            className="h-10 px-4 rounded-md w-96 border border-slate-300"
            onChange={e => setFormEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <FormLabel required>パスワード</FormLabel>
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
        <FormLabel required>ニックネーム</FormLabel>
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