import { useState } from 'react'

import MetierScreen from './MetierScreen'
import CompetanceScreen from './CompetanceScreen'

export default function MainScreen() {
    const [screen, setScreen] = useState(1);
    const [formData, setFormData] = useState({});

    return (
        <>
            {screen === 1 && <MetierScreen setScreen={setScreen} setFormData={setFormData} />}
            {screen === 2 && <CompetanceScreen formData={formData}/>}
        </>
    )
}
