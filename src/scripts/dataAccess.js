const applicationState = {
    requests: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const getRequests = () => {
    let sortedArray= applicationState.requests.sort((a,b) => (a.completed === b.completed) ? 0: (a.completed > b.completed) ? 1 : -1 )
    return sortedArray
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber }))
}

// export const saveCompletion = (serviceCompletion) => {
//     const fetchOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(serviceCompletion)
//     }


//     return fetch(`${API}/completions`, fetchOptions)
//         .then(response => response.json())
//         .then(() => {
//             document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
//         })
// }

// export const fetchCompletions = () => {
//     return fetch(`${API}/completions`)
//         .then(response => response.json())
//         .then(
//             (data) => {
//                 applicationState.completions = data
//             }
//         )
// }

export const changeRequest = (objectId, object) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }

    return fetch(`${API}/requests/${objectId}`, fetchOptions)
    .then(response => response.json())
    .then (() => {
        document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
    })
}