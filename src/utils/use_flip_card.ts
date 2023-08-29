import { useAnimation } from 'framer-motion';
import { useCallback, useState } from 'react';

export const useFlipCard = () => {
  const controls = useAnimation();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleRotate = useCallback(async () => {
    if (isFlipped) {
      await controls.start({
        rotateX: 0,
        rotateZ: 0,
        transition: { duration: 0.5 }
      });
      setIsFlipped(false);
    } else {
      await controls.start({
        rotateX: 180,
        rotateZ: 0,
        transition: { duration: 0.5 }
      });
      setIsFlipped(true);
    }
  }, [controls, isFlipped]);

  return {
    controls,
    isFlipped,
    setIsFlipped,
    handleRotate
  }
}