
document.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelectorAll('.btn-delete')
    btn.forEach(b => {
        b.addEventListener('click', deleteUser)
    })
})

async function deleteUser() {
    let id = this.dataset.id
    if (id == null) return

    const confirmado = await confirmDialog('Esta ação remove o usuário permanentemente e não pode ser desfeita.', {
        title: 'Excluir usuário?',
        confirmText: 'Excluir',
        danger: true
    })
    if (!confirmado) return

    fetch('/admin/fecthDelete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then(res => res.json())
        .then(result => {
            if (result.ok) {
                showToast('Usuário excluído com sucesso!', 'success')
                setTimeout(() => window.location.reload(), 1000)
            } else {
                showToast('Algo deu errado ao excluir o usuário.', 'error')
            }
        })
}

