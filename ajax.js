function enviaParaBackend(jsonParaEnviar) {
    console.log("passa por aqui primeiro");
    var request = criaRequest();

    request.onreadystatechange = handleResponse.bind(request)(function (jsonResponse) {
        console.log("passa por aqui quinto (se der certo)");
        jsonParaEnviar.nome = jsonResponse.nome;
        jsonParaEnviar.idade = jsonResponse.idade;
    });
    
    console.log("passa por aqui quarto");
    request.open('POST', 'http://localhost:8080/endpoint', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({'nome': jsonParaEnviar.nome, 'idade': jsonParaEnviar.idade}));
}

function criaRequest() {
    console.log("passa por aqui segundo");
    var request = null;
    try {
        request = new XMLHttpRequest();
    } catch (tryMS) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                console.log("no way to create XMLHttpRequest object");
            }
        }
    }

    return request;
}

function handleResponse(callback) {
    console.log("passa por aqui terceiro");
    var self = this;
    return function() {
        if (self.readyState == 4) {
            if (self.status == 200) {
                callback(JSON.parse(self.responseText));
            } else {
                console.log(self.status);
                alert('sorry, something wrong on API call');
            }
        }
    }
}
