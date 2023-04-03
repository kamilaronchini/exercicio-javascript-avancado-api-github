import { urlBase, repositoriesQuantity } from "../variables.js"

async function getEvents(userName){
    const response = await fetch(`${urlBase}/${userName}/events?per_page=${repositoriesQuantity}`)
    return await response.json()
}

export { getEvents }