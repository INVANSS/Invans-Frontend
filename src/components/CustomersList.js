import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableMenu from "./TableMenu";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import API from "../api/Api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomersList() {
  const [open, setOpen] = React.useState(false);
  const [customers, setCustomers] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [id, setId] = React.useState(null);
  const [name, setName] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [tel, setTel] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetch(API.HOST_CUSTOMER + API.API_URL + API.CUSTOMERS + "/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.cliente) {
          setCustomers(json.cliente);
        }
      });
  }, [refresh]);

  const saveCustomer = () => {
    let headers = new Headers();
    headers.append("content-type", "application/json");
    let url = API.HOST_CUSTOMER + API.API_URL + API.CUSTOMERS + "/";
    if (id) {
      url = url + id;
    }
    let fetchData = {
      method: id ? "PUT" : "POST",
      body: JSON.stringify({
        nombre: name,
        apellido: lastname,
        direccion: address,
        telf: tel,
      }),
      headers: headers,
    };
    fetch(url, fetchData).then((response) => {
      if (response.status == 200 || response.status == 201) {
        handleClose();
        setRefresh(refresh + 1);
      }
    });
  };

  const deleteCustomer = (id) => {
    let headers = new Headers();
    headers.append("content-type", "application/json");
    let fetchData = {
      method: "DELETE",
      headers: headers,
    };
    fetch(
      API.HOST_CUSTOMER + API.API_URL + API.CUSTOMERS + "/" + id,
      fetchData
    ).then((response) => {
      if (response.status == 200) {
        setRefresh(refresh + 1);
      }
    });
  };

  const editCustomer = (row) => {
    setId(row.id);
    setName(row.nombre);
    setLastname(row.apellido);
    setAddress(row.direccion);
    setTel(row.telf);
    handleClickOpen();
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: "black" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {id ? "Editar Cliente" : "Agregar Cliente"}
            </Typography>
            <Button autoFocus color="inherit" onClick={saveCustomer}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            border: "0 1px 0 1px solid #ccc",
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ paddingX: 10 }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}></Box>

            <TextField
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin="normal"
              fullWidth
              required
              id="name-required"
              label="Nombre del Cliente"
              variant="outlined"
            />
            <TextField
              value={lastname}
              onChange={(event) => setLastname(event.target.value)}
              margin="normal"
              fullWidth
              required
              id="lastname-required"
              label="Apellido del Cliente"
              variant="outlined"
            />
            <TextField
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              margin="normal"
              fullWidth
              required
              id="address-required"
              label="Direccion"
              variant="outlined"
            />
            <TextField
              value={tel}
              onChange={(event) => setTel(event.target.value)}
              margin="normal"
              type={"number"}
              fullWidth
              required
              id="tel-required"
              label="Telefono"
              variant="outlined"
            />
          </Box>
        </Box>
      </Dialog>
      <TableContainer component={Paper}>
        <Button
          sx={{ float: "right", marginBottom: 2 }}
          onClick={() => {
            setId(null);
            setName("");
            setLastname("");
            setAddress("");
            setTel(0);
            handleClickOpen();
          }}
          variant="outlined"
        >
          Agregar Cliente
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre Completo</TableCell>
              <TableCell align="right">Direccion</TableCell>
              <TableCell align="right">Telefono</TableCell>
              <TableCell align="right">...</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((row) => (
              <TableRow
                key={row.nombre}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nombre + " " + row.apellido}
                </TableCell>
                <TableCell align="right">{row.direccion}</TableCell>
                <TableCell align="right">{row.telf}</TableCell>
                <TableCell align="right">
                  <TableMenu
                    actionDelete={() => deleteCustomer(row.id)}
                    actionEdit={() => editCustomer(row)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
