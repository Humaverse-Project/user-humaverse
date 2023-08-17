import HeaderInScreen from '../../header/HeaderInScreen'
import { LoadingAPI } from '../../../shared'
import { LeftMenu } from '../../../shared'
import React, { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { authenticateClient, getFicheMetierData } from '../../../services/PoleEmploisService';
import { listmetier, postmetier, updatemetier, deletemetier } from '../../../services/MetierService';
import MaterialReactTable from 'material-react-table';
import { useTheme } from '@mui/material/styles'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Autocomplete
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';

function MetierScreen() {
    const theme = useTheme()
    const page = 'COMPETENCES'
    const [data, setData] = useState([]);
    const [datatable, setTableData] = useState([]);
    const [metierlistdata, setMetierlistdata] = useState([]);
    const [metiercodedata, setMetiercodedata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [selectedmetier, setNewnode] = useState({
        nom: "",
        code: ""
    });
    useEffect(() => {
      authenticateClient()
        .then((data) => {
          setAccessToken(data.access_token);
          getFicheMetierData(data.access_token)
            .then((data) => {
                const formattedData = data.map((item) => ({
                    code: item.code,
                    libelle: item.metier.libelle,
                }));
                setData(formattedData);
                const formattedmetier = formattedData.map((item) => ({
                    'label': item.libelle
                }));
                setMetierlistdata(formattedmetier)
                const formattedDatacode = data.map((item) => ({
                    'label': item.code
                }));
                setMetiercodedata(formattedDatacode)
                console.log()
              setLoading(false);
            })
            .catch((error) => {
              setError(error.message);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error('Authentication error:', error.message);
          setLoading(false);
        });
        listmetier()
            .then((data) => {
                console.log(data)
                setTableData(data);
                setLoading(false);
        })
        .catch((error) => {
          console.error('bakend error:', error.message);
          setError('bakend error');
          setLoading(false);
        });
    }, []);
    
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleCreateNewRow = (values) => {
        setLoading(true);
        postmetier(values)
        .then((data) => {
            console.log(data)
            // setTableData(data);
            setTableData([...data]);
            setLoading(false);
        })
        .catch((error) => {
            setError('bakend error');
            console.error('bakend error:', error.message);
            setLoading(false);
        });
        
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if(values.code !== ""){
            selectedmetier.code = values.code
        }
        if(values.nom !== ""){
            selectedmetier.nom = values.nom
        }
        if(values.descriptionC !== ""){
            selectedmetier.descriptionC = values.descriptionC
        }
        if(values.descriptionP !== ""){
            selectedmetier.descriptionC = values.descriptionP
        }
        selectedmetier.id = values.id
        console.log(selectedmetier)
        setLoading(true);
        updatemetier(selectedmetier)
        .then((data) => {
            console.log(data)
            // setTableData(data);
            setTableData([...data]);
            setLoading(false);
        })
        .catch((error) => {
            setError('bakend error');
            console.error('bakend error:', error.message);
            setLoading(false);
        });
        // if (!Object.keys(validationErrors).length) {
        //     datatable[row.index] = values;
        //     setTableData([...datatable]);
        //     exitEditingMode();
        // }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row) => {
            datatable.splice(row.index, 1);
            setTableData([...datatable]);
            console.log(row.original.id)
            setLoading(true);
            deletemetier(row.original.id)
            .then((data) => {
                console.log(data)
                // setTableData(data);
                setTableData([...data]);
                setLoading(false);
            })
            .catch((error) => {
                setError('bakend error');
                console.error('bakend error:', error.message);
                setLoading(false);
            });
        },
        [datatable],
    );
    
    const columns = useMemo(
        () => [
          {
            accessorKey: 'id',
            header: 'ID',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true,
            size: 80,
          },
          {
            accessorKey: 'code',
            header: 'Code Rome',
            size: 140,
            Edit: ({ cell, column, table }) => <Autocomplete
                defaultValue={cell.getValue()}
                sx={{
                    width: '100%',
                }}
                disablePortal
                options={metiercodedata}
                onChange={(e, value) =>
                    setNewnode({ ...selectedmetier, nom: value.label })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        label="Code" 
                        name="code"
                        variant="outlined"
                    />
                )}
            />,
          },
          {
            accessorKey: 'nom',
            header: 'Nom',
            size: 140,
            Edit: ({ cell, column, table }) => <Autocomplete
                defaultValue={cell.getValue()}
                sx={{
                    width: '100%',
                }}
                disablePortal
                options={metierlistdata}
                onChange={(e, value) =>
                    setNewnode({ ...selectedmetier, code: value.label })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        label="Nom" 
                        name="nom"
                        variant="outlined"
                    />
                )}
            />
          },
          {
            accessorKey: 'descriptionC',
            header: 'Decription courte',
            size: 140,
            enableHiding: true,
            Edit: ({ cell, column, table }) => <TextField
                defaultValue={cell.getValue()}
                key="descriptionC"
                label="description courte"
                name="descriptionC"
                onChange={(e) =>
                    setNewnode({ ...selectedmetier, [e.target.name]: e.target.value })
                }
                sx={{
                    width: '100%',
                }}
            />
          },
          {
            accessorKey: 'descriptionL',
            header: 'Decription longue',
            size: 140,
            enableHiding: true,
            Edit: ({ cell, column, table }) => <TextField
                defaultValue={cell.getValue()}
                key="descriptionL"
                label="description longue"
                name="descriptionL"
                onChange={(e) =>
                    setNewnode({ ...selectedmetier, [e.target.name]: e.target.value })
                }
                sx={{
                    width: '100%',
                }}
            />
          },
          {
            accessorKey: 'creation',
            header: 'Date création',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true,
          }
        ],
        [],
    );

    if (loading || error) {
      return (
        <Fragment>
            <HeaderInScreen
                title={page}
            />
            { LoadingAPI (loading, error, page)}
        </Fragment>
      );
    }
  
    // Affichez les données récupérées
    return (
      <Fragment>
        <HeaderInScreen
            title={page}
        />
        <Box
            backgroundColor="background.paper"
            display={'flex'}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height={'auto'}
            minHeight="80vh"
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    {LeftMenu(page)}
                </Grid>
                <Grid item xs={12} md={9}
                    sx={{
                        [theme.breakpoints.up('lg')]: {
                            mt: 5,
                        },
                        [theme.breakpoints.down('sm')]: {
                            my: 1,
                            mx: 0,
                        },
                    }}
                >
                    <Box>
                        
                    </Box>
                    <Paper sx={{ mt: 2, width: '100%', color:'black.main' }}>
                        <MaterialReactTable
                            initialState={{ columnVisibility: { description_c: false,  description_l: false} }}
                            displayColumnDefOptions={{
                            'mrt-row-actions': {
                                muiTableHeadCellProps: {
                                align: 'center',
                                },
                                size: 120,
                            },
                            }}
                            columns={columns}
                            data={datatable}
                            editingMode="modal"
                            enableColumnOrdering
                            enableEditing
                            onEditingRowSave={handleSaveRowEdits}
                            onEditingRowCancel={handleCancelRowEdits}
                            muiBottomToolbarProps = {{
                                sx: {
                                    backgroundColor: 'unset'
                                },
                            }}
                            muiTopToolbarProps = {{
                                sx: {
                                    backgroundColor: 'unset'
                                },
                            }}
                            muiTableBodyProps={{
                                sx: {
                                    '& tr:nth-of-type(odd)': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                },
                            }}
                            muiTableBodyCellProps={{
                                sx: {
                                    color: 'black.main'
                                },
                            }}
                            muiTableBodyRowProps={{
                                sx: {
                                    ':hover td': {
                                        backgroundColor: '#f5f5f5',
                                    },
                                    backgroundColor: 'unset',
                                },
                            }}
                            muiTableHeadRowProps={{
                                sx: {
                                    color: 'black.main',
                                    backgroundColor: 'unset'
                                },
                            }}
                            muiTableHeadCellProps={{
                                sx: {
                                    color: 'black.main',
                                    backgroundColor: 'unset'
                                },
                            }}
                            renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Tooltip arrow placement="left" title="Edit">
                                <IconButton onClick={() => table.setEditingRow(row)}>
                                    <Edit />
                                </IconButton>
                                </Tooltip>
                                <Tooltip arrow placement="right" title="Delete">
                                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                    <Delete />
                                </IconButton>
                                </Tooltip>
                            </Box>
                            )}
                            renderTopToolbarCustomActions={() => (
                            <Button
                                color="secondary"
                                onClick={() => setCreateModalOpen(true)}
                                variant="contained"
                            >
                                Ajoute nouveau metier
                            </Button>
                            )}
                            localization={MRT_Localization_FR}
                        />
                        <CreateNewMetierModal
                            columns={columns}
                            open={createModalOpen}
                            onClose={() => setCreateModalOpen(false)}
                            onSubmit={handleCreateNewRow}
                            metierlist={metierlistdata}
                            codelist={metiercodedata}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </Fragment>
    );
}
export const CreateNewMetierModal = ({ open, columns, onClose, onSubmit, metierlist, codelist }) => {
    const formattedData = metierlist
    const formattedDatacode = codelist
    const [newmetier, setNewnode] = useState({
        nom: "",
        code: ""
    });
    const handleChangeMetier = (event, value) => {
      setNewnode({ ...newmetier, nom: value.label });
    };
    const handleChangeCode = (event, value) => {
        setNewnode({ ...newmetier, code: value.label });
    };
  
    const handleSubmit = () => {
      onSubmit(newmetier);
      onClose();
    };
  
    return (
      <Dialog open={open} maxWidth={'md'}>
        <DialogTitle textAlign="center">Crée un métier</DialogTitle>
        <DialogContent  dividers={true}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              <Autocomplete
                sx={{
                    m: 2,
                    width: '90%',
                }}
                disablePortal
                options={formattedDatacode}
                onChange={handleChangeCode}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        label="Code" 
                        name="code"
                        variant="outlined"
                    />
                )}
              />
              <Autocomplete
                sx={{
                    m: 2,
                    width: '90%',
                }}
                freeSolo
                disablePortal
                options={formattedData}
                onChange={handleChangeMetier}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        required
                        label="Nom" 
                        name="nom"
                        variant="outlined"
                    />
                )}
              />
              <TextField
                key="description_c"
                label="description courte"
                name="description_c"
                onChange={(e) =>
                    setNewnode({ ...newmetier, [e.target.name]: e.target.value })
                }
                sx={{
                    m: 2,
                    width: '90%',
                }}
              />
              <TextField
                key="description_l"
                label="description long"
                name="description_l"
                onChange={(e) =>
                    setNewnode({ ...newmetier, [e.target.name]: e.target.value })
                }
                sx={{
                    m: 2,
                    width: '90%',
                }}
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Annuler</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Crée un métier
          </Button>
        </DialogActions>
      </Dialog>
    );
};
export default MetierScreen