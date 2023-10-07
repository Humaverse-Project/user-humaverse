import theme from "./theme";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Edit } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";

// service
import { datefonctionun } from "../../../services/DateFormat";
import { listmetier, updatemetier } from "../../../services/MetierService";

function MetierScreen({ setLoading, setError }) {
  const [listmetierdata, setlistmetier] = useState([]);
  const [selectedmetier, setNewnode] = useState({});
  const [tableloagin, settableloagin] = useState({ isLoading: true });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datametierexistant = await listmetier();
        const reponsemetier = await datametierexistant;
        console.log("reponsemetier", reponsemetier);
        setlistmetier(reponsemetier);
        settableloagin({ isLoading: false });
        setLoading(false);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
        setError("Une erreur s'est produite lors de l'appele serveur");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCancelRowEdits = () => {
    setNewnode({});
  };
  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setNewnode({ ...selectedmetier, [name]: value });
    },
    [setNewnode, selectedmetier]
  );

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (selectedmetier.nom === undefined) {
      selectedmetier.nom = values.nom;
    }
    if (selectedmetier.metier_definition === undefined) {
      selectedmetier.metier_definition = values.metier_definition;
    }
    if (selectedmetier.metier_acces_metier === undefined) {
      selectedmetier.metier_acces_metier = values.metier_acces_metier;
    }
    selectedmetier.id = values.id;
    setLoading(true);
    updatemetier(selectedmetier)
      .then((data) => {
        setlistmetier([...data]);
        setLoading(false);
        handleCancelRowEdits();
      })
      .catch((error) => {
        setError("bakend error");
        console.error("bakend error:", error.message);
        setLoading(false);
      });
  };

  const columns = useMemo(() => [][handleChange]);
  // Affichez les données récupérées
  return (
    <Paper sx={{ mt: 2, width: "100%", color: "black.main" }}>
      {/* <ThemeProvider theme={theme}>
        <MaterialReactTable
          state={tableloagin}
          localization={MRT_Localization_FR}
          columns={columns}
          data={listmetierdata}
          editingMode="modal"
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          initialState={{
            columnVisibility: {
              id: false,
              metier_acces_metier: false,
              metier_definition: false,
            },
          }}
          //   Rendering
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                margin: "auto",
                gridTemplateColumns: "1fr 1fr",
                width: "100%",
              }}
            >
              <Typography>
                <b>Définition:</b>{" "}
              </Typography>
              <Typography
                sx={{ color: "black.main" }}
                dangerouslySetInnerHTML={{
                  __html: row.original.metier_definition.replaceAll(
                    "\\n",
                    "<br>"
                  ),
                }}
              ></Typography>
              <Typography>
                <b>Access metier: </b>
              </Typography>
              <Typography
                sx={{ color: "black.main" }}
                dangerouslySetInnerHTML={{
                  __html: row.original.metier_acces_metier.replaceAll(
                    "\\n",
                    "<br>"
                  ),
                }}
              ></Typography>
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
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="right" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </ThemeProvider> */}
    </Paper>
  );
}

export default MetierScreen;
