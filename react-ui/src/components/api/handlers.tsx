import { ActionState } from "../../types/ActionState";


const handleApiResponse = (response: Response, setApiResponse: any, setActionState: any) => {                    
    setApiResponse({
        status: response.status + " " + response.statusText,
        data: {}
    })

    if (!response.ok) {
        setActionState(ActionState.FAILED)
        throw response;
    }

    setActionState(ActionState.SUCCESSFUL)
    return response.json()
}

const handleApiData = (data: object, setApiResponse: any) => {    
    
    setApiResponse((prevResponse: any) => {
        return {
            ...prevResponse,
            data: data
        }
    })
}

const handleResponseClear = (setActionState: any, setApiResponse: any) => {
    setApiResponse({
        status: "",
        data: {}
    })
    setActionState(ActionState.NEUTRAL)
}

export { handleApiResponse, handleApiData, handleResponseClear }