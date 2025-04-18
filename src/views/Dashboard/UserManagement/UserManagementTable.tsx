import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Typography
  } from "@mui/material";
  import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
  
  interface UserManagementTableProps {
    users: User[];
    handleEdit: (index: number) => void;
    handleDelete: (index: number) => void;
  }
  
  interface User {
    id: number;
    epf: string;
    employeeName: string;
    username: string;
    password: string;
    department: string;
    contact: string;
    email: string;
    userType: string;
    availability: string;
  }
  
  const UserManagementTable = ({ users, handleEdit, handleDelete }: UserManagementTableProps) => {
    return (
      <>
        <Typography variant="h6" sx={{ mb: 2 }}>User List</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["ID", "EPF", "Employee Name", "User Name", "Password", "Department", "Contact", 
                  "Email", "User Type", "Availability", "Edit", "Delete"].map((header) => (
                  <TableCell key={header} sx={{ fontWeight: "bold" }}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.epf}</TableCell>
                  <TableCell>{user.employeeName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.contact}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>{user.availability}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
  
  export default UserManagementTable;