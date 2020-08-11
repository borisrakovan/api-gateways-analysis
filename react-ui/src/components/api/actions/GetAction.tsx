import React, { useState } from 'react'

import ApiAction from '../ApiAction'

import { handleApiResponse, handleApiData, handleResponseClear } from '../handlers'
import { ActionState } from '../../../types/ActionState'

interface Props {
    authorization : object
}

const GetAction = (props: Props) => {

    const [ apiResponse, setApiResponse ] = useState({ status: "", data: {} })
    const [ actionState, setActionState ] = useState(ActionState.NEUTRAL)

    const execute = () => {
        
        fetch('http://localhost:8080/api/customers', {
            headers: { ...props.authorization }
        })
            .then(response => handleApiResponse(response, setApiResponse, setActionState))
            .then(data => handleApiData(data, setApiResponse))
            .catch(error => console.log(error));
    }
    
    return (
            <ApiAction
                method="get"
                endpoint="/api/customers"   
                onExecute={execute}
                response={apiResponse}
                actionState={actionState}
                onResponseClear={() => handleResponseClear(setActionState, setApiResponse)}
            >
            </ApiAction>
    )
}

export default GetAction
