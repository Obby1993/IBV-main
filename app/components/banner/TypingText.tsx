// components/TypingText.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface TypingTextProps {
  text: string;
  speed?: number; // Vitesse de frappe en ms par lettre
  className?: string; // Ajout de la propriété className pour le style
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 50, className }) => {
  const splitText = text.split(/(<br>)/g); // Diviser le texte en tenant compte des balises <br>

  return (
    <div className={className}>
      {splitText.map((segment, index) => (
        segment === '<br>'
          ? <br key={index} />
          : segment.split('').map((letter, i) => (
              <motion.span
                key={`${index}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (index + i) * speed / 1000 }} // Convertir ms en s pour framer-motion
              >
                {letter}
              </motion.span>
            ))
      ))}
    </div>
  );
};

export default TypingText;
