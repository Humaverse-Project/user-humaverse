import React, { useState, useEffect, useMemo } from "react";
import { listmetiermetier, getdatarome, postmetier } from "../../../services/MetierService";
import MaterialReactTable from "material-react-table";
import Paper from "@mui/material/Paper";
import CreateMetierModal from "./Modal/CreateMetierModal";
import { Backdrop, Box, Button, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { datefonctionun, datefonctiondeux } from "../../../services/DateFormat";
import RomeSelectModal from "./Modal/RomeSelectModal";
import { DeleteForever, Edit } from "@mui/icons-material";
import CreateNewCompetanceModal from "./Modal/NewCompetanceModal";
import {
  postcompetance
} from "../../../services/CompetanceService";
// Swal pour les notifications
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);


function MetierScreen({ setLoading, setError }) {
  const [open, setOpen] = useState(false);
  const [datacompetance, setdatacompetance] = useState([]);
  const [datacompetancedata, setdatacompetancedata] = useState([]);
  const [postedata, setPostedata] = useState([]);
  const [tableloagin, settableloagin] = useState({ isLoading: true });
  const [matierselectionner, setmatierselectionner] = useState({});
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
    const fetchData = async (setLoading, setError) => {
      try {
        const datacompetanceexistant = await listmetiermetier();
        const reponsecompetance = await datacompetanceexistant;
        console.log(reponsecompetance)
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
  const [createCompetanceModalOpen, setcreateCompetanceModalOpen] = useState(false);
  
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
        header: "Intitulé Métier ROME",
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
  const handleselectionrome = (e) => {
    setloadingrome(true);
    setOpen(false);
    getdatarome(matierselectionnerv1.code)
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
  const handleCreateNewRow = async (agrementlist, ficheslist, conditionlist, newnode) => {
    newnode.romeid = matierselectionner.id
    const datametierexistant = await postmetier(agrementlist, ficheslist, conditionlist, newnode);
    const reponsemetie = await datametierexistant;
    setPostedata(reponsemetie.postelist);
    setlistrome(
      reponsemetie.rome.map((rome) => {
        return {
          label: rome.rome_coderome + " " + rome.nom,
          code: rome.rome_coderome,
          id: rome.id,
        };
      })
    );
    settableloagin({ isLoading: false });
    MySwal.fire({
      text: "Le fiche metier a été créée avec succès",
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
          enableEditing
          localization={MRT_Localization_FR}
          positionActionsColumn="last"
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip
                arrow
                placement="right"
                title={`Modifier -> ${row.original.rome_coderome}`}
              >
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
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
