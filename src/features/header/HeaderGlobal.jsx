import { DynamicHeadNav, Text, Row } from '../../shared'
import { useMediaQuery } from '@mui/material'


import { useTheme } from '@emotion/react'

function HeaderGlobal() {
    const theme = useTheme()
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
