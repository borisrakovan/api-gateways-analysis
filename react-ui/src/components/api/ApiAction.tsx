import React, { useState } from 'react'

import './ApiAction.scss'
import { ActionState } from '../../types/ActionState'
import { Table, Button } from 'react-bootstrap'


interface Props {
    method: string,
    endpoint: string,
    onExecute: () => void,
    response: { status: string, data: object }
    children: React.ReactNode,
    actionState: ActionState,
    onResponseClear: () => void
}

const ApiAction = (props: Props) => {
    const { children, method, endpoint, response, actionState } = props

    const [rawView, setRawView] = useState(false)

    const handleExecute = () => {
        props.onExecute()
    }

    const handleViewRaw = () => {
        if (!isEmptyObject(response.data)) {
            setRawView(!rawView)
        }
    }

    const handleClear = () => {
        props.onResponseClear()
    }

    const isEmptyObject = (obj: object) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }
    
    let customers;
    if (!isEmptyObject(response.data)) {
        customers = Array.isArray(response.data) ? response.data : [response.data]
    } 
    
    let customerView;
    if (customers && customers.length > 0) {
        if (rawView) {
            customerView = <p className="nowrap">{JSON.stringify(response.data)}</p>
        }
        else {
            customerView = (
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Age</th>
                        <th>Email Address</th>
                    </tr>
                    </thead>
                    <tbody>
                        {customers.map(c =>
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>    {c.fullName}</td>
                                <td>{c.age}</td>
                                <td>{c.emailAddress}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )

        }
    } 
    let stateClass = ActionState[actionState].toLowerCase()
    return (
        <div className={"api-action api-action-" + method + " " + stateClass}>
            <div className="group">
                <div className="action-description">
                    <span className="action-method">{method.toUpperCase()}</span>
                    <span className="endpoint">{endpoint}</span>
                </div>

                <div className="execute">
                    <button onClick={handleExecute}>Execute</button>
                </div>
            </div>
            {children}

            <div className="action-result">
                <div className="header">
                    {response.status && 
                        <div>
                            <p className={"status " + stateClass}>
                                <b>{response.status}</b>
                            </p>
                            <div>
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    onClick={handleViewRaw}
                                    className={(isEmptyObject(response.data)) ? "disabled" : ""}
                                    >
                                    {rawView ? 'Table' : 'Raw'}
                                </Button>
                                {' '}
                                <Button
                                    variant="outline-warning"
                                    size="sm"
                                    onClick={handleClear}
                                >
                                    Clear
                                </Button>
                            </div>
                        </div>
                    }
                    
                </div>
                {customerView}
            </div>
        </div>      
    )
}

export default ApiAction
