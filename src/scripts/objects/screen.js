const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
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
                                                                        <div class="info-repo">
                                                                            <p>🍴 ${repo.forks_count}</p>
                                                                            <p>⭐ ${repo.stargazers_count}</p>
                                                                            <p>👀 ${repo.stargazers_count}</p>`;
                                                                            if(repo.language !== null){
                                                                            repositoriesItens += `<p>🧑🏽‍💻 ${repo.language}</p>`;
                                                                            }
                                                                            repositoriesItens +=
                                                                        `</div>
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
            if(event.type === "CreateEvent" || event.type === "PushEvent"){
                
                if(event.payload.description === null){
                    eventsItens += `<li><strong>${event.repo.name}</strong></li>`
                } else {
                    eventsItens += `<li><strong>${event.repo.name}</strong>`
                    
                    // console.log(commits[0].message, commits[1].message)
                    const commits = event.payload.commits || [];
                    // const qtd = event.payload.commits.length;
                    
                    for(let i=0; i < commits.length; i++){
                        // const commits = event.payload.commits;
                        eventsItens += ` - ${commits[i].message}<br></li>`;
                        // console.log(commits)
                    }
                }
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