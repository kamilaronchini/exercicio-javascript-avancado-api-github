const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `
        <div>
            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
            <div class="data">
               <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
               <p>${user.userName ?? 'Não possui nome de usuário'}
               <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
               <p>Seguidores: ${user.followers}</p>
               <p>Seguindo: ${user.following}</p>
            </div>
        </div>`

        let repositoriesItems = ""
        user.repositories.forEach(repo => repositoriesItems += `<li>
                <a href="${repo.html_url}" target="blank">${repo.name}
                </a>
                <div class="info-repo">
                    <p>🍴${repo.forks_count}</p>
                    <p>⭐${repo.stargazers_count}</p>
                    <p>👀${repo.watchers_count}</p>
                    <p>🧑🏻‍💻${repo.language}</p>
                </div>
                
            </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul class="list">${repositoriesItems}</ul>
            </div>`
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    },

    renderEvent(event) {

        let events = ""
        event.event.forEach(event => {

            if (event.type === 'PushEvent'){
                events += `
                    <li>
                        <p class="event-name">${event.repo.name}</p>
                        <p>Mensagem do commit: ${event.payload.commits[0].message}</p>
                    </li>
                `
            } else if (event.type === 'CreateEvent'){
                events += `
                    <li>
                    <p class="event-name">${event.repo.name}</p>
                    <p>Referência: ${event.payload.ref_type}</p>
                `
            }
        })

        if (event.event.length > 0) {

            this.userProfile.innerHTML += `
            <div class="events">
                <h2>Eventos</h2>
                <ul class="list">${events}</ul>
            </div>`
        }

        if (event.event.length === 0) {

            this.userProfile.innerHTML += `
            <div class="events">
                <h2>Eventos</h2>
                <p class="dif-type">Usuário não possui eventos!</p>
            </div>`
        } 
        
        if (event.event.type != 'CreateEvent' && event.event.type != 'PushEvent' && event.event.length > 0) {
            this.userProfile.innerHTML += `
            <p class="dif-type">Usuário possui outros tipos de eventos!</p>`
        }
    }
}

export { screen }