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

export default function ProductsList() {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [id, setId] = React.useState(null);
  const [rf, setRf] = React.useState("");
  const [name, setName] = React.useState("");
  const [cajas, setCajas] = React.useState(0);
  const [unidades, setUnidades] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    fetch(API.HOST + API.API_URL + API.PRODUCTS + "/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setProducts(json);
      });
  }, [refresh]);

  const saveProduct = () => {
    let headers = new Headers();
    headers.append("content-type", "application/json");
    let url = API.HOST + API.API_URL + API.PRODUCTS + "/";
    if (id) {
      url = url + id + "/";
    }
    let fetchData = {
      method: id ? "PUT" : "POST",
      body: JSON.stringify({
        rf: rf,
        name: name,
        cajas: cajas,
        unidades: unidades,
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

  const deleteProduct = (id) => {
    let headers = new Headers();
    headers.append("content-type", "application/json");
    let fetchData = {
      method: "DELETE",
      headers: headers,
    };
    fetch(API.HOST + API.API_URL + API.PRODUCTS + "/" + id, fetchData).then(
      (response) => {
        if (response.status == 204) {
          setRefresh(refresh + 1);
        }
      }
    );
  };

  const editProduct = (row) => {
    setId(row.id);
    setRf(row.rf);
    setName(row.name);
    setCajas(row.cajas);
    setUnidades(row.unidades);
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
              {id ? "Editar Producto" : "Agregar Producto"}
            </Typography>
            <Button autoFocus color="inherit" onClick={saveProduct}>
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
              value={rf}
              onChange={(event) => setRf(event.target.value)}
              margin="normal"
              required
              id="referencia-required"
              label="Referencia"
              variant="outlined"
            />
            <TextField
              value={name}
              onChange={(event) => setName(event.target.value)}
              margin="normal"
              fullWidth
              required
              id="name-required"
              label="Nombre del Producto"
              variant="outlined"
            />
            <TextField
              value={cajas}
              onChange={(event) => setCajas(event.target.value)}
              margin="normal"
              type={"number"}
              fullWidth
              required
              id="cajas-required"
              label="Cajas"
              variant="outlined"
            />
            <TextField
              value={unidades}
              onChange={(event) => setUnidades(event.target.value)}
              margin="normal"
              type={"number"}
              fullWidth
              required
              id="unidades-required"
              label="Unidades"
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
            setRf("");
            setName("");
            setCajas(0);
            setUnidades(0);
            handleClickOpen();
          }}
          variant="outlined"
        >
          Agregar Producto
        </Button>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ref</TableCell>
              <TableCell>Productos (100% disponibles)</TableCell>
              <TableCell align="right">Cajas</TableCell>
              <TableCell align="right">Unidades</TableCell>
              <TableCell align="right">Accciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.rf}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name + " " + "(g)"}
                </TableCell>
                <TableCell align="right">{row.cajas}</TableCell>
                <TableCell align="right">{row.unidades}</TableCell>
                <TableCell align="right">
                  <TableMenu
                    actionDelete={() => deleteProduct(row.id)}
                    actionEdit={() => editProduct(row)}
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
