import HeaderGlobal from '../../header/HeaderGlobal'

import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import { Fragment } from 'react'
import { Card } from '@mui/material'
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material'
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';

//ICONES
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function HomeScreen() {
    const theme = useTheme()
    const series = [
        {
          type: 'bar',
          stack: '',
          yAxisKey: 'eco',
          data: [2, 5, 3, 4, 1, 5, 6],
        }
    ];
    const seriesformation = [
        {
          type: 'bar',
          stack: '',
          yAxisKey: 'eco',
          data: [2, 5, 3, 4, 1, 5, 6],
        },
        {
            type: 'bar',
            stack: '',
            yAxisKey: 'eco',
            data: [1, 56, 2, 45, 4, 7, 2],
        }
    ];
    return (
        <Fragment>
            <HeaderGlobal />
            <Box
                backgroundColor="background.paper"
                display={'flex'}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height={'auto'}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        [theme.breakpoints.down('sm')]: {
                            justifyContent: 'center',
                        },
                        alignItems: 'center',
                    }}
                >
                    <Card sx={{ display: 'flex', width: 500, m: 2,
                                [theme.breakpoints.up('lg')]: {
                                    m: 4,
                                },
                                boxShadow: '1px 2px 9px rgba(0, 0 ,0 ,0.5)',
                                [theme.breakpoints.down('sm')]: {
                                    width: '100%',
                                    my: 1,
                                    mx: 0,
                                }
                            }}>
                        <CardActionArea sx={{ width: 150 }}>
                            <CardContent sx={{ p: 4 }}>
                                <GroupsOutlinedIcon sx={{ fontSize: 92, color: 'black.main' }} />
                            </CardContent>
                        </CardActionArea>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Nombre d’utilisateurs RH
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        TOTAL : 
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Nouveaux : 
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>
                    <Card sx={{ display: 'flex', width: 500, m: 2,
                                [theme.breakpoints.up('lg')]: {
                                    m: 4,
                                },
                                boxShadow: '1px 2px 9px rgba(0, 0 ,0 ,0.5)',
                                [theme.breakpoints.down('sm')]: {
                                    width: '100%',
                                    my: 1,
                                    mx: 0,
                                } }}>
                        <CardActionArea sx={{ width: 150 }}>
                            <CardContent sx={{ p: 4 }}>
                                <LibraryBooksIcon sx={{ fontSize: 92, color: 'black.main' }} />
                            </CardContent>
                        </CardActionArea>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Nombre de formations et test
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Disponnible : 
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Acheté : 
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        [theme.breakpoints.down('sm')]: {
                            justifyContent: 'center',
                        },
                        alignItems: 'center',
                    }}
                >
                    <Card sx={{ display: 'flex', width: 500, m: 2,
                                [theme.breakpoints.up('lg')]: {
                                    m: 4,
                                },
                                boxShadow: '1px 2px 9px rgba(0, 0 ,0 ,0.5)',
                                [theme.breakpoints.down('sm')]: {
                                    width: '100%',
                                    my: 1,
                                    mx: 0,
                                } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Histogramme utilisateurs RH
                                </Typography>
                                <ChartContainer
                                    series={series}
                                    width={500}
                                    height={400}
                                    xAxis={[
                                        {
                                        id: 'month',
                                        data: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet"],
                                        scaleType: 'band',
                                        valueFormatter: (value) => value.toString(),
                                        },
                                    ]}
                                    yAxis={[
                                        {
                                        id: 'eco',
                                        scaleType: 'linear',
                                        },
                                        {
                                        id: 'pib',
                                        scaleType: 'log',
                                        },
                                    ]}
                                    >
                                    <BarPlot />
                                    <LinePlot />
                                    <ChartsXAxis label="Mois" position="bottom" axisId="month" />
                                    <ChartsYAxis label="Nombre" position="left" axisId="eco" />
                                </ChartContainer>
                            </CardContent>
                        </Box>
                    </Card>
                    <Card sx={{ display: 'flex', width: 500, m: 2,
                                [theme.breakpoints.up('lg')]: {
                                    m: 4,
                                },
                                boxShadow: '1px 2px 9px rgba(0, 0 ,0 ,0.5)',
                                [theme.breakpoints.down('sm')]: {
                                    width: '100%',
                                    my: 1,
                                    mx: 0,
                                } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Histogramme formations et test
                                </Typography>
                                <ChartContainer
                                    series={seriesformation}
                                    width={500}
                                    height={400}
                                    xAxis={[
                                        {
                                        id: 'month',
                                        data: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet"],
                                        scaleType: 'band',
                                        valueFormatter: (value) => value.toString(),
                                        },
                                    ]}
                                    yAxis={[
                                        {
                                        id: 'eco',
                                        scaleType: 'linear',
                                        },
                                        {
                                        id: 'pib',
                                        scaleType: 'log',
                                        },
                                    ]}
                                    >
                                    <BarPlot />
                                    <LinePlot />
                                    <ChartsXAxis label="Mois" position="bottom" axisId="month" />
                                    <ChartsYAxis label="Nombre" position="left" axisId="eco" />
                                </ChartContainer>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Fragment>
    )
}

export default HomeScreen
