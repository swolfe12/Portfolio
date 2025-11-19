// src/hooks/NavigationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export type PageId =
  | "home"
  | "skills"
  | "projects"
  | "links"
  | "resume"
  | "temp"
  | string;

type NavigationContextValue = {
  current: PageId;
  last: PageId | null;
  history: PageId[];
  goTo: (page: PageId) => void;
  goBack: () => void;
};

const NavigationContext = createContext<NavigationContextValue | undefined>(
  undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<PageId[]>(["home"]);

  const current = history[history.length - 1] ?? "home";
  const last = history.length > 1 ? history[history.length - 2] : null;

  const goTo = (page: PageId) => {
    console.log("[Nav] goTo called with:", page);
    setHistory((prev) => {
      console.log("[Nav] history before goTo:", prev);
      if (prev[prev.length - 1] === page) {
        console.log("[Nav] same page as last; no push");
        return prev;
      }
      const next = [...prev, page];
      console.log("[Nav] history after goTo:", next);
      return next;
    });
  };

  const goBack = () => {
    console.log("[Nav] goBack()");
    setHistory((prev) => {
      console.log("[Nav] history before goBack:", prev);
      if (prev.length <= 1) {
        console.log("[Nav] no previous page to go back to");
        return prev;
      }
      const next = prev.slice(0, prev.length - 1);
      console.log("[Nav] history after goBack:", next);
      return next;
    });
  };

  return (
    <NavigationContext.Provider
      value={{ current, last, history, goTo, goBack }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used inside a NavigationProvider");
  }
  return ctx;
}
