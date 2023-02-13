import { createContext } from "react";

const CulqiContext = createContext({
  openCulqi: () => {},
  setAmount: () => {},
  amount: 0,
  token: null,
  error: null,
});

export const { Consumer: Culqi } = CulqiContext;
export default CulqiContext;
