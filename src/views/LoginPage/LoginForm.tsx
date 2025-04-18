import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { AccountCircle, Info } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/authService";

interface LoginFormProps {
  onForgotPasswordClick: () => void;
}

const LoginForm = ({ onForgotPasswordClick }: LoginFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onMutate: () => setIsPending(true),
    onSuccess: (data) => {
      // Store token
      localStorage.setItem("token", data.access_token);
      
      // Invalidate and refetch current user
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      
      // Show success message
      enqueueSnackbar(`Welcome back, ${data.user.name}!`, { 
        variant: "success" 
      });
      
      // Navigate to home
      navigate("/home");
    },
    onError: (error) => {
      enqueueSnackbar(error.message || "Login failed", { 
        variant: "error" 
      });
    },
    onSettled: () => setIsPending(false),
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <CardContent sx={{ textAlign: "center" }}>
        <img src="/images/lgo1.png" alt="Buildtek Logo" width="50px" />
        <Typography variant="h5" fontWeight="bold">
          Smart Flow
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          Seamless Production, Smarter Management
        </Typography>
        <Typography variant="h6" fontWeight="bold" mt={1} sx={{ textAlign: "left" }}>
          Sign In
        </Typography>
      </CardContent>

      <form onSubmit={onSubmit}>
        <TextField
          label="Username or Email"
          fullWidth
          variant="outlined"
          margin="normal"
          {...register("username", { 
            required: "Username or email is required" 
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          margin="normal"
          {...register("password", { 
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox 
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              color="primary"
            />
          }
          label="Remember me"
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isPending}
          sx={{ mb: 2, height: 48 }}
        >
          {isPending ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sign In"
          )}
        </Button>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            startIcon={<Info />}
            onClick={onForgotPasswordClick}
            sx={{ textTransform: "none" }}
          >
            Forgot password?
          </Button>
          <Button
            startIcon={<AccountCircle />}
            onClick={() => navigate("/register")}
            sx={{ textTransform: "none" }}
          >
            Create account
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;