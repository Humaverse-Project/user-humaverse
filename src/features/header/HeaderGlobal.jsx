import { DynamicHeadNav, Text, Row } from '../../shared'
import { Icon, useMediaQuery } from '@mui/material'

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
            <DynamicHeadNav title={'Dashboard'} />
            {!matcheMD && (
                <Text variant="bigTitleBold" color="blue.main" mr={20}>
                    YUMA
                </Text>
            )}
            {matcheSM && (
                <Row width={100} justifyContent={'space-between'}>
                    <Icon sx={{ fontSize: 38 }} component={LanguageIcon} />
                    <Icon sx={{ fontSize: 38 }} component={SettingsIcon} />
                </Row>
            )}
        </Row>
    )
}

export default HeaderGlobal
