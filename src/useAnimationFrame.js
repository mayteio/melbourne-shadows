import { useCallback, useEffect, useRef } from "react";
export function useAnimationFrame(callback, playing = true) {
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = useCallback(
    time => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }

      if (playing) {
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
      }
    },
    [playing, callback]
  );

  const cancel = () =>
    requestRef.current && cancelAnimationFrame(requestRef.current);

  useEffect(() => {
    if (playing) requestRef.current = requestAnimationFrame(animate);
    else cancel();

    return () => {
      cancel();
    };
  }, [playing, animate]);
}
