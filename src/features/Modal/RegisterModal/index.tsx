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
  onRegister: (email: string, password: string, nickname: string) => void
}

const RegisterScheema = Yup.object().shape({
  email: Yup.string().required("入力必須です"),
  password: Yup.string().required("入力必須です").min(8, "最低8文字以上入力してください"),
  nickname: Yup.string().required("入力必須です")
})

export const RegisterModal = ({ isOpen, submitting, onClose, onRegister }: Props) => {

  const formik = useFormik({
    initialValues: { email: "", password: "", nickname: "" },
    validationSchema: RegisterScheema,
    onSubmit: values => {
      if (values.email && values.password) {
        onRegister(values.email, values.password, values.nickname)
      }
    }
  })

  return (
    <Modal
      isOpen={isOpen}
      headerText="登録"
      footer={{
        cancelButton: { text: 'キャンセル'},
        submitButton: { text: '登録する', submitting }
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
        <div className="mt-4">
          <FormLabel required htmlFor="nickname">ニックネーム</FormLabel>
          <TextField
            id="nickname"
            name="nickname"
            type="text"
            value={formik.values.nickname}
            onChange={formik.handleChange}
            className="h-10 px-4 rounded-md w-96 border border-slate-300"
          />
          <ErrorMessage text={formik.errors.nickname} />
        </div>
      </div>
    </Modal>
  )
}