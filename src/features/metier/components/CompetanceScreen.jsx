import {
  Box,
  Button,
  Dialog,
  Tooltip,
  Backdrop,
  TextField,
  IconButton,
  DialogTitle,
  Autocomplete,
  DialogActions,
  DialogContent,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import theme from "./theme";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import {
  listcompetance,
  postcompetance,
  deletecompetance
} from "../../../services/CompetanceService";
import MaterialReactTable from "material-react-table";
import EditCompetanceModal from "./Modal/EditCompetanceModal";
import { DeleteForever, Edit } from "@mui/icons-material";
import React, { useState, useEffect, useMemo } from "react";
import CreateNewCompetanceModal from "./Modal/NewCompetanceModal";
import { getdatarome } from "../../../services/RomeService";
import PartCompetanceShow from "./partie/PartCompetanceShow";
import { datefonctionun } from "../../../services/DateFormat";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import RomeSelectModal from "./Modal/RomeSelectModal";
// Swal Notification
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function CompetanceScreen() {
  const [open, setOpen] = useState(false);
  const [listrome, setlistrome] = useState([]);
  const [competance, setcompetance] = useState({});
  const [loadingrome, setloadingrome] = useState(false);
  const [activeeditrow, setactiveeditrow] = useState({});
  const [appelationlist, setappelationlist] = useState([]);
  const [fichecompetance, setfichecompetance] = useState([]);
  const [competanceglobal, setcompetanceglobal] = useState([]);
  const [accreditationlist, setAccreditationlist] = useState([]);
  const [matierselectionner, setmatierselectionner] = useState({});

  // state local management Fetch data
  const [errorFetchData, setErrorFetchData] = useState("");
  const [loadingFetchData, setLoadingFetchData] = useState(false);

  // state local management Create Competence Modal Modal
  const [EditModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    setLoadingFetchData(true);
    const fetchData = async () => {
      try {
        const datametierexistant = await listcompetance();
        const reponsemetie = await datametierexistant;
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
        setLoadingFetchData(false);
      } catch (error) {
        setLoadingFetchData(false);
        setErrorFetchData(error);
      }
    };
    fetchData();
  }, [setLoadingFetchData, setErrorFetchData, setfichecompetance, setlistrome]);

  // Data competence eto izany dia data competence an'i edit
  const setEditingRow = (row) => {
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
      topush.compGb = item.briquescompetances.compGb;
      groupedData[categorie].push(topush);
    });
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

  // Data competence eto izany dia data competence an'i creation
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
        setloadingrome(false);
        setOpen(false);
      });
  };

  const handledeleteevent = (id, name) => {
    setloadingrome(true);
    deletecompetance(id).then((data) => {
      setcompetanceglobal(data.fiche_competance_global);
      setfichecompetance(data.fiche_competance);
      setloadingrome(false);
      Swal.fire({
        text: `${name} a été modifié avec succès`,
        target: "#custom-target",
        icon: "success",
        customClass: {
          container: "position-absolute",
        },
        toast: true,
        position: "top-right",
      });
    })
    .catch((error) => {
      setloadingrome(false);
    });
  }

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
        header: "Intitulé Métier",
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
        accessorFn: (row) => row.appelation.romeData.rome_coderome,
        header: "Code Rome",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
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
          state={{ isLoading: loadingFetchData, error: errorFetchData }}
          // enableEditing
          // onEditingRowSave={(e) => console.log(e)}
          // onEditingRowCancel={(e) => console.log(e)}
          columns={columns}
          data={fichecompetance}
          enableColumnOrdering
          localization={MRT_Localization_FR}
          initialState={{ columnVisibility: { id: false } }}
          enableRowActions
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
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
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
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip
                arrow
                placement="right"
                title={`Modifier -> ${row.original.ficCompTitreEmploi}`}
              >
                <IconButton onClick={(e) => setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip
                arrow
                placement="right"
                title={`Supprimer -> ${row.original.ficCompTitreEmploi}`}
              >
                <IconButton
                  onClick={(e) => {
                    MySwal.fire({
                      title: "Suppression",
                      text: `Etes-vous sûr de supprimer le compétence de l'emploi : ${row.original.ficCompTitreEmploi}?`,
                      icon: "error",
                      showCancelButton: true,
                      confirmButtonText: "Oui, supprimez-le!",
                      cancelButtonText: "Non, annuler!",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handledeleteevent(row.original.id, row.original.ficCompTitreEmploi)
                      }
                    });
                  }}
                >
                  <DeleteForever />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
        {createModalOpen && (
          <CreateNewCompetanceModal
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            rome={matierselectionner}
            competance={competance}
            appelationlist={appelationlist}
            setcompetance={setcompetance}
            competanceglobal={competanceglobal}
            setcompetanceglobal={setcompetanceglobal}
            setfichecompetance={setfichecompetance}
            accreditationlist={accreditationlist}
            setAccreditationlist={setAccreditationlist}
            matierselectionner={matierselectionner}
            postcompetance={postcompetance}
          />
        )}
        {EditModalOpen && (
          <EditCompetanceModal
            open={EditModalOpen}
            onClose={() => setEditModalOpen(false)}
            competance={competance}
            setcompetance={setcompetance}
            activeeditrow={activeeditrow}
            competanceglobal={competanceglobal}
            setcompetanceglobal={setcompetanceglobal}
            setfichecompetance={setfichecompetance}
            accreditationlist={accreditationlist}
            setAccreditationlist={setAccreditationlist}
            postcompetance={postcompetance}
          />
        )}
      </ThemeProvider>
    </Paper>
  );
}

export default CompetanceScreen;
