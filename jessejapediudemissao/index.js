const lastUpdate = document.getElementById('last-update');
const updatedAt = new Date().toISOString().split('T');
lastUpdate.innerHTML += `atualizado no dia ${updatedAt[0]} as ${updatedAt[1].split('.')[0]}`;
