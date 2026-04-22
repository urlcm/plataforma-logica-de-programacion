package com.web_programming.tesis.Controller;
import com.web_programming.tesis.Services.OllamaServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("plataforma-programuat")
@CrossOrigin(value = "http://localhost:4200")
public class OllamaIAController {
    @Autowired
    private OllamaServices IAServices;

    private static final Logger logger = LoggerFactory.getLogger(OllamaIAController.class);

    @GetMapping("/api/v1/generate")
    public String generateCode(@RequestParam String promptMessage){
        return IAServices.generateResult(promptMessage);
    }

    @GetMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateInputsOutputs(@RequestParam String promptMessage) {
        try {
            String decodedPrompt = java.net.URLDecoder.decode(promptMessage, StandardCharsets.UTF_8);
            Map<String, Object> result = IAServices.generateStructuredResult(decodedPrompt);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al generar respuesta: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

}
