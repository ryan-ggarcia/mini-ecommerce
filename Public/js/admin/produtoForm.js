document.addEventListener("DOMContentLoaded", () => {
    // Aplica a mascara de moeda usando IMask
    var priceElement = document.getElementById('preco');
    if(priceElement) {
        var maskOptions = {
            mask: Number,
            scale: 2,
            signed: false,
            thousandsSeparator: '.',
            padFractionalZeros: true,
            normalizeZeros: true,
            radix: ',',
            mapToRadix: ['.']
        };
        var priceMask = IMask(priceElement, maskOptions);
        
        // Formata o valor inicial se existir
        if(priceElement.value) {
            priceElement.value = parseFloat(priceElement.value.replace(',', '.')).toFixed(2).replace('.', ',');
            priceMask.updateValue();
        }
    }
    
    // Listener de Imagem Preview
    var imgInput = document.getElementById('img');
    var divPrevImg = document.getElementById('divPrevImg');
    var imgPrev = document.getElementById('imgPrev');
    
    if(imgInput && imgPrev) {
        imgInput.addEventListener('change', function(event) {
            if(event.target.files.length > 0) {
                var src = URL.createObjectURL(event.target.files[0]);
                imgPrev.src = src;
                if(divPrevImg) divPrevImg.style.display = 'block';
            }
        });
    }
});
