import { urlBase, repositoriesQuantity } from '../variables.js'

async function getRepositories(userName){
    const response = await fetch(`${urlBase}/${userName}/repos?per_page=${repositoriesQuantity}`)
    return await response.json()
}

export { getRepositories }