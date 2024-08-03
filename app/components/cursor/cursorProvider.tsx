import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./cursor.module.css"; // Assurez-vous d'avoir des styles CSS appropriés

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    //entendre le mouvement du curseur
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    
    // entendre over le link
    const handleMouseOver = (event: MouseEvent) => {
      if ((event.target as HTMLElement).tagName === 'A') {
        setIsHoveringLink(true);
      }
    };
    document.addEventListener("mouseover", handleMouseOver);
  
  
  // plus over le link
    const handleMouseOut = (event: MouseEvent) => {
      if ((event.target as HTMLElement).tagName === 'A') {
        setIsHoveringLink(false);
      }
    };
    document.addEventListener("mouseout", handleMouseOut);
  
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);

      
    };
  }, []);

  const variants = {
    default: { rotate: 0 },
    hoveringLink: { rotate: 360 }
  };


  return (
    <motion.div
      className={styles.cursor}
      style={{ translateX: mousePosition.x -8, translateY: mousePosition.y -8 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      variants={variants}
      animate={isHoveringLink ? "hoveringLink" : "default"}
      initial={false}
    />
  );
};

export default CustomCursor;

