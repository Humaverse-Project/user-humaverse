import React, { useState, useEffect, useMemo } from "react";
import { listpost, postPoste } from "../../../services/PosteService";
import MaterialReactTable from "material-react-table";
import Paper from "@mui/material/Paper";
import CreateNewPosteModal from "./Modal/NewPosteModal";
import { Box, Button, Typography } from "@mui/material";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { datefonctionun, datefonctiondeux } from "../../../services/DateFormat";

function PosteScreen() {

  const [loadingFetchData, setLoadingFetchData] = useState(true);
  const [errorFetchData, setErrorFetchData] = useState("");

  const [datacompetance, setdatacompetance] = useState([]);
  const [metierdata, setMetierdata] = useState([]);
  const [postedata, setPostedata] = useState([]);
  const [tableloagin, settableloagin] = useState({ isLoading: true });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datacompetanceexistant = await listpost();
        const reponsecompetance = await datacompetanceexistant;
        setPostedata(reponsecompetance.postelist);
        setMetierdata(
          reponsecompetance.rome.map((metier) => {
            return {
              label: "[" + metier.rome_coderome + "]" + metier.nom,
              code: metier.rome_coderome,
              nom: metier.nom,
              id: metier.id,
            };
          })
        );
        setdatacompetance(
          reponsecompetance.competance.map((metier) => {
            return {
              label:
                "[v-" + metier.ficCompVersion + "]" + metier.ficCompTitreEmploi,
              titre: metier.ficCompTitreEmploi,
              id: metier.id,
            };
          })
        );
        setLoadingFetchData(false);
      } catch (error) {
        setErrorFetchData(error)
        setLoadingFetchData(false);
      }
    };
    fetchData();
  }, []);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleCreateNewRow = async (values) => {
    const datametierexistant = await postPoste(values);
    const reponsemetie = await datametierexistant;
    setPostedata(reponsemetie.postelist);
    return true;
  };
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

  return (
    <Paper sx={{ mt: 2, width: "100%", color: "black.main" }}>
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
          state={{
            isLoading: loadingFetchData,
            error: errorFetchData,
          }}
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
              onClick={() => setCreateModalOpen(true)}
              variant="outlined"
            >
              Ajouté nouveau fiche poste
            </Button>
          )}
          localization={MRT_Localization_FR}
        />
        <CreateNewPosteModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
          datametier={metierdata}
          datacompetance={datacompetance}
        />
      </ThemeProvider>
    </Paper>
  );
}

export default PosteScreen;
