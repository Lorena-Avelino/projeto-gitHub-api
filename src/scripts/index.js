import { getUser } from "./services/user.js";
import { getRepositories } from "./services/repositories.js"; 
import { getEvents } from "./services/events.js"; 

import { user } from "./objects/user.js"; 
import { screen } from "./objects/screen.js";

document.getElementById("btn-search").addEventListener("click", () => {
  //pesquisar ao pressionar o botão "Buscar"
  const userName = document.getElementById("input-search").value;
  if(validateEmptyInput(userName)) return;
  getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (event) => {
  //pesquisar quando pressionar a tecla "Enter" do teclado
  const userName = event.target.value;
  const key = event.which || event.keyCode; //pegar o código da chave que foi clicada
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if(validateEmptyInput(userName)) return;
    getUserData(userName);
  }
});

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub');
        return true;
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName);
    if(userResponse.message === "Not Found"){
        screen.renderNotFound();
        return;
    }
    
    const repositoriesResponse = await getRepositories(userName);
    const eventsResponse = await getEvents(userName);
    
    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse);

    screen.renderUser(user);
}



