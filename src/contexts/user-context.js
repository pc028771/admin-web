import _ from 'lodash';
import { createContext, useCallback, useEffect, useState, useMemo } from 'react';

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signin = useCallback(async () => {
    if (!_.isEmpty(user)) {
      return;
    }

    let res = await fetch('/api/user/signin');
    if (res.ok) {
      let { token, data } = await res.json();
      setUser(data);
    }
  }, []);

  const signout = useCallback(async () => {
    if (_.isEmpty(user)) {
      return;
    }

    let res = await fetch('/api/user/signout');
    if (res.ok) {
      setUser(null);
    }
  });

  const getUser = async () => {
    let response = await fetch('/api/user/me');
    if (response.ok) {
      setUser(await response.json());
    }
  };

  useEffect(async () => {}, []);

  const contextValue = useMemo(
    () => ({
      user,
      signin,
      signout,
    }),
    [user, signin, signout],
  );

  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
