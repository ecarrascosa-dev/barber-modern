const nameClientInput = document.getElementById('nameClient')
const phoneClientInput = document.getElementById('phoneClient')
const formRegisterClient = document.getElementById('formRegisterClient')

const tableClients = document.getElementById('tableClients')

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add(
        'px-4', 'py-3', 'rounded-lg', 'shadow-lg', 'text-white', 
        'font-medium', 'flex', 'items-center', 'gap-2',
        'transform', 'translate-x-full', 'transition', 'duration-300', 'ease-in-out'
    );

    if (type === 'success') {
        toast.classList.add('bg-emerald-600');
    } else {
        toast.classList.add('bg-rose-600'); 
    }

    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-full');
    
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}


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

                    //* Edit button
                const a = document.createElement('a')
                    a.classList.add('font-medium', 'pr-3', 'text-indigo-600', 'hover:text-indigo-950', 'transition', 'cursor-pointer')
                    a.textContent = 'Editar'
                    tdActions.appendChild(a)
                        //* Function Edit Button
                        a.addEventListener('click', () => {
                            const divPopEdit = document.getElementById('edit-container')
                            divPopEdit.innerHTML = 
                            `<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                <form id="edit-form" class="w-full max-w-md rounded-2xl bg-white p-8 mb-10 shadow-lg shadow-indigo-400 border border-indigo-400">
                                    <div class="mb-6 text-center">
                                        <h2 class="text-2xl font-bold text-zinc-900 tracking-tight">Edição do cliente</h2>
                                        <p class="text-sm text-zinc-500 mt-1">Edite os dados do cliente</p>
                                    </div>
                                    <div>
                                        <label for="nameClientEdit" class="block text-sm font-medium text-zinc-700 mb-1.5"> Nome Completo</label>
                                        <input type="text" id="nameClientEdit" name="nameClientEdit" required value="${client.nameClient}" class="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-100 transition duration-200"/>
                                    </div>
                                    <div class="my-4">
                                        <label for="phoneClientEdit" class="block text-sm font-medium text-zinc-700 mb-1.5">WhatsApp / Celular</label>
                                        <input type="tel" id="phoneClientEdit" name="phoneClientEdit" required value="${client.phoneClient}"class="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-purple-100 transition duration-200"/>
                                    </div>
                                    <button id="editClientButton" type="submit" class="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-800 active:scale-[0.98] transition duration-200 shadow-sm shadow-purple-200 mt-2 cursor-pointer ">Editar Cliente</button>
                                    <button id="editCancelButton" type="button" class="w-full rounded-xl py-3 text-sm font-semibold text-red-600 cursor-pointer border border-red-300 mt-2">Cancelar</button>
                                </form>
                            </div>`
                            const editForm = document.getElementById('edit-form')
                            editForm.addEventListener('submit', async (e) => {

                                e.preventDefault()

                                const nameClientEdit = document.getElementById('nameClientEdit').value
                                const phoneClientEdit = document.getElementById('phoneClientEdit').value
                                console.log(nameClientEdit, phoneClientEdit)
                                const resposta = await fetch(`/api/clients/edit/${client._id}`, {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        nameClient: nameClientEdit,
                                        phoneClient: phoneClientEdit
                                    })
                                })

                                if(resposta.ok) {
                                    divPopEdit.innerHTML = ''
                                    showToast('Cliente editado com sucesso!', 'success')
                                    fetchListClients()
                                } else {
                                    showToast('Não foi possível editar Cliente', 'error')
                                }
                                
                            })
                            
                            const editCancelButton = document.getElementById('editCancelButton')
                            editCancelButton.addEventListener('click', () => {
                                divPopEdit.innerHTML = ''
                            })
                        })


                    //* Delete button
                const button = document.createElement('button')
                    button.classList.add('font-medium', 'text-red-600', 'hover:text-red-950', 'transition', 'cursor-pointer')
                    button.textContent = 'Excluir'
                    tdActions.appendChild(button)
                        //* Function Delete Button
                            button.addEventListener('click', async() => {
                                if(!confirm(`Você deseja mesmo deletar o cliente ${client.nameClient}?`)) return 
                                
                                const respostaDelete = await fetch(`/api/clients/${client._id}`, {method: 'DELETE'})
                                
                                if(respostaDelete.ok) {
                                    showToast('Cliente deletado com sucesso!', 'success')
                                    fetchListClients()
                                } else {
                                    showToast('Não foi possível deletar Cliente', 'error')
                                }
                                
                                                    
                                
                            })

        tr.appendChild(tdName)
        tr.appendChild(tdPhone)
        tr.appendChild(tdActions)
        tableClients.appendChild(tr)
    });
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

    if (resposta.ok) {
        showToast('Cliente cadastrado com sucesso!', 'success');
        formRegisterClient.reset();
        fetchListClients()
    } else {
        showToast('Erro ao cadastrar cliente.', 'error');
    }
    

})

fetchListClients()