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
import MembViewer from "./Modals/MembViewer"
import { Membership } from "../../api/memberships/index"
import Swal from 'sweetalert2'


const columns = [
  { id: 'type', label: 'Tipo', minWidth: 130 },
  { id: 'description', label: 'Descripción', minWidth: 130 },
  { id: 'addons', label: 'Ventajas', minWidth: 130 },
  { id: 'price', label: 'Precio', minWidth: 130 },
  { id: 'actions', label: 'Acciones', minWidth: 130 },
];

export default function StickyHeadTable() {
  const memb = new Membership();
  
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [membId, setMembId] = React.useState(null)
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
      setMembId(id);
    }

    if (view){
      setViewer(view)
    }
    setOpen(true);
  };

  const closeModal = () => {
    setMembId(null)
    setViewer(false)
    setOpen(!open);
    getMembs()
  }

  const getMembs = async () => {
    try {
      const response = await memb.getAll();
      setRows(response);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteMemb = async (id) => {
    /* Swal.fire({
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
          getMembs()
        } catch (error) {
          console.log(error)
        }
      }
    }) */
  }

  React.useEffect(() => {
    getMembs();
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'actions' ? (
                              <div style={{display:'flex' , gap:10}}>
                                <RemoveRedEyeOutlinedIcon onClick={openModal(row._id, true)} style={{cursor:'pointer'}} />
                                <EditOutlinedIcon onClick={openModal(row._id, false)} style={{color:"#55be98", cursor:'pointer'}} />
                                <DeleteOutlineOutlinedIcon onClick={() => deleteMemb(row._id)} style={{color: "darkred", cursor:'pointer'}} />
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
        <MembViewer closeModal={closeModal} member={membId} disabled={viewer}></MembViewer>
      )}
    </>
  );
}