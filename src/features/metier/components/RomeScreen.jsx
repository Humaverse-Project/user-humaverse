import theme from "./theme";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import MaterialReactTable from "material-react-table";
import { Edit } from "@mui/icons-material";
import { datefonctionun } from "../../../services/DateFormat";
import { listrome, updaterome } from "../../../services/RomeService";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";

function RomeScreenScreen() {
  const [listromedata, setlistrome] = useState([]);
  const [selectedmetier, setNewnode] = useState({});

  // local state management
  // fetch data
  const [loadingFetchData, setLoadingFetchData] = useState(false);
  const [errorFetchData, setErrorFetchData] = useState("");

  useEffect(() => {
    setLoadingFetchData(true);
    const fetchData = async () => {
      try {
        const datametierexistant = await listrome();
        const reponsemetie = await datametierexistant;
        setlistrome(reponsemetie);
        setLoadingFetchData(false);
      } catch (error) {
        setErrorFetchData(error);
        setLoadingFetchData(false);
      }
    };
    fetchData();
  }, [setLoadingFetchData, setErrorFetchData]);

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
    if (selectedmetier.rome_definition === undefined) {
      selectedmetier.rome_definition = values.rome_definition;
    }
    if (selectedmetier.rome_acces_metier === undefined) {
      selectedmetier.rome_acces_metier = values.rome_acces_metier;
    }
    selectedmetier.id = values.id;
    setLoadingFetchData(true);
    updaterome(selectedmetier)
      .then((data) => {
        setlistrome([...data]);
        setLoadingFetchData(false);
        handleCancelRowEdits();
      })
      .catch((error) => {
        setErrorFetchData(error);
        setLoadingFetchData(false);
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
        size: 80,
      },
      {
        accessorKey: "rome_coderome",
        header: "Code Rome",
        size: 140,
        enableEditing: false,
        enableClickToCopy: true,
        Cell: ({ cell, column }) => (
          <Link to={`/metierdetail/${cell.getValue()}`}>{cell.getValue()}</Link>
        ),
      },
      {
        accessorKey: "nom",
        header: "Libellé Rome",
        size: 140,
        enableClickToCopy: true,
        Edit: ({ cell, column, table }) => (
          <TextField
            defaultValue={cell.getValue()}
            key="nom"
            label="Libellé Rome"
            name="nom"
            variant="outlined"
            onChange={handleChange}
            sx={{
              width: "100%",
            }}
          />
        ),
      },
      {
        accessorKey: "rome_definition",
        header: "Définition",
        Cell: ({ cell }) => (
          <div
            dangerouslySetInnerHTML={{
              __html: cell.getValue().replaceAll("\\n", "<br>"),
            }}
          ></div>
        ),
        size: 140,
        enableClickToCopy: true,
        Edit: ({ cell, column, table }) => (
          <TextField
            key="rome_definition"
            variant="outlined"
            label="Définition"
            name="rome_definition"
            defaultValue={cell.getValue()}
            InputProps={{
              multiline: true,
            }}
            onChange={handleChange}
          />
        ),
      },
      {
        accessorKey: "rome_acces_metier",
        header: "Access metier",
        size: 140,
        enableHiding: true,
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          <div
            dangerouslySetInnerHTML={{
              __html: cell.getValue().replaceAll("\\n", "<br>"),
            }}
          ></div>
        ),
        Edit: ({ cell, column, table }) => (
          <TextField
            defaultValue={cell.getValue()}
            key="rome_acces_metier"
            label="Access metier"
            name="rome_acces_metier"
            InputProps={{
              multiline: true,
            }}
            onChange={handleChange}
            sx={{
              width: "100%",
              my: 2,
            }}
          />
        ),
      },
      {
        accessorKey: "created_at.date",
        header: "Date création",
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
        Cell: ({ cell }) => datefonctionun(cell.getValue()),
      },
    ],
    [handleChange]
  );
  // Affichez les données récupérées
  return (
    <Paper sx={{ mt: 2, width: "100%", color: "black.main" }}>
      <ThemeProvider theme={theme}>
        <MaterialReactTable
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
                <b>Définition:</b>{" "}
              </Typography>
              <Typography
                sx={{ color: "black.main" }}
                dangerouslySetInnerHTML={{
                  __html: row.original.rome_definition.replaceAll(
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
                  __html: row.original.rome_acces_metier.replaceAll(
                    "\\n",
                    "<br>"
                  ),
                }}
              ></Typography>
            </Box>
          )}
          initialState={{
            columnVisibility: {
              id: false,
              rome_acces_metier: false,
              rome_definition: false,
            },
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
          data={listromedata}
          editingMode="modal"
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
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
          localization={MRT_Localization_FR}
        />
      </ThemeProvider>
    </Paper>
  );
}

export default RomeScreenScreen;
