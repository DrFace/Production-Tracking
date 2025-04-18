import axios from "axios";
import { z } from "zod";

// Define schemas for user roles and permissions
export const PermissionKeysObjectSchema = z.object({
  // Define your permission keys here
  // Example:
  canViewDashboard: z.boolean(),
  canManageUsers: z.boolean(),
  // Add more permissions as needed
});

export const userRoleSchema = z.object({
  id: z.string(),
  userType: z.string(),
  description: z.string().optional(),
  permissionObject: PermissionKeysObjectSchema,
});

export type UserRole = z.infer<typeof userRoleSchema>;

// Define schema for user
export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  mobile: z.string(),
  emailVerifiedAt: z.string().nullable(),
  role: z.string(),
  roleId: z.string(),
  profileImage: z.string().nullable(),
  status: z.string(),
  isCompanyEmployee: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  department: z.string(),
  assignedFactory: z.array(z.string()),
  employeeNumber: z.string(),
  jobPosition: z.string(),
});

export type User = z.infer<typeof userSchema>;

// Login function
export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await axios.post("/api/login", {
    username, // Changed from `email` to `username` to match your login form
    password,
  });
  return res.data;
}

// Register user function
export async function registerUser({
  name,
  email,
  mobileNumber: mobile,
  password,
  confirmPassword: password_confirmation,
  isCompanyEmployee,
  department,
  jobPosition,
  assignedFactory,
  employeeNumber,
}: {
  email: string;
  password: string;
  name: string;
  mobileNumber: string;
  confirmPassword: string;
  isCompanyEmployee: boolean;
  jobPosition: string;
  department: string;
  assignedFactory: string[];
  employeeNumber: string;
}) {
  const res = await axios.post("/api/register", {
    email,
    password,
    name,
    mobile,
    password_confirmation,
    isCompanyEmployee,
    jobPosition,
    department,
    assignedFactory,
    employeeNumber,
  });
  return res.data;
}

// Validate user function
export async function validateUser() {
  const res = await axios.get("/api/user");
  return res.data;
}

// Forgot password function
export async function forgotPassword({ email }: { email: string }) {
  const res = await axios.post("/api/forgot-password", {
    email,
  });
  return res.data;
}