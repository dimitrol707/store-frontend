import {
  getGetHeaderTokenInfoQueryKey,
  TokenUserInfo,
  useGetHeaderTokenInfo,
} from "@store-frontend/shared-api";
import {
  clearLocalStorageValue,
  LocalStorageKey,
} from "@store-frontend/shared-utils";
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";

interface AuthContextValue {
  user?: TokenUserInfo;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = PropsWithChildren;

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: tokenData, isLoading } = useGetHeaderTokenInfo({
    query: {
      retry: false,
    },
  });
  const queryClient = useQueryClient();

  const logout = useCallback<AuthContextValue["logout"]>(() => {
    clearLocalStorageValue(LocalStorageKey.JWT);
    queryClient.setQueryData(getGetHeaderTokenInfoQueryKey(), null);
  }, [queryClient]);

  const value = useMemo(
    () => ({ user: tokenData, isLoading: isLoading, logout }),
    [tokenData, logout, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
