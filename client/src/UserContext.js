const { createContext } = require('react');

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  return <div>{children}</div>;
}
