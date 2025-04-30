"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Pagination,
  Avatar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { User } from "@/types/user";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

type Props = {
  users: User[];
  page: number;
  totalPages: number;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onPageChange: (page: number) => void;
};

export default function UserTable({
  users,
  page,
  totalPages,
  onEdit,
  onDelete,
  onPageChange,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        User Management
      </Typography>

      <Box
        sx={{
          overflowX: "auto",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              {!isMobile && <TableCell>Email</TableCell>}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={user.avatar} alt={user.first_name} />
                    <Typography>
                      {user.first_name} {user.last_name}
                    </Typography>
                  </Box>
                </TableCell>

                {!isMobile && <TableCell>{user.email}</TableCell>}

                <TableCell align="right">
                  <IconButton
                    onClick={() => onEdit(user)}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "#fff",
                      mr: 1,
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                    size="small"
                    aria-label="edit user"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <IconButton
                    onClick={() => onDelete(user.id)}
                    sx={{
                      backgroundColor: "error.main",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "error.dark",
                      },
                    }}
                    size="small"
                    aria-label="delete user"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
