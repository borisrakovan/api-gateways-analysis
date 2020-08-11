import React, { useState } from 'react'

import Actions from './api/Actions'
import AuthorizationBar from './auth/AuthorizationBar'

interface Props {
    
}

const CustomerApiClient = (props: Props) => {
    
    const [authorization, setAuthorization] = useState({})

    return (
        <div>
            <AuthorizationBar setAuthorization={setAuthorization} />
            <Actions authorization={authorization}/>
        </div>
    )
}

export default CustomerApiClient
