package fit.imc.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fit.imc.view.Person;

@RestController
@CrossOrigin(origins = {
    "http://localhost:8000", 
    "http://127.0.0.1:8000",
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8887"
})
@RequestMapping("/imc")
public class ImcController {
    @GetMapping("/table")
    public Map<String, String> getTable() {
        var map = new HashMap<String, String>();
    
        map.put("0", "Magreza");
        map.put("18.5", "Normal");
        map.put("24.9", "Sobrepeso");
        map.put("99", "Obesidade");

        return map;
    }

    @PostMapping("/calculate")
    public Person calculateImc(@RequestBody Person person) {
        System.out.println("entrou aqui");
        person.imc = person.weight / Math.pow(person.height, 2);
        if (person.imc < 18.5) person.imcDescription = "Magreza";
        else if (person.imc < 24.9) person.imcDescription = "Normal";
        else if (person.imc <= 30.0) person.imcDescription = "Sobrepeso";
        else if (person.imc > 30.0) person.imcDescription = "Obesidade";
        
        return person;
    }
}
