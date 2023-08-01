import HeaderInScreen from '../../header/HeaderInScreen'
import { Fragment, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, InputAdornment, TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

function FicheRHScreen() {
    const [textToSearh, setTextToSearh] = useState()
    const theme = useTheme()
    return (
        <Fragment>
            <HeaderInScreen
                title={'Fiche par utilisateur RH'}
                secondSubtitle={textToSearh && 'Recherche'}
            />
            <Box
                backgroundColor="background.paper"
                display="flex"
                width="100%"
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
                        value={textToSearh}
                        onChange={(e) => setTextToSearh(e.target.value)}
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
            </Box>
        </Fragment>
    )
}
export default FicheRHScreen