import { Box } from '@mui/system'
import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { Text } from '../../shared'

//ICONES

function NotFoundScreen() {
    return (
        <Fragment>
            <Box
                backgroundColor="background.paper"
                display={'flex'}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height={'98vh'}
            >
                <Text variant={'h1'} color="primary">
                    404 error
                </Text>
                <Text variant={'h4'} color="black">
                    La page n'existe pas
                </Text>
                <NavLink to="/home" style={{ marginTop: 20 }}>
                    <Button variant="outlined">Acceuil</Button>
                </NavLink>
            </Box>
        </Fragment>
    )
}

export default NotFoundScreen
