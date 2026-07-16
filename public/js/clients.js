const nameClientInput = document.getElementById('nameClient')
const phoneClientInput = document.getElementById('phoneClient')
const formRegisterClient = document.getElementById('formRegisterClient')
const statusClient = document.getElementById('statusClient')

const tableClients = document.getElementById('tableClients')

async function fetchListClients() {
    const resposta = await fetch('/api/clients')
    const clientList = await resposta.json()
    
    tableClients.innerHTML = ''
    
    clientList.listClients.forEach(client => {
        const tr = document.createElement('tr')
        tr.classList.add('hover:bg-zinc-50/70', 'transition', 'duration-150')

        

        const tdName = document.createElement('td')
            tdName.textContent = client.nameClient
            tdName.classList.add('px-6', 'py-4', 'font-medium', 'text-zinc-900')

        const tdPhone = document.createElement('td')
            tdPhone.textContent = client.phoneClient
            tdPhone.classList.add('px-6', 'py-4')

        const tdActions = document.createElement('td')
            tdActions.classList.add('px-6', 'py-4', 'text-right')
                const div = document.createElement('div')
                    div.classList.add('flex', 'justify-end', 'gap-3')
                    tdActions.appendChild(div)
                const a = document.createElement('a')
                    a.classList.add('font-medium', 'pr-3', 'text-indigo-600', 'hover:text-indigo-950', 'transition')
                    a.textContent = 'Editar'
                    tdActions.appendChild(a)
                const button = document.createElement('button')
                    button.classList.add('font-medium', 'text-red-600', 'hover:text-red-950', 'transition')
                    button.textContent = 'Excluir'
                    tdActions.appendChild(button)

        tr.appendChild(tdName)
        tr.appendChild(tdPhone)
        tr.appendChild(tdActions)
        tableClients.appendChild(tr)
    });

    fetchListClients()
}


formRegisterClient.addEventListener('submit', async (e) => {

    e.preventDefault()
    
    const nameClient = nameClientInput.value
    const phoneClient = phoneClientInput.value

    const resposta = await fetch('/api/clients', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nameClient, phoneClient})
    })

    const resFetch = await resposta.json()
    statusClient.textContent = resFetch.message

    nameClientInput.value = ''
    phoneClientInput.value = ''
    
    fetchListClients()
})

fetchListClients()