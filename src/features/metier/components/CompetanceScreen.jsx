import React, { useState, useEffect, useMemo } from "react";
import {
  listcompetance,
  postcompetance,
} from "../../../services/CompetanceService";
import MaterialReactTable from "material-react-table";
import Paper from "@mui/material/Paper";
import CreateNewCompetanceModal from "./NewCompetanceModal";
import EditCompetanceModal from "./EditCompetanceModal";
import { getdatarome } from "../../../services/RomeService";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ThemeProvider,
  Backdrop,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import theme from "./theme";
import { datefonctionun } from "../../../services/DateFormat";
import PartCompetanceShow from "./partie/PartCompetanceShow";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

function CompetanceScreen({ setLoading, setError }) {
  const [fichecompetance, setfichecompetance] = useState([]);
  const [matierselectionner, setmatierselectionner] = useState({});
  const [listrome, setlistrome] = useState([]);
  const [open, setOpen] = useState(false);
  const [competance, setcompetance] = useState({});
  const [activeeditrow, setactiveeditrow] = useState({});
  const [appelationlist, setappelationlist] = useState([]);
  const [competanceglobal, setcompetanceglobal] = useState([]);
  const [loadingrome, setloadingrome] = useState(false);
  const [tableloagin, settableloagin] = useState({ isLoading: true });

  const [accreditationlist, setAccreditationlist] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datametierexistant = await listcompetance();
        const reponsemetie = await datametierexistant;
        console.log(reponsemetie);
        setfichecompetance(reponsemetie.fiche_competance);
        setlistrome(
          reponsemetie.rome.map((rome) => {
            return {
              label: rome.rome_coderome + " " + rome.nom,
              code: rome.rome_coderome,
              id: rome.id,
            };
          })
        );
        setcompetanceglobal(reponsemetie.fiche_competance_global);
        setLoading(false);
        settableloagin({ isLoading: false });
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
        setError("Une erreur s'est produite lors de l'appele serveur");
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading, setError, setfichecompetance, setlistrome]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [EditModalOpen, setEditModalOpen] = useState(false);
  const setEditingRow = (row) => {
    console.log(row);
    const data = row.original.briquesCompetencesNiveaux;
    const groupedData = {};
    data.forEach((item) => {
      let topush = {};
      const categorie = item.briquescompetances.compGb.compGbCategorie;
      if (!groupedData[categorie]) {
        groupedData[categorie] = [];
      }
      topush.niveau = item.niveau;
      topush.brqCompTitre = item.briquescompetances.brqCompTitre;
      topush.id = item.briquescompetances.id;
      topush.etat = "non";
      groupedData[categorie].push(topush);
    });
    console.log("groupedData", groupedData);
    let accredit = row.original.accreditation.map((acc) => {
      return {
        accreditaiontitre: acc.accreTitre,
        acrreditationvalue: acc.value,
        id: acc.id,
      };
    });
    setAccreditationlist(accredit);
    setappelationlist([row.original.appelation]);
    setcompetance(groupedData);
    setactiveeditrow(row.original.appelation);
    setEditModalOpen(true);
  };
  const handleselectionrome = (e) => {
    setloadingrome(true);
    setOpen(false);
    getdatarome(matierselectionner.code)
      .then((reponsemetie) => {
        const data = reponsemetie.briquecompetance;
        const groupedData = {};
        data.forEach((item) => {
          const categorie = item.compGb.compGbCategorie;
          if (!groupedData[categorie]) {
            groupedData[categorie] = [];
          }
          item.niveau = 0;
          groupedData[categorie].push(item);
        });
        setcompetance(groupedData);
        setloadingrome(false);
        setCreateModalOpen(true);
        setappelationlist(
          reponsemetie.appelation.map((x) => {
            return { ...x, label: x.emploiTitre };
          })
        );
        setOpen(false);
      })
      .catch((error) => {
        console.error("bakend error:", error.message);
        setloadingrome(false);
        setOpen(false);
      });
  };
  const handleCreateNewRow = (values, elementsCoches, accreditationlist) => {
    setLoading(true);
    postcompetance(
      values,
      elementsCoches,
      accreditationlist,
      matierselectionner.id
    )
      .then((data) => {
        setcompetanceglobal(data.fiche_competance_global);
        setfichecompetance(data.fiche_competance);
        setLoading(false);
      })
      .catch((error) => {
        setError("bakend error");
        console.error("bakend error:", error.message);
        setLoading(false);
      });
  };

  const handleSaveEditRow = (
    elementsCoches,
    accreditationlist,
    nouvellecompetance
  ) => {
    console.log(activeeditrow);
    setLoading(true);
    const values = {
      emploistitre: activeeditrow.emploiTitre,
      emploisid: activeeditrow.id,
      titre: activeeditrow.emploiTitre,
    };
    postcompetance(
      values,
      elementsCoches,
      accreditationlist,
      activeeditrow.romeData.id,
      nouvellecompetance
    )
      .then((data) => {
        setcompetanceglobal(data.fiche_competance_global);
        setfichecompetance(data.fiche_competance);
        setLoading(false);
      })
      .catch((error) => {
        setError("bakend error");
        console.error("bakend error:", error.message);
        setLoading(false);
      });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "ficCompTitreEmploi",
        header: "Titre",
        enableColumnOrdering: true,
        enableEditing: true,
        enableSorting: true,
        Cell: ({ cell, column, row }) => (
          <Link to={`/competancedetail/${row.original.id}`}>
            {cell.getValue()}
          </Link>
        ),
      },
      {
        accessorKey: "ficCompVersion",
        header: "Version",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "createdAt",
        header: "Date création",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
        Cell: ({ cell }) => datefonctionun(cell.getValue()),
      },
    ],
    []
  );
  // Affichez les données récupérées
  return (
    <Paper sx={{ mt: 2, width: "100%", color: "black.main" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingrome}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxHeight: 435,
            overflow: "hidden",
          },
        }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle color="button.main">Sélectionner le code Rome</DialogTitle>
        <DialogContent dividers>
          <Autocomplete
            sx={{
              m: 2,
              width: "90%",
            }}
            disablePortal
            options={listrome}
            onChange={(e, value) => {
              if (value != null) setmatierselectionner(value);
              else setmatierselectionner({});
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                label="Rome"
                name="rome"
                variant="outlined"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={(e) => setOpen(false)}>
            Annuler
          </Button>
          <Button
            onClick={handleselectionrome}
            color="button"
            variant="contained"
            sx={{ color: "black.main" }}
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          state={tableloagin}
          renderDetailPanel={({ row }) => {
            let donnees = row.original.briquesCompetencesNiveaux;
            const groupedData = {};
            donnees.forEach((item) => {
              const categorie = item.briquescompetances.compGb.compGbCategorie;
              const titre = item.briquescompetances.compGb.compGbTitre;
              if (!groupedData[categorie]) {
                groupedData[categorie] = {};
              }
              if (!groupedData[categorie][titre]) {
                groupedData[categorie][titre] = [];
              }
              groupedData[categorie][titre].push(item);
            });
            return (
              <Box
                sx={{
                  margin: "auto",
                  gridTemplateColumns: "1fr 1fr",
                  width: "100%",
                }}
              >
                {"SAVOIRS FAIRE" in groupedData ? (
                  <PartCompetanceShow
                    groupedData={groupedData}
                    type={"SAVOIRS FAIRE"}
                    titre={"Savoir-faire"}
                  />
                ) : null}
                {"SAVOIRS" in groupedData ? (
                  <PartCompetanceShow
                    groupedData={groupedData}
                    type={"SAVOIRS"}
                    titre={"Savoirs"}
                  />
                ) : null}
                {"SAVOIR ÊTRE" in groupedData ? (
                  <PartCompetanceShow
                    groupedData={groupedData}
                    type={"SAVOIR ÊTRE"}
                    titre={"Savoirs être"}
                  />
                ) : null}
              </Box>
            );
          }}
          initialState={{ columnVisibility: { id: false } }}
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columns}
          data={fichecompetance}
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
              Générer les fiches de competénces
            </Button>
          )}
          enableEditing
          onEditingRowSave={(e) => console.log(e)}
          onEditingRowCancel={(e) => console.log(e)}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="right" title="Edit">
                <IconButton onClick={(e) => setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          localization={MRT_Localization_FR}
        />
        <CreateNewCompetanceModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
          rome={matierselectionner}
          competance={competance}
          appelationlist={appelationlist}
          setcompetance={setcompetance}
        />
        <EditCompetanceModal
          open={EditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleSaveEditRow}
          competance={competance}
          setcompetance={setcompetance}
          activeeditrow={activeeditrow}
          competanceglobal={competanceglobal}
          accreditationlist={accreditationlist}
          setAccreditationlist={setAccreditationlist}
        />
      </ThemeProvider>
    </Paper>
  );
}

export default CompetanceScreen;
