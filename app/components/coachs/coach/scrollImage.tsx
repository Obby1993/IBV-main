// Assurez-vous d'importer les modules nécessaires
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ScrollImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

const ScrollImage = ({ src, alt, className, style }: ScrollImageProps) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false, // L'animation ne se déclenchera qu'une seule fois
    threshold: 0.1, // La proportion de l'élément visible pour déclencher l'animation
  });


  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      style={style}
      initial="hidden"
      animate={controls}
      variants={variants}
    />
  );
};

export default ScrollImage;
