document.addEventListener("DOMContentLoaded", () => {
    // Aplica as máscaras usando IMask para os formulários de usuário
    var telInput = document.getElementById('tel');
    var cpfInput = document.getElementById('cpf');
    var cepInput = document.getElementById('cep');

    if(telInput) {
        var telMask = IMask(telInput, { mask: '(00) 00000-0000' });
        telMask.updateValue();
    }
    
    if(cpfInput) {
        var cpfMask = IMask(cpfInput, { mask: '000.000.000-00' });
        cpfMask.updateValue();
    }
    
    if(cepInput) {
        var cepMask = IMask(cepInput, { mask: '00000-000' });
        cepMask.updateValue();
    }
});
