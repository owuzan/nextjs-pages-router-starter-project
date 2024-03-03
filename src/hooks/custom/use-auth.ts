import { useAppSelector } from "@/store/hooks";
import { getUserState } from "@/store/slices/user-slice";

export const useAuth = () => {
  const { loading, user } = useAppSelector(getUserState);
  const isLoggedIn = loading ? null : !!user;

  return {
    isUserLoading: loading,
    isUserLoggedIn: isLoggedIn,
    user,
  };
};
