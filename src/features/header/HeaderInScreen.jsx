import { DynamicHeadNav, Row, Text } from '../../shared'
import { Button, useMediaQuery } from '@mui/material'

// ICONES
import { useTheme } from '@emotion/react'

function HeaderInScreen({ title, secondSubtitle, buttonRight }) {
    const theme = useTheme()
    const matcheSM = useMediaQuery(theme.breakpoints.up('sm'))
    const matcheXL = useMediaQuery(theme.breakpoints.down('xl'))

    return (
        <Row
            justifyContent={'space-between'}
            px={3}
            height={'10vh'}
            backgroundColor="white"
        >
            <DynamicHeadNav title={title} secondSubtitle={secondSubtitle} />
            {matcheSM && buttonRight && (
                <Row
                    width={matcheXL ? '22%' : '17%'}
                    justifyContent="space-between"
                >
                    <Button
                        variant="contained"
                        color="blue"
                        sx={{ px: 2, py: 1 }}
                    >
                        <Text variant="button" color="white">
                            {buttonRight?.first}
                        </Text>
                    </Button>
                    <Button
                        variant="contained"
                        color="blue"
                        sx={{ px: 2, py: 1 }}
                    >
                        <Text variant="button" color="white">
                            {buttonRight?.second}
                        </Text>
                    </Button>
                </Row>
            )}
        </Row>
    )
}

export default HeaderInScreen
