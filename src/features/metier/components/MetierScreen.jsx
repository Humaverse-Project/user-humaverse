import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { listrome } from '../../../services/RomeService';
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
    const [listromedata, setlistrome] = useState([]);
    const [selectedmetier, setNewnode] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await listrome();
                const reponsemetie = await datametierexistant;
                console.log(reponsemetie)
                setlistrome(reponsemetie);
                setLoading(false);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError("Une erreur s'est produite lors de l'appele serveur");
              setLoading(false);
            }
        };
        fetchData();
    }, [setLoading, setError]);
    
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const handleCancelRowEdits = () => {
        setNewnode({})
    };
    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if(selectedmetier.code === undefined){
            selectedmetier.code = values.code
        }
        if(selectedmetier.nom  === undefined){
            selectedmetier.nom = values.nom
        }
        if(selectedmetier.descriptionC  === undefined){
            selectedmetier.descriptionC = values.descriptionC
        }
        if(selectedmetier.descriptionL  === undefined){
            selectedmetier.descriptionL = values.descriptionL
        }
        selectedmetier.id = values.id
        // setLoading(true);
        // updatemetier(selectedmetier)
        // .then((data) => {
        //     setTableData([...data]);
        //     setLoading(false);
        //     handleCancelRowEdits()
        // })
        // .catch((error) => {
        //     setError('bakend error');
        //     console.error('bakend error:', error.message);
        //     setLoading(false);
        // });
    };
    
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
            accessorKey: 'rome_coderome',
            header: 'Code Rome',
            size: 140,
            enableEditing: false,
          },
          {
            accessorKey: 'nom',
            header: 'Nom',
            size: 140,
            Edit: ({ cell, column, table }) => 
                <TextField
                    defaultValue={cell.getValue()}
                    key="nom"
                    label="Nom"
                    name="nom"
                    onChange={(e) =>
                        setNewnode({ ...selectedmetier, [e.target.name]: e.target.value })
                    }
                    sx={{
                        width: '100%',
                    }}
                />,
          },
          {
            accessorKey: 'rome_definition',
            header: 'Définition',
            Cell: ({ cell }) => (<div dangerouslySetInnerHTML={{ __html:cell.getValue().replaceAll("\\n", '<br>')}}></div>),
            size: 140,
            Edit: ({ cell, column, table }) => 
                <TextField
                    defaultValue={cell.getValue()}
                    key="rome_definition"
                    label="Définition"
                    name="rome_definition"
                    onChange={(e) =>
                        setNewnode({ ...selectedmetier, [e.target.name]: e.target.value })
                    }
                    sx={{
                        width: '100%',
                    }}
                />
          },
          {
            accessorKey: 'rome_acces_metier',
            header: 'Access metier',
            size: 140,
            enableHiding: true,
            Cell: ({ cell }) => (<div dangerouslySetInnerHTML={{ __html:cell.getValue().replaceAll("\\n", '<br>')}}></div>),
            Edit: ({ cell, column, table }) => <TextField
                defaultValue={cell.getValue()}
                key="rome_acces_metier"
                label="Access metier"
                name="rome_acces_metier"
                onChange={(e) =>
                    setNewnode({ ...selectedmetier, [e.target.name]: e.target.value })
                }
                sx={{
                    width: '100%',
                }}
            />
          },
          {
            accessorKey: 'created_at.date',
            header: 'Date création',
            enableColumnOrdering: true,
            enableEditing: false,
            enableSorting: true,
          }
        ],
        [listromedata],
    );
    // Affichez les données récupérées
    return (
        <Paper sx={{ mt: 2, width: '100%', color:'black.main' }}>
            <MaterialReactTable
                initialState={{ columnVisibility: { id: false, rome_acces_metier: false} }}
                displayColumnDefOptions={{
                'mrt-row-actions': {
                    muiTableHeadCellProps: {
                    align: 'center',
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
                </Box>
                )}
                localization={MRT_Localization_FR}
            />
        </Paper>
    );
}

export default MetierScreen