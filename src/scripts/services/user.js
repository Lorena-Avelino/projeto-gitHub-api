import { baseUrl } from '/src/scripts/variables.js';

async function getUser(userName) { // busca os dados do usuário
  const response = await fetch(`${baseUrl}/${userName}`);
  return await response.json();
}

export { getUser };