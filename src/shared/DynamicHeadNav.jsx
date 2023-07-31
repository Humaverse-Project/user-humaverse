import { Icon, useMediaQuery } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import Row from './Row'
import Text from './Text'
import { useTheme } from '@emotion/react'
import { NavLink } from 'react-router-dom'

function DynamicHeadNav({ title, secondSubtitle }) {
    const theme = useTheme()
    const matcheMD = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Row>
            <NavLink to="/home">
                <Icon
                    sx={{ fontSize: !matcheMD ? 38 : 30 }}
                    color="primary"
                    component={HomeIcon}
                />
            </NavLink>
            <Text
                variant={!matcheMD ? 'bigTitleBold' : 'normal'}
                ml={!matcheMD ? 5 : 1}
                color="primary"
            >
                {title}
            </Text>
            {secondSubtitle && (
                <Text variant={'bigTitleBold'} mx={2}>
                    {' '}
                    -{' '}
                </Text>
            )}
            {secondSubtitle && (
                <Text
                    variant={!matcheMD ? 'bigTitle' : 'normal'}
                    color="primary"
                >
                    {secondSubtitle}
                </Text>
            )}
        </Row>
    )
}

export default DynamicHeadNav
