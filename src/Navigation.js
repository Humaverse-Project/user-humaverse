import { Routes, Route } from 'react-router-dom'
import {
    HomeScreen,
    FicheRHScreen,
    NotFoundScreen,
    LoginScreen
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
