import HeaderInScreen from '../../header/HeaderInScreen'
import { Fragment } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'

import { columns, rows } from './variable.js';
import { TableStriped } from '../../../shared'

function FicheFormationScreen() {
    const theme = useTheme()

    return (
        <Fragment>
            <HeaderInScreen
                title={'Fiche par organisme de formation'}
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
                {TableStriped(columns, rows, 'formation')}
            </Box>
        </Fragment>
    )
}
export default FicheFormationScreen