import HeaderInScreen from '../../header/HeaderInScreen'
import { Fragment, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, InputAdornment, TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FormGroup from '@mui/material/FormGroup'
import { DataGrid, frFR } from '@mui/x-data-grid';
import { columns, rows } from './variable.js';

function FicheRHScreen() {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const theme = useTheme()

    const [rhData, setRhData] = useState(rows);
    const filteredData = rows.filter((entreprise) =>
        entreprise.nomEntreprise.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleRowUpdate = (params) => {
        const updatedData = rhData.map((entreprise) =>
            entreprise.id === params.id ? { ...entreprise, ...params.data } : entreprise
        );
        setRhData(updatedData);
    };
    const handleRowDelete = (params) => {
        const updatedData = rhData.filter((entreprise) => entreprise.id !== params.id);
        setRhData(updatedData);
    };
    return (
        <Fragment>
            <HeaderInScreen
                title={'Fiche par utilisateur RH'}
                secondSubtitle={searchTerm && 'Recherche'}
            />
            <Box
                backgroundColor="background.paper"
                display="flex"
                flexDirection="row"
                sx={{
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
                justifyContent="space-between"
                alignItems="flex-start"
                minHeight="80vh"
                py={6}
                px={4}
            >
                <Box>
                    <TextField
                        id="outlined-basic"
                        value={searchTerm}
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                    <FormGroup sx={{ ml: 2, mt: 1 }}>
                        
                    </FormGroup>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        [theme.breakpoints.down('md')]: {
                            alignItems: 'flex-start',
                            mt: 8
                        },
                        flex: 2,
                        ml: 6,
                        [theme.breakpoints.down('lg')]: {
                            ml: 0,
                        },
                    }}
                >
                    <DataGrid
                        rows={filteredData}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        onEditCellChangeCommitted={handleRowUpdate}
                        disableSelectionOnClick
                        disableColumnMenu
                        onRowDelete={handleRowDelete}
                        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                    />
                </Box>
            </Box>
        </Fragment>
    )
}
export default FicheRHScreen