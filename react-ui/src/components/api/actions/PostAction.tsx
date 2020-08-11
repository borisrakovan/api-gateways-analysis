import React, { useState, ChangeEvent } from 'react'
import ApiAction from '../ApiAction'
import { handleApiResponse, handleApiData, handleResponseClear } from '../handlers'
import { InputGroup, FormControl } from 'react-bootstrap'
import { ActionState } from '../../../types/ActionState'

interface Props {
    authorization : object
}

const PostAction = (props: Props) => {

    const [ jsonInput, setJsonInput ] = useState(
        JSON.stringify({
            "fullName": "Boris Novák",
            "age": 21,
            "emailAddress": "novak@microcomp.sk"
        }, null, 2)    
    )

    const [ apiResponse, setApiResponse ] = useState({ status: "", data: {} })
    const [ actionState, setActionState ] = useState(ActionState.NEUTRAL)

    const execute = () => {

        // customer API
        fetch('http://localhost:8080/api/customers', {
            headers: { 'Content-Type': 'application/json', ...props.authorization },
            method: "POST",
            body: jsonInput
        })
            .then(response => handleApiResponse(response, setApiResponse, setActionState))
            .then(data => handleApiData(data, setApiResponse))
            .catch(error => console.log(error));
    }

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setJsonInput(e.target.value)
    }

    return (
        <ApiAction
            method="post"
            endpoint="/api/customers"   
            onExecute={execute}
            response={apiResponse}
            actionState={actionState}
            onResponseClear={() => handleResponseClear(setActionState, setApiResponse)}
        >
            <div className="wrapper">
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>JSON<br/>body</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        as="textarea"
                        aria-label="json body" 
                        name="json-input"
                        rows={5}     
                        onChange={handleInputChange} 
                        value={jsonInput}            
                    />
                </InputGroup>
            </div>
        </ApiAction>
    )
}

export default PostAction
