import { useEffect, useState } from "react";
import { BoardState } from "../types/kanban";

const useStorage = (
  key: string,
  initialState: BoardState
): [BoardState, React.Dispatch<React.SetStateAction<BoardState>>] => {
  const [state, setState] = useState<BoardState>(initialState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === "object" && parsed !== null) {
          setState(parsed);
        }
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, [key]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [key, state]);

  return [state, setState];
};

export default useStorage;
