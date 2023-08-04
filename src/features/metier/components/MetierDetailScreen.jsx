import HeaderInScreen from '../../header/HeaderInScreen'
import { LeftMenu } from '../../../shared'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { authenticateClient, getFicheMetierDataCode } from './api';
import MaterialReactTable from 'material-react-table';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import { useParams } from 'react-router-dom'; // Importez useParams pour récupérer les paramètres d'URL

function MetierDetailScreen() {
    const { code } = useParams();

    const theme = useTheme()
    const [data, setData] = useState(null);
    const [GroupesSavoirs, setGroupesSavoirs] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
  
    useEffect(() => {
      // Appel d'authentification client pour obtenir l'access token
      authenticateClient()
        .then((data) => {
          setAccessToken(data.access_token);
  
          // Utilisation de l'access token pour l'appel API GET avec Authorization
          getFicheMetierDataCode(data.access_token, code)
            .then((data) => {
                var groupedData = []
                for (let index = 0; index < data.groupesCompetencesMobilisees.length; index++) {
                    const competences = data.groupesCompetencesMobilisees[index].competences;
                    for (let kaelo = 0; kaelo < competences.length; kaelo++) {
                        const element = competences[kaelo];
                        groupedData.push(
                            {
                                enjeu: data.groupesCompetencesMobilisees[index].enjeu.libelle,
                                nom_competences: element.libelle,
                                type_competences: element.type,
                            }
                        )
                    }
                }
                var GroupesSavoirsdata = []
                for (let index = 0; index < data.groupesSavoirs.length; index++) {
                    const savoirs = data.groupesSavoirs[index].savoirs;
                    for (let kaelo = 0; kaelo < savoirs.length; kaelo++) {
                        const element = savoirs[kaelo];
                        GroupesSavoirsdata.push(
                            {
                                categorieSavoirs: data.groupesSavoirs[index].categorieSavoirs.libelle,
                                nom_savoirs: element.libelle,
                                type_savoirs: element.type,
                            }
                        )
                    }
                }
                setGroupesSavoirs(GroupesSavoirsdata)
              setData(groupedData);
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
    }, []);
  
    const columns = useMemo(
        () =>[
        { 
            accessorKey: 'enjeu', header: 'Enjeu' 
        },
        {
            accessorKey: 'nom_competences',
            header: 'Nom Compétences'
        },
        {
            accessorKey: 'type_competences',
            header: 'type Compétences'
        },
        ],[],
    );

    const columnsGroupesSavoirs = useMemo(
        () =>[
        { 
            accessorKey: 'categorieSavoirs', header: 'Categorie Savoirs' 
        },
        {
            accessorKey: 'nom_savoirs',
            header: 'Libellé savoir'
        },
        {
            accessorKey: 'type_savoirs',
            header: 'type savoir'
        },
        ],[],
    );
    

    if (loading) {
      return (
        <Fragment>
            <HeaderInScreen
                title={'Détail métier '+code}
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
                        {LeftMenu('METIER')}
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
                        <div>Loading...</div>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
      );
    }
  
    if (error) {
        return (
            <Fragment>
                <HeaderInScreen
                    title={'Détail métier '+code}
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
                            {LeftMenu('METIER')}
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
                            <div>Error: {error}</div>
                        </Grid>
                    </Grid>
                </Box>
            </Fragment>
        )
    }
  
    // Affichez les données récupérées
    return (
      <Fragment>
        <HeaderInScreen
            title={'Détail métier '+code}
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
                    {LeftMenu('METIER')}
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
                    <h4>Tableau groupesCompetencesMobilisees</h4>
                    <Paper sx={{ mt: 2, width: '100%'}}>
                        <MaterialReactTable
                            enableGrouping
                            columns={columns}
                            data={data}
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            autoHeight
                            localization={MRT_Localization_FR}
                            enableStickyHeader
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
                            enableTopToolbar={false}
                            muiTableHeadCellProps={{
                                sx: {
                                    color: 'black.main'
                                },
                            }}
                            muiTableHeadRowProps={{
                                sx: {
                                    backgroundColor: "unset"
                                },
                            }}
                            muiTableBodyRowProps={{
                                sx: {
                                    backgroundColor: "unset"
                                },
                                hover: false
                            }}
                            initialState={{ density: 'compact', grouping: ['enjeu'],expanded: true, }}
                        />
                    </Paper>
                    <h4>Tableau groupesSavoirs</h4>
                    <Paper sx={{ mt: 2, width: '100%'}}>
                        <MaterialReactTable
                            enableGrouping
                            columns={columnsGroupesSavoirs}
                            data={GroupesSavoirs}
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            autoHeight
                            localization={MRT_Localization_FR}
                            enableStickyHeader
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
                            enableTopToolbar={false}
                            muiTableHeadCellProps={{
                                sx: {
                                    color: 'black.main'
                                },
                            }}
                            muiTableHeadRowProps={{
                                sx: {
                                    backgroundColor: "unset"
                                },
                            }}
                            muiTableBodyRowProps={{
                                sx: {
                                    backgroundColor: "unset"
                                },
                                hover: false
                            }}
                            initialState={{ density: 'compact', grouping: ['categorieSavoirs'],expanded: true, }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </Fragment>
    );
}

export default MetierDetailScreen