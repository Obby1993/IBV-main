import React from 'react'
import {motion} from 'framer-motion'

type Props = {
    src: string;
  alt: string;
}

export default function animatedLogo({src, alt}: Props) {
    return (
        <motion.img
          src={src}
          alt={alt}
          initial={{ x: '100vw' }} // Start off-screen to the right
          animate={{ x: 0 }} // Animate to the final position
          transition={{ type: 'spring', stiffness: 50 }} // Spring animation
        //   style={{ width: '100px', height: '100px' }} // Adjust size as needed
        />
      );
    };
