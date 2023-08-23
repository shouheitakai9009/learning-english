import classNames from 'classnames'
import ReactModal from 'react-modal'
import { Icon } from '../Icon'
import { PropsWithChildren } from 'react'
import { Button } from '../Button'

interface Props extends PropsWithChildren {
  isOpen: boolean
  headerText?: string
  footer?: {
    cancelButton?: { text: string, onClick: () => void },
    submitButton?: { text: string, onClick: () => void },
  }
  className?: string
  onClose: () => void
}

export const Modal = ({ isOpen, headerText, footer, className, onClose, children }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      style={{ overlay: { background: "rgba(0,0,0,.5)" }}}
      className={classNames("rounded-lg bg-white absolute top-1/2 left-1/2 right-auto bottom-auto mr-[-50%] translate-x-[-50%] translate-y-[-50%]", className)}
      onRequestClose={onClose}
    >
      <div>
        <section className="flex justify-between items-center border-b border-gray-200 px-6 h-14">
          <p className="font-bold text-xl">{headerText}</p>
          <Icon
            name="x-mark"
            className="[&_*]:w-8 [&_*]:h-8 [&_*]:hover:stroke-orange-500 cursor-pointer"
            onClick={onClose}
          />
        </section>
        <section className='px-6 py-8'>
          {children}
        </section>
        {footer && (
          <section className="flex justify-end items-center border-t border-gray-200 px-6 h-20">
            {footer.cancelButton && (
              <Button
                outline
                className='mr-2'
                onClick={footer.cancelButton.onClick}
              >
                {footer.cancelButton.text}
              </Button>
            )}
            {footer.submitButton && (
              <Button onClick={footer.submitButton.onClick}>
                {footer.submitButton.text}
              </Button>
            )}
          </section>
        )}
      </div>
    </ReactModal>
  )
}