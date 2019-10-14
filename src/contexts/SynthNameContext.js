import { createContext, useContext } from "react";
export const SynthNameContext = createContext();

export const useStateValue = () => useContext(SynthNameContext);
