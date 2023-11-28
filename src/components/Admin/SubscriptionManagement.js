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

import { Suscription } from "../../api/suscriptions/index"
import Swal from 'sweetalert2'

import SubViewer from './Modals/SubViewer';

const columns = [
  { id: 'user_id', label: 'Usuario', minWidth: 130 },
  { id: 'membership_id', label: 'Membresía', minWidth: 130 },
  { id: 'duration', label: 'Duración', minWidth: 130 },
  { id: 'start_date', label: 'Fecha inicio', minWidth: 130 },
  { id: 'expiration_date', label: 'Fecha finalización', minWidth: 130 },
  { id: 'actions', label: 'Acciones', minWidth: 130 },
];

export default function StickyHeadTable() {
  const sub = new Suscription();
  
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [subid, setUser] = React.useState(null)
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
    getSubs()
  }

  const getSubs = async () => {
    try {
      const response = await sub.getSusbs();
      setRows(response);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteSub = async (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar esta suscripción?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#55be98",
      cancelButtonColor: "darkred",
      confirmButtonText: "Eliminar"
    }).then(async (result) => {
      if(result.value){
        try {
          console.log(id)
          const response = await sub.removeSub(id);
          if(response){
            Swal.fire("Eliminado", "la suscripción ha sido eliminada", "success")
          }
          getSubs()
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  React.useEffect(() => {
    getSubs();
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
                                <DeleteOutlineOutlinedIcon onClick={() => deleteSub(row._id)} style={{color: "darkred", cursor:'pointer'}} />
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
        <SubViewer closeModal={closeModal} sub={subid} disabled={viewer}></SubViewer>
      )}
    </>
  );
}