import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Visibility from '@mui/icons-material/Visibility'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

// logo
import logo from '../../../assets/images/logo.png'
import { Text } from '../../../shared'

export default function LoginScreen() {
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return (
        <>
            <form>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            width="150px"
                            height="150px"
                        />

                        <Typography component="h1" variant="h5">
                            Authentification
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                spacing: 2,
                            }}
                        >
                            <FormControl
                                variant="outlined"
                                sx={{
                                    m: 2,
                                    width: '150%',
                                }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Email
                                </InputLabel>
                                <OutlinedInput
                                    name="password"
                                    type="email"
                                    label="Email"
                                />
                            </FormControl>

                            <FormControl
                                sx={{
                                    width: '150%',
                                }}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Mot de passe
                                </InputLabel>
                                <OutlinedInput
                                    name="password"
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Mot de passe"
                                />
                            </FormControl>
                            <NavLink
                                to="/home"
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                    width: '150%',
                                }}
                            >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ height: '50px', mt: 2 }}
                                >
                                    Se connecter
                                </Button>
                            </NavLink>
                            <Grid
                                container
                                sx={{
                                    width: '150%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mt: 2,
                                }}
                            >
                                <Grid item xs>
                                    <NavLink
                                        to="/passwordReminder"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Text color="primary.main">
                                            Mot de passe oublié?
                                        </Text>
                                    </NavLink>
                                </Grid>
                                <Grid item>
                                    <NavLink
                                        to="/register"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Text color="primary.main">
                                            Pas du compte? S'inscrire
                                        </Text>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </form>
        </>
    )
}
