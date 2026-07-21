// NUMBER CLIENTS

document.addEventListener('DOMContentLoaded', async () => {
    const counterElement = document.getElementById('counterClients');

    try {
        const resposta = await fetch('/api/clients/count');
        const dados = await resposta.json();
        console.log(resposta)

        counterElement.textContent = dados.total;
    } catch (error) {
        console.error("Erro ao buscar contagem:", error);
        counterElement.textContent = "0";
    }
});

// BUTTON SEE MORE

const contentSeeMore = document.getElementById('contentSeeMore')
const buttonSeeMore = document.getElementById('buttonSeeMore')
const buttonSeeLess = document.getElementById('buttonSeeLess')

buttonSeeMore.addEventListener('click', () => {
    contentSeeMore.classList.remove('hidden')
    buttonSeeMore.classList.add('hidden')
    buttonSeeLess.classList.remove('hidden')
})

buttonSeeLess.addEventListener('click', () => {
    contentSeeMore.classList.add('hidden')
    buttonSeeMore.classList.remove('hidden')
    buttonSeeLess.classList.add('hidden')
})