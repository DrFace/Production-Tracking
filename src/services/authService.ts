// src/services/authService.ts
import { User } from "../types"; // Assuming you have a types file

// Dummy users data
const dummyUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@buildtek.com",
    role: "admin",
    permissions: ["all"],
    avatar: "",
    lastLogin: new Date().toISOString()
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@buildtek.com",
    role: "manager",
    permissions: ["dashboard", "production"],
    avatar: "",
    lastLogin: new Date().toISOString()
  },
  {
    id: "3",
    name: "Regular User",
    email: "user@buildtek.com",
    role: "user",
    permissions: ["dashboard"],
    avatar: "",
    lastLogin: new Date().toISOString()
  }
];

// Mock login function
export async function login(credentials: { username: string; password: string }) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Find user - in a real app, username might be email
  const user = dummyUsers.find(u => 
    (u.email === credentials.username || u.name.toLowerCase() === credentials.username.toLowerCase()) && 
    passwordMatches(credentials.password)
  );

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return {
    access_token: `dummy-token-${user.id}`,
    user
  };
}

// Mock validation function
export async function validateUser(): Promise<User | null> {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Extract user ID from dummy token
  const userId = token.replace("dummy-token-", "");
  const user = dummyUsers.find(u => u.id === userId);

  return user || null;
}

// Simple password check for dummy data
function passwordMatches(inputPassword: string): boolean {
  // In dummy data, all passwords are "password123"
  return inputPassword === "password123";
}