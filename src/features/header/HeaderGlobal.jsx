import { DynamicHeadNav, Text, Row } from '../../shared'
import { Icon, useMediaQuery, Button, Box } from '@mui/material'

//ICONES
import LanguageIcon from '@mui/icons-material/Language'
import SettingsIcon from '@mui/icons-material/Settings'
import { useTheme } from '@emotion/react'

function HeaderGlobal() {
    const theme = useTheme()
    const matcheSM = useMediaQuery(theme.breakpoints.up('sm'))
    const matcheMD = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Row justifyContent={'space-between'} px={3} height={'10vh'}>
            <DynamicHeadNav title={'ACCUEIL'} />
            {!matcheMD && (
                <Text variant="bigTitleBold" color="blue.main" mr={20}>
                    YUMA
                </Text>
            )}
        </Row>
    )
}

export default HeaderGlobal
