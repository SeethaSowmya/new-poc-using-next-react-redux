"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from '@mui/material/Button';
import Link from "next/link";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { storeData } from "@/store/postSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const HomePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId , setDeleteId] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const fromStoreData = useSelector((state) => state.postData.postdata);
  // console.log("from store data", fromStoreData);


  useEffect(() => {
    const getData = async () => {
      try {
        let maindata = (await axios("https://jsonplaceholder.typicode.com/posts")).data
        // let maindata = await jsondata.json();
        console.log(maindata, "data");
        maindata.forEach((element) => {
          element.view = "view";
          element.edit = "edit";
          element.delete = "delete";
        });
        setData(maindata);
        dispatch(storeData(maindata));
      } catch (error) {
        toast("Something went wrong while", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "warn",
        });
      }
    };
    getData();
  }, []);

  const logstate = useSelector((state) => state);

  const columns = [
    { id: "id", label: "Id", minWidth: 170 },
    { id: "title", label: "Title", minWidth: 100 },
    { id: "body", label: "Body", minWidth: 170 },
    { id: "userId", label: "Uer Id", minWidth: 100 },
    { id: "view", label: "View", minWidth: 170 },
    { id: "edit", label: "Edit", minWidth: 170 },
    { id: "delete", label: "Delete", minWidth: 170 },
  ];
  const rows = data;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onViewClick = (id) => {
    console.log(id, "idView");
    router.push(`home/view/${id}`);
  };

  const onEditClick = (id) => {
    console.log(id, "idedit");
    router.push(`home/edit/${id}`);

  };

  const onDeleteClick = (id) => {
    setOpen(true)
   setDeleteId([id])
  };
  const confirmDelete = () =>{
    const resp = axios.delete(`https://jsonplaceholder.typicode.com/posts/${deleteId[0]}`)
    setDeleteId([])
    handleClose()
  }

  return (
    <div>
      <Link href="/home/add/new">
       <Button variant="contained"> Add post</Button>
      </Link>
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure do you want to delete it ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={confirmDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={4} color="yellow">
                  Details
                </TableCell>
                <TableCell align="center" colSpan={3} color="orange">
                  Action
                </TableCell>
              </TableRow>
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        const onView = () => {
                          onViewClick(row.id);
                        };
                        const onEdit = () => {
                          onEditClick(row.id);
                        };
                        const onDelete = () => {
                          onDeleteClick(row.id);
                        };
                        let funcName =
                          value == "view"
                            ? onView
                            : value == "edit"
                            ? onEdit
                            : onDelete;
                        let varName =
                          value == "view" ? (
                            <VisibilityIcon />
                          ) : value == "edit" ? (
                            <EditIcon />
                          ) : (
                            <DeleteIcon />
                          );
                        if (
                          value === "view" ||
                          value === "edit" ||
                          value === "delete"
                        ) {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              onClick={funcName}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : varName}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
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
    </div>
  );
};

export default HomePage;
