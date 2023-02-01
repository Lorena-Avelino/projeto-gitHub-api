const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
        console.log(user)
        this.userProfile.innerHTML = `<div class="info">
                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                        <div class="data">
                            <h1>${user.name ?? "Não possui nome cadastrado 😢"}</h1>
                            <p>${user.bio ?? "Não possui bio cadastrada 😢"}</p>
                            <div class="follow">
                                <span>👥</span>
                                <p>${user.followers} seguidores</p>
                                <p>•</p>
                                <p>${user.following} seguindo</p>
                            </div>
                        </div>
                    </div>`;
        let repositoriesItens = '';
        user.repositories.forEach(repo => {repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">
                                                                        ${repo.name}
                                                                        <ul>
                                                                            <li>🍴 ${repo.forks_count}</li>
                                                                            <li>⭐ ${repo.stargazers_count}</li>
                                                                            <li>👀 ${repo.stargazers_count}</li>`;
                                                                            if(repo.language !== null){
                                                                            repositoriesItens += `<li>🧑🏽‍💻 ${repo.language}</li>`;
                                                                            }
                                                                            repositoriesItens +=
                                                                        `</ul>
                                                                    </a>
                                                                </li>`;
    });
        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`;
        }

        let eventsItens = '';
        user.events.forEach(event => {
            if(event.type === "CreateEvent"){
                if(event.payload.description === null){
                eventsItens += `<li>
                                    <strong>${event.repo.name}</strong></li>`;
                                } else { eventsItens +=
                                    `<li>
                                        <strong>${event.repo.name}</strong>
                                        <p> - ${event.payload.description}</p>
                                    </li>`;
                                }
            }

            if(event.type === "PushEvent"){
                eventsItens += `<li>
                                    <strong>${event.repo.name}</strong>
                                    <p> - ${event.payload.commits[0].message}</p>
                                </li>`
            }
        });
        if(user.events.length > 0 && eventsItens !== ""){
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`;
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
}

export { screen };