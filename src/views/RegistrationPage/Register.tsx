import { useState } from "react";
import { Box, Card, Stack } from "@mui/material";
import RegisterForm from "./RegisterForm"; 

const Register = () => {
  const [form, setForm] = useState({
    id: "",
    epf: "",
    name: "",
    username: "",
    password: "",
    department: "",
    contact: "",
    email: "",
    userType: "",
    availability: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Stack
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'url("/images/l1.png")',
        backgroundSize: "720px 1000px",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 1000, boxShadow: 4, borderRadius: "30px", display: "flex" }}>
        {/* Left Side with Image */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: 'url("/images/l1.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTopLeftRadius: "25px",
            borderBottomLeftRadius: "25px",
            margin: "12px",
            position: "relative",
          }}
        >
          {/* Logo Box */}
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 20,
              backgroundColor: "white",
              padding: "8px 16px",
              borderRadius: "10px",
              fontWeight: "bold",
            }}
          >
            BUILDTEK
          </Box>
        </Box>

        {/* Right Side - Registration Form */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 4,
          }}
        >
          {/* Use the RegisterForm component here */}
          <RegisterForm form={form} handleChange={handleChange} />
        </Box>
      </Card>
    </Stack>
  );
};

export default Register;