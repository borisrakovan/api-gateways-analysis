import React, { useState, ChangeEvent } from 'react'

import ApiAction from '../ApiAction'

import { handleApiResponse, handleApiData, handleResponseClear } from '../handlers'
import { InputGroup, FormControl } from 'react-bootstrap'
import { ActionState } from '../../../types/ActionState'


interface Props {
    authorization : object
}

const GetIdAction = (props: Props) => {

    const [ idInput, setIdInput ] = useState('')

    const [ apiResponse, setApiResponse ] = useState({ status: "", data: {} })
    const [ actionState, setActionState ] = useState(ActionState.NEUTRAL)

    const execute = () => {
        // input validation
        if (!idInput) {
            alert("Id input field is empty. Please provide a key to search for.")
            return
        }

        // customer API
        fetch('http://localhost:8080/api/customers/' + idInput, {
            headers: { ...props.authorization }
        })
            .then(response => handleApiResponse(response, setApiResponse, setActionState))
            .then(data => handleApiData(data, setApiResponse))
            .catch(error => console.log(error))
        
        setIdInput("")
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIdInput(e.target.value)
    }
    
    return (
        <ApiAction
            method="get"
            endpoint={"/api/customers/" + (idInput || "{id}")}   
            onExecute={execute}
            response={apiResponse}
            actionState={actionState}
            onResponseClear={() => handleResponseClear(setActionState, setApiResponse)}
        >
            <div className="wrapper">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">ID</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={handleInputChange}
                        value={idInput}
                        name="idInput"
                        placeholder=""
                        aria-label="id"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </div>
        </ApiAction>
    )
}
export default GetIdAction
