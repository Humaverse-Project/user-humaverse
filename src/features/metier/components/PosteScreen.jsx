import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { listcompetance } from '../../../services/CompetanceService';
import { listmetier } from '../../../services/MetierService';
import { listpost, postPoste, updatePoste, deletPoste } from '../../../services/PosteService';
import MaterialReactTable from 'material-react-table';
import Paper from '@mui/material/Paper';
import CreateNewPosteModal from './NewPosteModal';
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

function PosteScreen({setLoading, setError}) {
    const [datatable, setTableData] = useState([]);
    const [metierdata, setMetierdata] = useState([]);
    const [competancedata, setCompetancedata] = useState([]);
    const [selectedmetier, setNewnode] = useState({});
    useEffect(() => {
        const fetchData = async (setLoading, setError) => {
            try {
                const datacompetanceexistant = await listcompetance();
                const reponsecompetance = await datacompetanceexistant;
                const formattedDatacompet = reponsecompetance.map((item) => ({
                    label: item.code,
                    id: item.id
                }));
                setCompetancedata(formattedDatacompet);
                const datametierexistant = await listmetier();
                const metierdataapi = await datametierexistant;
                const formattedDatametier = metierdataapi.map((item) => ({
                    label: item.code,
                    id: item.id
                }));
                setMetierdata(formattedDatametier);
                const dataposteexistant = await listpost();
                const reponseposte = await dataposteexistant;
                setTableData(reponseposte);
                setLoading(false);
            } catch (error) {
                console.error('Une erreur s\'est produite :', error);
                setError("Une erreur s'est produite lors de l'appele serveur");
                setLoading(false);
            }
        };
        fetchData(setLoading, setError);
    }, [setLoading, setError]);
    
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const handleCreateNewRow = (values) => {
        setLoading(true);
        console.log(values)
        postPoste(values)
        .then((data) => {
            setTableData(data);
            setLoading(false);
        })
        .catch((error) => {
            setError('bakend error');
            console.error('bakend error:', error.message);
            setLoading(false);
        });
        
    };
    const handleCancelRowEdits = () => {
        setNewnode({})
    };
    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if(selectedmetier.metier_id === undefined){
            selectedmetier.metier_id = values["metier.id"]
        }
        if(selectedmetier.competance_id === undefined){
            selectedmetier.competance_id = values["competance.id"]
        }
        if(selectedmetier.niveau_competance === undefined){
            selectedmetier.niveau_competance = values.niveauCompetance
        }
        selectedmetier.id = values.id
        setLoading(true);
        updatePoste(selectedmetier)
        .then((data) => {
            setTableData(data);
            setLoading(false);
            handleCancelRowEdits()
        })
        .catch((error) => {
            setError('bakend error');
            console.error('bakend error:', error.message);
            setLoading(false);
        });
    };

    const handleDeleteRow = useCallback(
        (row) => {
            setLoading(true);
            deletPoste(row.original.id)
            .then((data) => {
                setTableData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError('bakend error');
                console.error('bakend error:', error.message);
                setLoading(false);
            });
        },
        [setLoading, setError],
    );
    const columns = useMemo(
        () => {
            const isOptionEqualToValue = (option, value) => option.label === value;
            return [
                {
                    accessorKey: 'id',
                    header: 'ID',
                    enableColumnOrdering: true,
                    enableEditing: false,
                    enableSorting: true,
                    size: 80,
                },
                {
                    accessorKey: 'metier.id',
                    header: 'Metier ID',
                    enableColumnOrdering: true,
                    enableEditing: false,
                    enableSorting: true
                },
                {
                    accessorKey: 'competance.id',
                    header: 'Competance ID',
                    enableColumnOrdering: true,
                    enableEditing: false,
                    enableSorting: true
                },
                {
                    accessorKey: 'metier.code',
                    header: 'Code metier',
                    size: 140,
                    Edit: ({ cell, column, table }) => <Autocomplete
                        defaultValue={cell.getValue()}
                        sx={{
                            width: '100%',
                        }}
                        disablePortal
                        options={metierdata}
                        onChange={(e, value) =>{
                            if (value != null) setNewnode({ ...selectedmetier, metier_id: value.id })
                        }}
                        isOptionEqualToValue={isOptionEqualToValue}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                label="Code metier" 
                                name="metier_id"
                                variant="outlined"
                            />
                        )}
                    />,
                },
                {
                    accessorKey: 'competance.code',
                    header: 'Code competance',
                    size: 140,
                    Edit: ({ cell, column, table }) => <Autocomplete
                        defaultValue={cell.getValue()}
                        sx={{
                            width: '100%',
                        }}
                        disablePortal
                        required
                        options={competancedata}
                        isOptionEqualToValue={isOptionEqualToValue}
                        onChange={(e, value) =>{
                            if (value != null) setNewnode({ ...selectedmetier, competance_id: value.id })
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                label="Code Competance" 
                                name="competance_id"
                                variant="outlined"
                            />
                        )}
                    />,
                },
                {
                    accessorKey: 'niveauCompetance',
                    header: 'Niveau',
                    size: 140,
                    Edit: ({ cell, column, table }) => <Autocomplete
                        defaultValue={cell.getValue().toString()}
                        sx={{
                            width: '100%',
                        }}
                        disablePortal
                        options={["0", "1", "2", "3", "4", "5"]}
                        onChange={(e, value) =>
                            setNewnode({ ...selectedmetier, niveau_competance: value })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                label="Classe" 
                                name="class"
                                variant="outlined"
                            />
                        )}
                    />,
                },
                {
                    accessorKey: 'creation',
                    header: 'Date création',
                    enableColumnOrdering: true,
                    enableEditing: false,
                    enableSorting: true,
                }
            ]},[competancedata, selectedmetier, metierdata]
    );

    return (
        <Paper sx={{ mt: 2, width: '100%', color:'black.main' }}>
            <MaterialReactTable
                initialState={{ columnVisibility: { "competance.id": false, "metier.id": false} }}
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
                    Ajouté nouveau competance
                </Button>
                )}
                localization={MRT_Localization_FR}
            />
            <CreateNewPosteModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateNewRow}
                metierlist={metierdata}
                competancelist={competancedata}
            />
        </Paper>
    );
}

export default PosteScreen