import { useCallback, useState } from "react";

export const useCenteredTree: any = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useCallback((containerElem: any) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setTranslate({ x: width / 2, y: height / 3.5 });
    }
  }, []);
  return [translate, containerRef];
};
