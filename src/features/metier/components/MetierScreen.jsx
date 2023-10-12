import React, { useState, useEffect, useMemo } from "react";
import { listmetiermetier, getdatarome, postmetier, deletemetier } from "../../../services/MetierService";
import MaterialReactTable from "material-react-table";
import Paper from "@mui/material/Paper";
import CreateMetierModal from "./Modal/CreateMetierModal";
import { Backdrop, Box, Button, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import RomeSelectModal from "./Modal/RomeSelectModal";
import { DeleteForever, Edit } from "@mui/icons-material";
import CreateNewCompetanceModal from "./Modal/NewCompetanceModal";
import EditMetierModal from "./Modal/EditMetierModal";
import { datefonctionun } from "../../../services/DateFormat";
import {
  postcompetance
} from "../../../services/CompetanceService";
// Swal pour les notifications
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


function MetierScreen() {

  const [loadingFetchData, setLoadingFetchData] = useState(true);
  const [errorFetchData, setErrorFetchData] = useState("");
  const [open, setOpen] = useState(false);
  const [datacompetance, setdatacompetance] = useState([]);
  const [datacompetancedata, setdatacompetancedata] = useState([]);
  const [postedata, setPostedata] = useState([]);
  const [postedatanamelist, setpostedatanamelist] = useState([]);
  const [matierselectionner, setmatierselectionner] = useState({});
  const [selectedpostdata, setselectedpostdata] = useState({});
  const [matierselectionnerv1, setmatierselectionnerv1] = useState({});
  const [listrome, setlistrome] = useState([]);
  const [loadingrome, setloadingrome] = useState(false);
  const [appelationlist, setappelationlist] = useState([]);
  const [contextlist, setcontextlist] = useState([]);
  const [competance, setcompetance] = useState({});
  const [competanceglobal, setcompetanceglobal] = useState([]);
  const [accreditationlist, setAccreditationlist] = useState([]);
  const [fichecompetance, setfichecompetance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datacompetanceexistant = await listmetiermetier();
        const reponsecompetance = await datacompetanceexistant;
        setPostedata(reponsecompetance.postelist);
        setpostedatanamelist(reponsecompetance.postelist.map(item => item.titre))
        setlistrome(
          reponsecompetance.rome.map((rome) => {
            return {
              label: rome.rome_coderome + " " + rome.nom,
              code: rome.rome_coderome,
              id: rome.id,
            };
          })
        );
        setLoadingFetchData(false);
      } catch (error) {
        setErrorFetchData(error);
        setLoadingFetchData(false);
      }
    };
    fetchData();
  }, []);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editMetierModal, setEditMetierModalOpen] = useState(false);
  const [createCompetanceModalOpen, setcreateCompetanceModalOpen] = useState(false);
  const handledeleteevent = (id, name) => {
    setLoadingFetchData(true);
    deletemetier(id).then((data) => {
      setPostedata(data.postelist);
      setpostedatanamelist(data.postelist.map(item => item.titre))
      setLoadingFetchData(false);
      Swal.fire({
        text: `${name} a été supprimer avec succès`,
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
      setErrorFetchData(error);
      setLoadingFetchData(false);
    });
  }
  const columns = useMemo(
    () => [
      {
        accessorKey: "titre",
        header: "Intitulé Emploi",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: "emplois.emploiTitre",
        header: "Intitulé Métier",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "rome.codeRome",
        header: "Code ROME",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      },
      {
        accessorKey: "rome.titre",
        header: "Libellé ROME",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
      }
    ],
    []
  );

  // Data competence eto izany dia data competence an'i creation
  const handleselectionrome = (e, edit, rome={}) => {
    setloadingrome(true);
    setOpen(false);
    let code = ""
    if (edit) {code = rome.rome.code; setselectedpostdata(rome)}
    else{code = matierselectionnerv1.code}
    getdatarome(code)
      .then((reponsemetie) => {
        setloadingrome(false);
        console.log(reponsemetie)
        if (edit) {
          setEditMetierModalOpen(true)
        } else {
          setCreateModalOpen(true)
        }
        setmatierselectionner(reponsemetie.rome)
        let appelationsall = reponsemetie.appelation.map((x) => {
          return { ...x, label: x.emploiTitre };
        })
        var nameappelation = postedata.map(item => item.emplois.emploiTitre);
        appelationsall = appelationsall.filter(item => !nameappelation.includes(item.label));
        setappelationlist(appelationsall);
        const data = reponsemetie.briquecompetancerome;
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
  const handleCreateNewRow = async (agrementlist, ficheslist, conditionlist, newnode, type) => {
    newnode.romeid = matierselectionner.id
    const datametierexistant = await postmetier(agrementlist, ficheslist, conditionlist, newnode);
    const reponsemetie = await datametierexistant;
    setPostedata(reponsemetie.postelist);
    setpostedatanamelist(reponsemetie.postelist.map(item => item.titre))
    let message = ""
    if (type === "create") {
      message = "Le fiche metier a été créée avec succès"
    } else {
      message = "Le fiche metier a été modifier avec succès"
    }
    MySwal.fire({
      text: message,
      target: "#custom-target",
      customClass: {
        container: "position-absolute",
      },
      toast: true,
      position: "top-right",
    });
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
          setmatierselectionner={setmatierselectionnerv1}
          setOpen={setOpen}
          handleselectionrome={(e)=>handleselectionrome(e, false)}
          listrome={listrome}
        />
      )}
      <ThemeProvider theme={theme}>
        <MaterialReactTable
          initialState={{ columnVisibility: { id: false } }}
          state={{
            isLoading: loadingFetchData,
            error: errorFetchData,
          }}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                margin: "auto",
                gridTemplateColumns: "1fr 1fr",
                width: "100%",
              }}
            >
              <Typography>
                <b>Conventions collectives:</b>{" "}
              </Typography>
              <Typography
                sx={{ color: "black.main" }}
                dangerouslySetInnerHTML={{
                  __html: row.original.convention.replaceAll(
                    "\\n",
                    "<br>"
                  ),
                }}
              ></Typography>
              <Typography>
                <b>Activité: </b>
              </Typography>
              <Typography
                sx={{ color: "black.main" }}
                dangerouslySetInnerHTML={{
                  __html: row.original.activite.replaceAll(
                    "\\n",
                    "<br>"
                  ),
                }}
              ></Typography>
              <Typography>
                <b>Définition des tâches: </b>
              </Typography>
              <Typography
                sx={{ color: "black.main" }}
                dangerouslySetInnerHTML={{
                  __html: row.original.definition.replaceAll(
                    "\\n",
                    "<br>"
                  ),
                }}
              ></Typography>
              <Typography>
                <b>Formation - Expérience nécessaire: </b>
              </Typography>
              <Typography
                sx={{ color: "black.main" }}
                dangerouslySetInnerHTML={{
                  __html: row.original.formation.replaceAll(
                    "\\n",
                    "<br>"
                  ),
                }}
              ></Typography>
              <Typography>
                <b>Date de création: </b>
              </Typography>
              <Typography
                sx={{ color: "black.main" }}
              > {datefonctionun(row.original.createdAt)}</Typography>
              <Typography>
                <b>Date dernier modification: </b>
              </Typography>
              <Typography
                sx={{ color: "black.main" }}
              > {datefonctionun(row.original.UpdatedAt)}</Typography>
              <Typography>
                <b>Version: </b>
              </Typography>
              <Typography
                sx={{ color: "black.main" }}
              > {datefonctionun(row.original.version)}</Typography>
            </Box>
          )}
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
              Créer une fiche metier
            </Button>
          )}
          enableEditing
          localization={MRT_Localization_FR}
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip
                arrow
                placement="right"
                title={`Modifier -> ${row.original.titre}`}
              >
                <IconButton onClick={(e)=>handleselectionrome(e, true, row.original)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip
                arrow
                placement="right"
                title={`Supprimer -> ${row.original.titre}`}
              >
                <IconButton
                  onClick={(e) => {
                    MySwal.fire({
                      title: "Suppression",
                      text: `Etes-vous sûr de supprimer le métier : ${row.original.titre}?`,
                      icon: "error",
                      showCancelButton: true,
                      confirmButtonText: "Oui, supprimez-le!",
                      cancelButtonText: "Non, annuler!",
                      reverseButtons: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handledeleteevent(row.original.id, row.original.titre)
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
          <CreateMetierModal
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
            datacompetance={datacompetance}
            matierselectionner={matierselectionner}
            appelationlist={appelationlist}
            datacompetancedata={datacompetancedata}
            contextlist={contextlist}
            createCompetanceModalOpen={(e)=> setcreateCompetanceModalOpen(true)}
            postedatanamelist={postedatanamelist}
          />
        )}
        { editMetierModal && (
          <EditMetierModal
            open={editMetierModal}
            onClose={() => setEditMetierModalOpen(false)}
            onSubmit={handleCreateNewRow}
            datacompetance={datacompetance}
            matierselectionner={matierselectionner}
            appelationlist={appelationlist}
            datacompetancedata={datacompetancedata}
            contextlist={contextlist}
            selectedpostdata={selectedpostdata}
          />
        )}
        {createCompetanceModalOpen && (
          <CreateNewCompetanceModal
            open={createCompetanceModalOpen}
            onClose={() => setcreateCompetanceModalOpen(false)}
            rome={matierselectionnerv1}
            competance={competance}
            appelationlist={appelationlist}
            setcompetance={setcompetance}
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

export default MetierScreen;
