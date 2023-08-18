import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { authenticateClient, getFicheMetierData } from '../../../services/PoleEmploisService';
import { listmetier, postmetier, updatemetier, deletemetier } from '../../../services/MetierService';
import MaterialReactTable from 'material-react-table';
import Paper from '@mui/material/Paper';
import CreateNewMetierModal from './NewMetierModal';
import {
    Box,
    Button,
    IconButton,
    TextField,
    Tooltip,
    Autocomplete
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';

function MetierScreen({setLoading, setError}) {
    const [datatable, setTableData] = useState([]);
    const [metierlistdata, setMetierlistdata] = useState([]);
    const [metiercodedata, setMetiercodedata] = useState([]);
    const [selectedmetier, setNewnode] = useState({
        nom: "",
        code: ""
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const access = await authenticateClient();
                const datametierexistant = await listmetier();
                const dataaccess = await access;
                const reponsemetie = await datametierexistant;
                setTableData(reponsemetie);
                const metier = await getFicheMetierData(dataaccess.access_token);
                const datametier = await metier;
                const formattedData = datametier.map((item) => ({
                    code: item.code,
                    libelle: item.metier.libelle,
                }));
                const formattedmetier = formattedData.map((item) => ({
                    'label': item.libelle
                }));
                setMetierlistdata(formattedmetier)
                const formattedDatacode = formattedData.map((item) => ({
                    'label': item.code
                }));
                setMetiercodedata(formattedDatacode)
              setLoading(false);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError("Une erreur s'est produite lors de l'appele serveur");
              setLoading(false);
            }
        };
        fetchData();
    }, [setLoading, setLoading]);
    
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const handleCreateNewRow = (values) => {
        setLoading(true);
        postmetier(values)
        .then((data) => {
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
            selectedmetier.descriptionP = values.descriptionP
        }
        selectedmetier.id = values.id
        console.log(selectedmetier)
        setLoading(true);
        updatemetier(selectedmetier)
        .then((data) => {
            setTableData([...data]);
            setLoading(false);
        })
        .catch((error) => {
            setError('bakend error');
            console.error('bakend error:', error.message);
            setLoading(false);
        });
    };

    const handleDeleteRow = useCallback(
        (row) => {
            datatable.splice(row.index, 1);
            setTableData([...datatable]);
            setLoading(true);
            deletemetier(row.original.id)
            .then((data) => {
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
                        onChange={(e) =>
                            setNewnode({ ...selectedmetier, [e.target.name]: e.target.value })
                        }
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
        [metiercodedata, metierlistdata, selectedmetier],
    );
    // Affichez les données récupérées
    return (
        <Paper sx={{ mt: 2, width: '100%', color:'black.main' }}>
            <MaterialReactTable
                initialState={{ columnVisibility: { descriptionC: false,  descriptionL: false} }}
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
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
                metierlist={metierlistdata}
                codelist={metiercodedata}
            />
        </Paper>
    );
}

export default MetierScreen