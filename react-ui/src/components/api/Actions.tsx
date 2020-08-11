import React from 'react'

import GetAction from './actions/GetAction'

import './Actions.scss'
import GetIdAction from './actions/GetIdAction'
import PostAction from './actions/PostAction'
import DeleteAction from './actions/DeleteAction'
import UpdateAction from './actions/UpdateAction'

interface Props {
    authorization: object
}

const Actions = (props: Props) => {

    const { authorization } = props
    
    return (
        <div className="actions">
            <h2>Customers</h2>
            <GetAction authorization={authorization}/>
            <PostAction authorization={authorization}/>
            <GetIdAction authorization={authorization}/>
            <UpdateAction authorization={authorization}/> 
            <DeleteAction authorization={authorization}/>
        </div>
    )
}

export default Actions
