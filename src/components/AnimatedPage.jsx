import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const AnimatedWrapper = ({ children, animationConfig,  delay = 0 }) => {
  const el = useRef(null);

  useGSAP(() => {
    // default animation or custom config
    gsap.fromTo(
      el.current,
      animationConfig?.from || { opacity: 0, y: 20 },
      animationConfig?.to || { opacity: 1, y: 0, duration: 1, delay: delay }
    );
  }, [animationConfig]);

  return <div ref={el}>{children}</div>;
};

export default AnimatedWrapper;
