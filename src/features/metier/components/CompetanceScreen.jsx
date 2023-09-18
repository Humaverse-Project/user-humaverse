import React, { useState, useEffect, useMemo } from 'react';
import { listcompetance, postcompetance, loadcompetanceglobal } from '../../../services/CompetanceService';
import MaterialReactTable from 'material-react-table';
import Paper from '@mui/material/Paper';
import CreateNewCompetanceModal from './NewCompetanceModal';
import {
    Box,
    Button,
    List,
    ListItem,
    ThemeProvider,
    Typography
} from '@mui/material';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import theme from './theme';
function CompetanceScreen({setLoading, setError}) {
    const [fichecompetance, setfichecompetance] = useState([]);
    const [acreditationlist, setacreditationlist] = useState([]);
    const [competanceGlobal, setcompetanceGlobal] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const datametierexistant = await listcompetance();
                const reponsemetie = await datametierexistant;
                setfichecompetance(reponsemetie.fiche_competance);
                let acreditation = reponsemetie.accreditation.map(acredit=>{return {label: acredit.accreTitre, id: acredit.id}})
                let competancegloblist = reponsemetie.compglobal.map(acredit=>{return {label: acredit.compGbTitre, id: acredit.id, type: acredit.compGbCategorie}})
                console.log(reponsemetie)
                setacreditationlist(acreditation);
                setcompetanceGlobal(competancegloblist);
                setLoading(false);
            } catch (error) {
              console.error('Une erreur s\'est produite :', error);
              setError("Une erreur s'est produite lors de l'appele serveur");
              setLoading(false);
            }
        };
        fetchData();
    }, [setLoading, setError, setfichecompetance, setacreditationlist, setcompetanceGlobal]);
    
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const supprimerDoublons = (liste) => {
        const doublons = new Set();
        return liste.filter((objet) => {
          if (doublons.has(objet.brqCompTitre)) {
            return false;
          }
          doublons.add(objet.brqCompTitre);
          return true;
        });
    }
    const loadlistbrique = async (value)=>{
        try {
            const datametierexistant = await loadcompetanceglobal(value);
            setLoading(false);
            return supprimerDoublons(await datametierexistant);
        } catch (error) {
          console.error('Une erreur s\'est produite :', error);
          setError("Une erreur s'est produite lors de l'appele serveur");
          setLoading(false);
          return []
        }
    }
    const handleCreateNewRow = (values, elementsCoches) => {
        setLoading(true);
        postcompetance(values, elementsCoches)
        .then((data) => {
            setfichecompetance([...data]);
            setLoading(false);
        })
        .catch((error) => {
            setError('bakend error');
            console.error('bakend error:', error.message);
            setLoading(false);
        });
        
    };
    
    const columns = useMemo(
        () => [
                {
                    accessorKey: 'id',
                    header: 'ID',
                    enableColumnOrdering: true,
                    enableEditing: false,
                    enableSorting: true,
                },
                {
                    accessorKey: 'ficCompTitreEmploi',
                    header: 'Titre',
                    enableColumnOrdering: true,
                    enableEditing: false,
                    enableSorting: true,
                },
                {
                    accessorKey: 'ficCompCompetencesNiveau',
                    header: 'Niveau',
                    enableColumnOrdering: true,
                    enableEditing: false,
                    enableSorting: true,
                },
                {
                    accessorKey: 'ficCompVersion',
                    header: 'Version',
                    enableColumnOrdering: true,
                    enableEditing: false,
                    enableSorting: true,
                },
                {
                    accessorKey: 'createdAt',
                    header: 'Date création',
                    enableColumnOrdering: true,
                    enableEditing: false,
                    enableSorting: true,
                }
            ],
        [],
    );
    // Affichez les données récupérées
    return (
        <Paper sx={{ mt: 2, width: '100%', color:'black.main' }}>
            <ThemeProvider theme={theme}>
                <MaterialReactTable
                    renderDetailPanel={({ row }) => {
                        let donnees = row.original.ficCompCompetences
                        // Créer un objet pour regrouper les éléments par compGb
                        const groupedData = donnees.reduce((acc, element) => {
                            const { compGb } = element;
                            const compGbId = compGb.id;
                            const compGbCategorie = compGb.compGbCategorie;
                            const compGbTitre = compGb.compGbTitre;
                        
                            // Si la clé compGbId n'existe pas encore, créez-la avec un tableau vide
                            if (!acc[compGbId]) {
                            acc[compGbId] = {
                                compGbCategorie,
                                compGbTitre,
                                elements: [],
                            };
                            }
                        
                            // Ajoutez l'élément à la clé compGbId correspondante
                            acc[compGbId].elements.push(element);
                        
                            return acc;
                        }, {});
                        
                        // Transformez l'objet en tableau de groupes
                        const groupes = Object.keys(groupedData).map((compGbId) => {
                            return {
                            compGbId: parseInt(compGbId, 10), // convertir en nombre si nécessaire
                            compGbCategorie: groupedData[compGbId].compGbCategorie,
                            compGbTitre: groupedData[compGbId].compGbTitre,
                            elements: groupedData[compGbId].elements,
                            };
                        });
                        return (
                            <Box
                                sx={{
                                    margin: 'auto',
                                    gridTemplateColumns: '1fr 1fr',
                                    width: '100%',
                                }}
                            >
                                {groupes.map((element) => (
                                    <div key={"div"+element.compGbId}>
                                        <Typography key={"type1"+element.compGbId}><b>{element.compGbCategorie}</b></Typography>
                                        <Typography key={"type2"+element.compGbId}>{element.compGbTitre}</Typography>
                                        <List key={element.compGbId}>
                                            {element.elements.map((data) => (
                                                <ListItem key={data.id}>{data.brqCompTitre}</ListItem>
                                            ))}
                                        </List>
                                    </div>
                                ))}
                            </Box>
                        )
                    }}
                    initialState={{ columnVisibility: { id: false} }}
                    displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                        align: 'center',
                        },
                        size: 120,
                    },
                    }}
                    columns={columns}
                    data={fichecompetance}
                    enableColumnOrdering
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
                    renderTopToolbarCustomActions={() => (
                    <Button
                        color="success"
                        onClick={() => setCreateModalOpen(true)}
                        variant="outlined"
                    >
                        Ajouté nouveau fiches competance
                    </Button>
                    )}
                    localization={MRT_Localization_FR}
                />
                <CreateNewCompetanceModal
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateNewRow}
                    acreditation={acreditationlist}
                    competanceGlobal={competanceGlobal}
                    loadlistbrique={loadlistbrique}
                />
            </ThemeProvider>
        </Paper>
    );
}

export default CompetanceScreen