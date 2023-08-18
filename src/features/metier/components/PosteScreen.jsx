import HeaderInScreen from '../../header/HeaderInScreen'
import { LoadingAPI } from '../../../shared'
import { LeftMenu } from '../../../shared'
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { authenticateClient, getFicheMetierData } from '../../../services/PoleEmploisService';
import MaterialReactTable from 'material-react-table';
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import { Link } from 'react-router-dom';

function PosteScreen() {
    const theme = useTheme()
    const page = 'COMPETENCES'
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
  
    useEffect(() => {
      // Appel d'authentification client pour obtenir l'access token
      authenticateClient()
        .then((data) => {
          setAccessToken(data.access_token);
  
          // Utilisation de l'access token pour l'appel API GET avec Authorization
          getFicheMetierData(data.access_token)
            .then((data) => {
              
              const formattedData = data.map((item) => ({
                code: item.code,
                libelle: item.metier.libelle,
              }));
              setData(formattedData);
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
                accessorKey: 'code',
                header: 'Code',
                Cell: ({ cell, column }) => (
                    <Link to={`/competences/${cell.getValue()}`}>{cell.getValue()}</Link>
                ),
            },
            { accessorKey: 'libelle', header: 'Libellé' },
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
                    <Paper sx={{ mt: 2, width: '100%'}}>
                        <MaterialReactTable
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
                            enableTopToolbar={false} //hide top toolbar
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
                            initialState={{ density: 'compact' }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    </Fragment>
    );
}

export default PosteScreen