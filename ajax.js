function calculateImcAPI(person) {
    var request = createRequest();

    request.onreadystatechange = handleImcCalculateResponse.bind(request)(function (calculatedPerson) {
        person.imc = calculatedPerson.imc;
        person.speak(parseFloat(person.imc).toFixed(2) + " " + translateImc(person.imc), document.getElementById("imc"))
    });
    
    request.open('POST', 'http://localhost:8080/imc/calculate', true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({'height': person.height, 'weight': person.weight}));
}

function createRequest() {
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

function handleImcCalculateResponse(callback) {
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

