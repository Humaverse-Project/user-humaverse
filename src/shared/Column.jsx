import { Box } from '@mui/system'

function Column({ children, ...props }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                ...props,
            }}
        >
            {children}
        </Box>
    )
}

export default Column
