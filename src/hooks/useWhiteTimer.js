import { useState, useRef } from "react";

const useWhiteTimer = (initialState = 2400) => {
  const [whiteTimer, setWhiteTimer] = useState(initialState);
  const [isWhiteActive, setIsWhiteActive] = useState(false);
  const [isWhitePaused, setIsWhitePaused] = useState(false);
  const countRef = useRef(null);

  const handleWhiteStart = () => {
    setIsWhiteActive(true);
    setIsWhitePaused(true);
    countRef.current = setInterval(() => {
      setWhiteTimer((whiteTimer) => whiteTimer + 1);
    }, 1000);
  };

  const handleWhitePause = () => {
    clearInterval(countRef.current);
    setIsWhitePaused(false);
  };

  const handleWhiteResume = () => {
    setIsWhitePaused(true);
    countRef.current = setInterval(() => {
      setWhiteTimer((whiteTimer) => whiteTimer + 1);
    }, 1000);
  };

  const handleWhiteReset = () => {
    clearInterval(countRef.current);
    setIsWhiteActive(false);
    setIsWhitePaused(false);
    setWhiteTimer(0);
  };

  return {
    whiteTimer,
    isWhiteActive,
    isWhitePaused,
    handleWhiteStart,
    handleWhitePause,
    handleWhiteResume,
    handleWhiteReset,
  };
};

export default useWhiteTimer;
