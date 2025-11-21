// src/hooks/NavigationContext.tsx
// This is so I can keep track of history and use the back arrow
import { createContext, useContext, useState, ReactNode } from "react";

//Page Id can be any of these strings or any string in general
export type PageId =
  | "home"
  | "skills"
  | "projects"
  | "links"
  | "resume"
  | "temp"
  | string; //needed for skills/frontend etc

type NavigationContextValue = {
  current: PageId;
  last: PageId | null;
  history: PageId[]; //Stack
  goTo: (page: PageId) => void;
  goBack: () => void;
};

const NavigationContext = createContext<NavigationContextValue | undefined>(
  undefined
);

//This is going to wrap the the app so it takes ReactNodes as children
export function NavigationProvider({ children }: { children: ReactNode }) {
  //initialize history array to with "home" becasue its default page
  const [history, setHistory] = useState<PageId[]>(["home"]);
  //current is the last item in history array or home if there's nothing (shouldn't be)
  const current = history[history.length - 1] ?? "home";
  //Either null or the item before the last item in the history aarray
  const last = history.length > 1 ? history[history.length - 2] : null;

  const goTo = (page: PageId) => {
    setHistory((prev) => {
      //stops duplicates
      if (prev[prev.length - 1] === page) {
        return prev;
      }
      //returns a new array with whatever was in history and the new page
      const next = [...prev, page];
      return next;
    });
  };

  const goBack = () => {
    setHistory((prev) => {
      //prev = history before goBack
      if (prev.length <= 1) {
        //no previous page to return to so just return ["Home"]
        return prev;
      }
      //return new array without the last item in the array
      const next = prev.slice(0, prev.length - 1);
      return next;
      //next = history after goBack
    });
  };

  //Now any component wrapped in this context (all of them) can call useNavigation()
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
