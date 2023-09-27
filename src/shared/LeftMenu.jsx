import React from 'react';
import { Box } from "@mui/system";
import { menu } from "./menulist.js"
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles'

function LeftMenu(active){
    const theme = useTheme()

    const buttonStyle = {
        display: 'block',
        marginBottom: '20px',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: "center"
    };
    return (
        <Box
            sx={{
                m: 2,
                [theme.breakpoints.up('lg')]: {
                    m: 4,
                },
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    my: 1,
                    mx: 0,
                }
            }}    
        >
            { menu.map((item) => (
                <Button 
                    key={item.nom}
                    variant="contained"
                    href={item.url}
                    color={active === item.nom ? 'primary' : 'button'}
                    style={buttonStyle}
                    size='large'>
                {item.nom}
                </Button>
            ))}
        </Box>
    )
}

export default LeftMenu;