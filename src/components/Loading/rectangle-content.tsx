import classNames from 'classnames';
import { motion } from 'framer-motion';

interface Props {
  wrapperClassName?: string
  lightClassName?: string
}

export const LoadingRectangleContent = ({ wrapperClassName, lightClassName }: Props) => {
  return (
    <div
      className={classNames("relative w-full h-8 rounded-lg bg-gray-200 overflow-hidden shadow-lg shadow-gray-100", wrapperClassName)}
    >
      <motion.div
        className={classNames("absolute h-8 bg-gradient-to-r from-transparent via-white to-transparent w-32", lightClassName)}
        initial={{ left: 0, opacity: 1 }}
        animate={{ left: "100%", opacity: 0 }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          repeatDelay: 1,
          ease: "easeOut"
        }}
      ></motion.div>
    </div>
  );
}