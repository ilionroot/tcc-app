import { useState, useRef } from "react";

const useBlackTimer = (initialState = 2400) => {
  const [blackTimer, setBlackTimer] = useState(initialState);
  const [isBlackActive, setIsBlackActive] = useState(false);
  const [isBlackPaused, setIsBlackPaused] = useState(false);
  const countRef = useRef(null);

  const handleBlackStart = () => {
    setIsBlackActive(true);
    setIsBlackPaused(true);
    countRef.current = setInterval(() => {
      setBlackTimer((blackTimer) => blackTimer + 1);
    }, 1000);
  };

  const handleBlackPause = () => {
    clearInterval(countRef.current);
    setIsBlackPaused(false);
  };

  const handleBlackResume = () => {
    setIsBlackPaused(true);
    countRef.current = setInterval(() => {
      setBlackTimer((blackTimer) => blackTimer + 1);
    }, 1000);
  };

  const handleBlackReset = () => {
    clearInterval(countRef.current);
    setIsBlackActive(false);
    setIsBlackPaused(false);
    setBlackTimer(0);
  };

  return {
    blackTimer,
    isBlackActive,
    isBlackPaused,
    handleBlackStart,
    handleBlackPause,
    handleBlackResume,
    handleBlackReset,
  };
};

export default useBlackTimer;
