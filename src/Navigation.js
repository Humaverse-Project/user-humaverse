import { Routes, Route } from 'react-router-dom'
import {
    HomeScreen,
    FicheRHScreen,
    NotFoundScreen,
    LoginScreen,
    FicheFormationScreen,
    MetierScreen
} from './features'

function Navigation() {
    const allComponents = [
        {
            id: 1,
            path: '/',

            components: <LoginScreen />,
        },
        {
            id: 2,
            path: '/home',
            components: <HomeScreen />,
        },
        {
            id: 3,
            path: '*',
            components: <NotFoundScreen />,
        },
        {
            id: 4,
            path: '/ficherh',
            components: <FicheRHScreen />,
        },
        {
            id: 5,
            path: '/ficheformation',
            components: <FicheFormationScreen />,
        },
        {
            id: 6,
            path: '/metier',
            components: <MetierScreen />,
        }
    ]

    return (
        <>
            <Routes>
                {allComponents.map((component) => {
                    return (
                        <Route
                            path={component.path}
                            element={component.components}
                            key={component.id}
                        />
                    )
                })}
            </Routes>
        </>
    )
}

export default Navigation
