import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../services/authService";

// Define User type directly if you don't have a types file
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  permissions: string[];
  avatar?: string;
  lastLogin?: string;
}

interface UseCurrentUserResult {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
}

export function useCurrentUser(): UseCurrentUserResult {
  const navigate = useNavigate();
  
  const queryOptions: UseQueryOptions<User | null, Error> = {
    queryKey: ["currentUser"],
    queryFn: validateUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  };

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery<User | null, Error>(queryOptions);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, isError, navigate]);

  return {
    user: user || null,
    isLoading,
    isError,
    isAuthenticated: !!user,
    refetch,
  };
}

// Optional: Hook with different return type for components that don't need all the details
export function useCurrentUserSimple(): User | null {
  const { user } = useCurrentUser();
  return user;
}