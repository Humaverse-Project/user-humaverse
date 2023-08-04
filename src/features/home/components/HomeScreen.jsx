import HeaderGlobal from '../../header/HeaderGlobal'
import { LeftMenu } from '../../../shared'
import { useTheme } from '@mui/material/styles'
import React, { useMemo } from 'react';
import { Fragment,useState } from 'react'
import MaterialReactTable from 'material-react-table';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { simulationData } from './variable.js';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';

function HomeScreen() {
    const theme = useTheme()
    const columns = useMemo(
        () =>[
            { accessorKey: 'name', header: 'Nom', size: 200 },
            { accessorKey: 'dataJ', header: 'J', size: 20 },
            { accessorKey: 'dataJ_1', header: 'J-1', size: 20 },
            { accessorKey: 'variationJ_J_1', header: 'Var (%)', size: 20 },
            { accessorKey: 'dataJ_2', header: 'J-2', size: 20 },
            { accessorKey: 'variationJ_1_J_2', header: '%', size: 20 },
            { accessorKey: 'dataJ_3', header: 'J-3', size: 20 },
            { accessorKey: 'variationJ_2_J_3', header: '%', size: 20 },
            { accessorKey: 'data7Days', header: '7 jours', size: 20 },
            { accessorKey: 'average7Days', header: 'Moyenne', size: 20 },
            { accessorKey: 'data14Days', header: '14 jours', size: 20 },
        ],
        [],
    );

    const [selectedDate, setSelectedDate] = useState([null, null]);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue.$d);
    };

    const filteredData = Object.entries(simulationData).map(([name, data]) => ({
        name,
        ...data,
        date: "",
    }));
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
                minHeight="80vh"
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        {LeftMenu('DASHBOARD')}
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
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                        >
                                <DatePicker
                                    label="Sélectionner une date"
                                    value={selectedDate}
                                    name="dateDebut"
                                    onChange={
                                        handleDateChange
                                    }
                                    size="small"
                                    format="DD-MM-YYYY"
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                        },
                                    }}
                                />
                        </LocalizationProvider>
                        <Paper sx={{ mt: 2, width: '100%'}}>
                            <MaterialReactTable
                                columns={columns}
                                data={filteredData}
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
                                enableBottomToolbar={false} //hide bottom toolbar
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
    )
}

export default HomeScreen
