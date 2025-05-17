import { createContext } from "react";

interface IContextValue<T = any> {
    user: T;
    setUser: (user: T) => void;
}

const UserContext = createContext<IContextValue | null>(null)

export default UserContext