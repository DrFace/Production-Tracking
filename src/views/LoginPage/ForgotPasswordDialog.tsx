import { useState } from "react";
import {
  
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../api/userApi"; 
interface ForgotPasswordDialogProps {
  open: boolean;
  handleClose: () => void;
}

const ForgotPasswordDialog = ({ open, handleClose }: ForgotPasswordDialogProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);

 { const { mutate: forgotPasswordMutation } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      enqueueSnackbar("Password reset instructions sent to your email!", { variant: "success" });
      handleClose();
    },
    onError: () => {
      enqueueSnackbar("Failed to send reset instructions. Please try again.", { variant: "error" });
    },
  });  

  const handleSubmit = () => {
    if (!email) {
      enqueueSnackbar("Please enter your email address.", { variant: "warning" });
      return;
    }
    setIsPending(true);
    forgotPasswordMutation({ email });
  };   

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Forgot Password
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Enter your email address below, and we'll send you instructions to reset your password.
        </Typography>
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={20} /> : null}
        >
          {isPending ? "Sending..." : "Send Instructions"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
}
export default ForgotPasswordDialog; 