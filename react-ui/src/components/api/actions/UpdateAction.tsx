import React, { useState, ChangeEvent } from 'react'

import ApiAction from '../ApiAction'
import { handleApiResponse, handleApiData, handleResponseClear } from '../handlers'

import { InputGroup, FormControl } from 'react-bootstrap'
import { ActionState } from '../../../types/ActionState'

interface Props {
    authorization : object
}

const UpdateAction = (props: Props) => {

    const [ idInput, setIdInput ] = useState('')

    const [ jsonInput, setJsonInput ] = useState(
        JSON.stringify({
            "id": idInput,
            "fullName": "Boris Novák",
            "age": 21,
            "emailAddress": "novak@microcomp.sk"
        }, null, 2)
    )

    const [ apiResponse, setApiResponse ] = useState({ status: "", data: {} })
    const [ actionState, setActionState ] = useState(ActionState.NEUTRAL)

    const execute = () => {
        // input validation
        if (!idInput) {
            alert("Id input field is empty. Please provide a key to search for.")
            return
        }
        if (idInput !== JSON.parse(jsonInput).id) {
            alert("Id input should match id in the json body.")
            return
        }

        // customer API
        fetch('http://localhost:8080/api/customers/' + idInput, {
            headers: { 'Content-Type': 'application/json', ...props.authorization },
            method: "PUT",
            body: jsonInput
        })
            .then(response => handleApiResponse(response, setApiResponse, setActionState))
            .then(data => handleApiData(data, setApiResponse))
            .catch(error => console.log(error))
        
        setIdInput("")
    }

    const handleIdInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIdInput(e.target.value)
    }
    const handleJsonInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setJsonInput(e.target.value)
    }

    return (
        <ApiAction
            method="put"
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
                        onChange={handleIdInputChange}
                        value={idInput}
                        name="idInput"
                        placeholder=""
                        aria-label="id"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>JSON<br/>body</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        as="textarea"
                        aria-label="json body" 
                        name="json-input"
                        rows={6}
                        onChange={handleJsonInputChange} 
                        value={jsonInput}            
                    />
                </InputGroup>
            </div>
        </ApiAction>
    )
}
export default UpdateAction
