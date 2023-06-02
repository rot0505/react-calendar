import { useCallback, useRef } from "react";

export const useThrottle = <T extends (...args: any[]) => any>(callback: T, delay = 300) => {
  const isThrottled = useRef(false);

  const throttledCallback = useCallback((...args: any) => {
    if (isThrottled.current) {
      return;
    }
    callback(...args);
    isThrottled.current = true;
    setTimeout(() => isThrottled.current = false, delay);
  }, [callback, delay]);

  return throttledCallback;
}