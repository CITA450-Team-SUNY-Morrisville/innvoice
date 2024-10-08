import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    login(password) {
      return new Promise((res) => {
        // TODO: make this also check to see if you are authed.
        // We also check if authed on the server but the frontend should still try to validate before showing content.
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default () => {
  return React.useContext(authContext);
}