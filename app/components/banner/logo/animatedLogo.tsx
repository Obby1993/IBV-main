// components/ScrollImage.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ScrollImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  
}

const ScrollImage: React.FC<ScrollImageProps> = ({ src, alt, className, style, inView }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      style={style}
      initial={{ x: '100vw' }} // Position initiale hors écran à droite
      animate={{ x: 0 }} // Position finale au centre
      transition={{ type: 'spring', stiffness: 50 }} // Animation de ressort
    />
  );
};

export default ScrollImage;
