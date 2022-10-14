import React, { useState } from "react";
import { IUser } from "../../models";

const useSession = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchUserSessions = () => {
    if (localStorage.user) {
      const currentUser = localStorage.user;
      setUser(currentUser);
    }
  };

  return {
    user: user,
    fetchUserSessions: fetchUserSessions,
  };
};

export default useSession;
