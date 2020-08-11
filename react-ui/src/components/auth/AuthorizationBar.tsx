import React, { ChangeEvent } from 'react'

import { InputGroup, FormControl } from 'react-bootstrap'
import './AuthorizationBar.scss'

interface Props {
    setAuthorization: any
}

const AuthorizationBar = (props: Props) => {
    
    // 5RxviK5ITSHVXzAxU7mevR:5ZkMCtFVNWmJ3Did6mFd8K

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        let authorization = {"Authorization": "apiKey " + event.target.value}
        props.setAuthorization(authorization)  
    }

    return (
        <div className="authorization">
            <h2>Authorization</h2>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Token</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="keyId:keySecret"
                    onChange={handleInputChange}

                    aria-label="Token"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>

        </div>
    )
}

export default AuthorizationBar
