import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  CardContent,
  Stack,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

interface RegisterFormProps {
  form: {
    id: string;
    epf: string;
    name: string;
    username: string;
    password: string;
    department: string;
    contact: string;
    email: string;
    userType: string;
    availability: string;
    status: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const departments = ["HR", "Finance", "Production", "IT"];
const userTypes = ["Admin", "Employee"];
const availabilityOptions = ["Available", "Unavailable"];
const statusOptions = ["Active", "Inactive"];

const RegisterForm = ({ form, handleChange }: RegisterFormProps) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <CardContent sx={{ textAlign: "center" }}>
        <img src="/images/lgo1.png" alt="Buildtek Logo" width="50px" />
        <Typography variant="h5" fontWeight="bold">
          Smart Flow
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          Sign Up
        </Typography>
      </CardContent>

      {/* Form Fields */}
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="ID"
            name="id"
            fullWidth
            value={form.id}
            onChange={handleChange}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
          />
          <TextField
            label="EPF"
            name="epf"
            fullWidth
            value={form.epf}
            onChange={handleChange}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
          />
        </Stack>

        <TextField
          label="Name"
          name="name"
          fullWidth
          value={form.name}
          onChange={handleChange}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="User Name"
            name="username"
            fullWidth
            value={form.username}
            onChange={handleChange}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField
            select
            label="Department"
            name="department"
            fullWidth
            value={form.department}
            onChange={handleChange}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
          >
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Contact"
            name="contact"
            fullWidth
            value={form.contact}
            onChange={handleChange}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
          />
          <TextField
            select
            label="User Type"
            name="userType"
            fullWidth
            value={form.userType}
            onChange={handleChange}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
          >
            {userTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack direction="row" spacing={2}>
          <TextField
            select
            label="Availability"
            name="availability"
            fullWidth
            value={form.availability}
            onChange={handleChange}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
          >
            {availabilityOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            name="status"
            fullWidth
            value={form.status}
            onChange={handleChange}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px", height: "52px" } }}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>

      {/* Sign Up Button */}
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </Box>

      {/* Sign In Link */}
      <Box sx={{ mt: 1, textAlign: "center" }}>
        <Button variant="text" color="secondary" startIcon={<AccountCircle />}>
          Sign In to System
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterForm;