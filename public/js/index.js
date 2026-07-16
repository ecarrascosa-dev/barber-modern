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