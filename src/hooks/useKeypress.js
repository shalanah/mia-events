import { useEffect } from "react";

// Hook
function useKeyPress(targetKey, fn) {
  // Add event listeners
  useEffect(() => {
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        fn();
      }
    };
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey, fn]); // Empty array ensures that effect is only run on mount and unmount

  return;
}

export default useKeyPress;
