import { getUser } from './services/getUser.js'
import { getRepositories } from './services/getRepositories.js'
import { getEvents } from './services/getEvents.js'

import { screen } from '../js/objects/screen.js'
import { user } from '../js/objects/user.js'
import { event } from '../js/objects/event.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value

    validateEmptyInput(userName)
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (enter) => {
    const userName = enter.target.value
    const key = enter.which || enter.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo de pesquisa com o nome do usuário do GitHub que deseja procurar!')
        return true
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    const eventResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    event.setEvents(eventResponse)

    screen.renderUser(user)
    screen.renderEvent(event)
}