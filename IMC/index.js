function calculaIMC(){
    var altura = document.getElementById('altura').value;
    var peso = document.getElementById('peso').value;

    var imc = peso / (altura * altura)
    var resultado = this.getResultado(imc);
    document.getElementById('resultado').innerHTML = resultado;
}

function getResultado(imc){
    if(imc < 18.5) return "Magreza";
    else if(imc >= 18.5 && imc < 24.9) return "Normal";
    else if(imc >= 24.9 && imc < 30) return "Sobrepeso";
    else if(imc >= 30) return "Obesidade";
    else return '';
}
