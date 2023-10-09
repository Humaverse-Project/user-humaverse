import React, { useState, useEffect, useMemo } from "react";
import { listmetiermetier, getdatarome } from "../../../services/MetierService";
import MaterialReactTable from "material-react-table";
import Paper from "@mui/material/Paper";
import CreateMetierModal from "./Modal/CreateMetierModal";
import { Backdrop, Box, Button, CircularProgress, Typography } from "@mui/material";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { datefonctionun, datefonctiondeux } from "../../../services/DateFormat";
import RomeSelectModal from "./Modal/RomeSelectModal";

function MetierScreen({ setLoading, setError }) {
  const [open, setOpen] = useState(false);
  const [datacompetance, setdatacompetance] = useState([]);
  const [datacompetancedata, setdatacompetancedata] = useState([]);
  const [postedata, setPostedata] = useState([]);
  const [tableloagin, settableloagin] = useState({ isLoading: true });
  const [matierselectionner, setmatierselectionner] = useState({});
  const [listrome, setlistrome] = useState([]);
  const [loadingrome, setloadingrome] = useState(false);
  const [appelationlist, setappelationlist] = useState([]);
  const [contextlist, setcontextlist] = useState([]);

  useEffect(() => {
    const fetchData = async (setLoading, setError) => {
      try {
        const datacompetanceexistant = await listmetiermetier();
        const reponsecompetance = await datacompetanceexistant;
        setPostedata(reponsecompetance.postelist);
        setlistrome(
          reponsecompetance.rome.map((rome) => {
            return {
              label: rome.rome_coderome + " " + rome.nom,
              code: rome.rome_coderome,
              id: rome.id,
            };
          })
        );
        settableloagin({ isLoading: false });
        setLoading(false);
      } catch (error) {
        setError("Une erreur s'est produite lors de l'appele serveur");
        setLoading(false);
      }
    };
    fetchData(setLoading, setError);
  }, [setLoading, setError]);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: "titre",
        header: "Titre",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "activite",
        header: "Activité",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "version",
        header: "Version",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "rome.codeRome",
        header: "Code Rome",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "createdAt.date",
        header: "Date création",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
        Cell: ({ cell }) => datefonctionun(cell.getValue()),
      },
    ],
    []
  );

  // Data competence eto izany dia data competence an'i creation
  const handleselectionrome = (e) => {
    setloadingrome(true);
    setOpen(false);
    getdatarome(matierselectionner.code)
      .then((reponsemetie) => {
        setloadingrome(false);
        console.log(reponsemetie)
        setCreateModalOpen(true)
        setmatierselectionner(reponsemetie.rome)
        setappelationlist(
          reponsemetie.appelation.map((x) => {
            return { ...x, label: x.emploiTitre };
          })
        );
        const dataT = reponsemetie.briquecontexte;
        const groupedDataT = {};
        dataT.forEach((item) => {
          const titre = item.contexte.ctxTrvTitre;
          if (!groupedDataT[titre]) {
            groupedDataT[titre] = [];
          }
          groupedDataT[titre].push(item);
        });
        setcontextlist(groupedDataT)
        setdatacompetance(
          reponsemetie.briquecompetance.map((metier) => {
            return {
              label:
                "[v-" + metier.ficCompVersion + "] " + metier.ficCompTitreEmploi,
              titre: metier.ficCompTitreEmploi,
              id: metier.id,
            };
          })
        );
        setdatacompetancedata(reponsemetie.briquecompetance)
      })
      .catch((error) => {
        setloadingrome(false);
        setOpen(false);
      });
  };
  const handleCreateNewRow = async (values) => {
    console.log(values)
    return true;
  };
  return (
    <Paper sx={{ mt: 2, width: "100%", color: "black.main" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingrome}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {open && (
        <RomeSelectModal
          open={open}
          setmatierselectionner={setmatierselectionner}
          setOpen={setOpen}
          handleselectionrome={handleselectionrome}
          listrome={listrome}
        />
      )}
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          initialState={{ columnVisibility: { id: false } }}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                margin: "auto",
                gridTemplateColumns: "1fr 1fr",
                width: "100%",
              }}
            >
              <Typography>
                <b>validation:</b>{" "}
                {datefonctiondeux(row.original.validation.date)}
              </Typography>
              <Typography>
                <b>visa:</b> {datefonctiondeux(row.original.visa.date)}
              </Typography>
              <Typography>
                <b>instruction:</b> {row.original.instruction}
              </Typography>
              <Typography>
                <b>definition:</b> {row.original.definition}
              </Typography>
              <Typography>
                <b>agrement:</b> {row.original.agrement}
              </Typography>
              <Typography>
                <b>condition:</b> {row.original.condition}
              </Typography>
            </Box>
          )}
          state={tableloagin}
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columns}
          data={postedata}
          enableColumnOrdering
          muiBottomToolbarProps={{
            sx: {
              backgroundColor: "unset",
            },
          }}
          muiTopToolbarProps={{
            sx: {
              backgroundColor: "unset",
            },
          }}
          muiTableBodyProps={{
            sx: {
              "& tr:nth-of-type(odd)": {
                backgroundColor: "#f5f5f5",
              },
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              color: "black.main",
            },
          }}
          muiTableBodyRowProps={{
            sx: {
              ":hover td": {
                backgroundColor: "#f5f5f5",
              },
              backgroundColor: "unset",
            },
          }}
          muiTableHeadRowProps={{
            sx: {
              color: "black.main",
              backgroundColor: "unset",
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              color: "black.main",
              backgroundColor: "unset",
            },
          }}
          renderTopToolbarCustomActions={() => (
            <Button
              color="success"
              onClick={() => setOpen(true)}
              variant="outlined"
            >
              Ajouté nouveau fiche metier
            </Button>
          )}
          localization={MRT_Localization_FR}
        />
        {createModalOpen && (
          <CreateMetierModal
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
            datacompetance={datacompetance}
            matierselectionner={matierselectionner}
            appelationlist={appelationlist}
            datacompetancedata={datacompetancedata}
            contextlist={contextlist}
          />
        )}
      </ThemeProvider>
    </Paper>
  );
}

export default MetierScreen;
