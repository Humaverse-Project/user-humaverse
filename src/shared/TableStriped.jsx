import { DataGrid, frFR } from '@mui/x-data-grid'
import { Fragment, useState } from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useTheme } from '@mui/material/styles'
import './Table.css'
function TableStriped(columns, rows, key) {

    const theme = useTheme()

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const [rhData, setRhData] = useState(rows);

    const filteredData = rows.filter((entreprise) =>
        entreprise[key].toLowerCase().includes(searchTerm.toLowerCase())
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
    const getRowClassName = (params) => {
        return (params.indexRelativeToCurrentPage % 2 === 0) ? 'striped-row' : '';
    };
    return (
        <Fragment>
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
                    sx={{ color: 'black.main' }}
                    getRowClassName={getRowClassName}
                />
            </Box>
        </Fragment>
    )
}

export default TableStriped