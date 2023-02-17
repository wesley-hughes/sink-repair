import { getRequests, deleteRequest, getPlumbers, saveCompletion, changeRequest } from "./dataAccess.js"



const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    let html = ""
    html += `<tr>`
    if (request.completed) {
        html += `
        <td class="completions">${request.description}</td>
        <td class="completions"></td>
        <td class="completions">
        <button class="request__delete"id="request--${request.id}">
        Delete
        </button></td>
        </tr>
        `
    }
    else {
        html += `
        <td>${request.description}
        </td>
        <td><select class="plumbers" id="plumbers">
            <option value="">Choose</option>
            ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
            ).join("")
            }
            </select>     
        </td>
        <td>
        <button class="request__delete" id="request--${request.id}">Delete</button>
        </td>
    `
    }
    return html
}



const mainContainer = document.querySelector("#container")
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */

            const requests = getRequests()
            const foundRequest = requests.find((request) => {
                return request.id === parseInt(requestId)
            })
            foundRequest.completed = true

            // const completion = {requestId: requestId, plumberId: plumberId, date_created: Date.now() }

            // saveCompletion(completion)
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

            changeRequest(requestId, foundRequest)
        }
    }
)

export const Requests = () => {
    const requests = getRequests()

    let html = ""
    html += `<table class="requestsTable">
    <tr>
        <th>Description</th>
        <th>Completed By</th>
        <th>Delete</th>
    </tr>`
    let listItems = requests.map(convertRequestToListElement)
    html += listItems.join("")
    html += `</table>`
    return html
}



mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})