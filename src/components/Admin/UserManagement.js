import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { Auth } from "../../api/auth"
import Swal from 'sweetalert2'

import UserViewer from './Modals/UserViewer';

const columns = [
  { id: 'names', label: 'Nombre(s)', minWidth: 130 },
  { id: 'lastnames', label: 'Apellido(s)', minWidth: 130 },
  { id: 'email', label: 'Email', minWidth: 130 },
  { id: 'phone', label: 'Teléfono', minWidth: 130 },
  { id: 'identification', label: 'Identificación', minWidth: 130 },
  { id: 'actions', label: 'Acciones', minWidth: 130 },
];

export default function StickyHeadTable() {
  const auth = new Auth();
  
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [user, setUser] = React.useState(null)
  const [viewer, setViewer] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openModal = (id, view) => () => {
    if (id) {
      setUser(id);
    }

    if (view){
      setViewer(view)
    }
    setOpen(true);
  };

  const closeModal = () => {
    setUser(null)
    setViewer(false)
    setOpen(!open);
    getUsers()
  }

  const getUsers = async () => {
    try {
      const response = await auth.getUsers();
      const usersWithStatus = response.map(user => ({
        ...user,
        active: user.active ? 'Activo' : 'Inactivo'
      }));

      setRows(usersWithStatus);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteUser = async (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este usuario?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#55be98",
      cancelButtonColor: "darkred",
      confirmButtonText: "Eliminar"
    }).then(async (result) => {
      if(result.value){
        try {
          const response = await auth.removeUser(id);
          if(response){
            Swal.fire("Eliminado", "El usuario ha sido eliminado", "success")
          }
          getUsers()
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  React.useEffect(() => {
    getUsers();
  }, []); 

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'actions' ? (
                              <div style={{display:'flex' , gap:10}}>
                                <RemoveRedEyeOutlinedIcon onClick={openModal(row._id, true)} style={{cursor:'pointer'}} />
                                <EditOutlinedIcon onClick={openModal(row._id, false)} style={{color:"#55be98", cursor:'pointer'}} />
                                <DeleteOutlineOutlinedIcon onClick={() => deleteUser(row._id)} style={{color: "darkred", cursor:'pointer'}} />
                              </div>
                            ) : (
                              column.format && typeof value === 'number'
                                ? column.format(value)
                                : value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {open && (
        <UserViewer closeModal={closeModal} user={user} disabled={viewer}></UserViewer>
      )}
    </>
  );
}