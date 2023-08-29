import classNames from "classnames";
import { AnimationControls, motion } from "framer-motion"

interface Props extends React.PropsWithChildren<JSX.IntrinsicElements['div']> {
  controls: AnimationControls
  frontComponent: JSX.Element
  backComponent: JSX.Element
}

export const AnimatedCard = ({
  controls,
  frontComponent,
  backComponent,
  ...props
}: Props) => {

  return (
    <div
      className={classNames("flex items-center justify-center", props.className)}
      {...props}
    >
      <motion.div
        animate={controls}
        initial={{ rotateX: 0, rotateZ: 0 }}
        className="w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="absolute w-full h-full bg-white flex items-center justify-center shadow-2xl shadow-gray-200 rounded-md border border-gray-100"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontComponent}
        </motion.div>
        <motion.div
          className="absolute w-full h-full bg-white flex items-center justify-center shadow-2xl shadow-gray-200 rounded-md border border-gray-100"
          style={{ backfaceVisibility: 'hidden', rotateX: 180 }}
        >
          {backComponent}
        </motion.div>
      </motion.div>
    </div>
  )
}