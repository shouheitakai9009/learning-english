import { ErrorMessage } from "@/components/ErrorMessage"
import { FormLabel } from "@/components/FormLabel"
import { Modal } from "@/components/Modal"
import { TextField } from "@/components/TextField"
import { useFormik } from "formik"
import * as Yup from 'yup'

interface Props {
  isOpen: boolean
  submitting: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
}

const LoginScheema = Yup.object().shape({
  email: Yup.string().required("入力必須です"),
  password: Yup.string().required("入力必須です").min(8, "最低8文字以上入力してください"),
})

export const LoginModal = ({ isOpen, submitting, onClose, onLogin }: Props) => {

  const formik = useFormik({
    initialValues: { email: "nana7.yu@gmail.com", password: "Asilasil2" },
    validationSchema: LoginScheema,
    onSubmit: values => {
      if (values.email && values.password) {
        onLogin(values.email, values.password)
      }
    }
  })

  return (
    <Modal
      isOpen={isOpen}
      headerText="ログイン"
      footer={{
        cancelButton: { text: 'キャンセル'},
        submitButton: { text: 'ログインする', submitting }
      }}
      onClose={() => onClose()}
      onSubmit={formik.handleSubmit}
    >
      <div>
        <div>
          <FormLabel required htmlFor="email">メールアドレス</FormLabel>
          <TextField
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="h-10 px-4 rounded-md w-96 border border-slate-300"
          />
          <ErrorMessage text={formik.errors.email} />
        </div>
        <div className="mt-4">
          <FormLabel required htmlFor="password">パスワード</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="h-10 px-4 rounded-md w-96 border border-slate-300"
          />
          <ErrorMessage text={formik.errors.password} />
        </div>
      </div>
    </Modal>
  )
}