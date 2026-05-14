const btnModal = document.querySelectorAll('.open-modal')
const openModal = document.querySelector('.modal')
const closeModal = document.querySelector('.close-modal')

document.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelectorAll('.btn-delete')
    let btnEnd = document.querySelectorAll('.open-modal')
    btn.forEach(b => {
        b.addEventListener('click', deleteUser)
    })
    btnEnd.forEach(e => {
        e.addEventListener('click', getEnd)
    })
})

function deleteUser() {
    let id = this.dataset.id
    if (id != null) {
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
                    alert('Sucesso! Usuário deletado.')
                    window.location.reload()
                } else {
                    alert('Erro...Algo deu errado ao excluir o usuário')
                    window.location.reload()
                }
            })
    }
}
function getEnd() {
    let id = this.dataset.end
    if (id != null) {
        fetch('/admin/getEnd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application'
            },
            body: JSON.stringify({ id: id })
        })
            .then(res => res.json())
            .then(result => {
                if (result.length > 0) {
                    btnModal.forEach(b => {
                        b.addEventListener('click', function () {
                            openModal.classList.toggle('active')
                        })
                    })
                }
            })
    }
}
