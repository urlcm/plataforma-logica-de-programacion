package com.web_programming.tesis.Services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web_programming.tesis.Models.OllamaResponse;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.ai.util.json.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OllamaServices {

    @Autowired
    private OllamaChatModel ChatModel;

    public String generateResult(String prompt) {
        try {
            RestTemplate rest = new RestTemplate();
            String url = "http://localhost:11434/api/generate";

            String body = "{\"model\":\"qwen3-coder:480b-cloud\",\"prompt\":\"" + prompt + "\"}";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(body, headers);

            // Recibir todo el streaming como String
            String rawResponse = rest.postForObject(url, request, String.class);

            // Concatenar los fragmentos de cada línea
            StringBuilder finalResponse = new StringBuilder();
            String[] lines = rawResponse.split("\n");
            for (String line : lines) {
                if (!line.isBlank()) {
                    JsonNode jsonNode = JsonParser.getObjectMapper().readTree(line);
                    if (jsonNode.has("response")) {
                        finalResponse.append(jsonNode.get("response").asText());
                    }
                }
            }

            return finalResponse.toString();
            //Si jala
            /*String response = rest.postForObject(url, request, String.class);

            return response != null ? response : "Respuesta vacía";*/
            // Mapea la respuesta JSON a la clase OllamaResponse
            //OllamaResponse response = rest.postForObject(url, request, OllamaResponse.class);

            //return (response != null) ? response.getResponse() : "Respuesta vacía";

        } catch (Exception e) {
            return "Error al generar respuesta: " + e.getMessage();
        }
    }

    public Map<String, Object> generateStructuredResult(String prompt) {
        String url = "http://localhost:11434/api/generate";

        Map<String, Object> body = new HashMap<>();
        body.put("model", "qwen3-coder:480b-cloud");
        body.put("prompt", prompt);
        body.put("stream", false);

        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            String text = response.getBody();

            // Extrae inputs y outputs del texto con regex simple
            List<String> inputs = extractMatches(text, "(?i)input\\s*[:：]\\s*(.+)");
            List<String> outputs = extractMatches(text, "(?i)output\\s*[:：]\\s*(.+)");

            Map<String, Object> structuredResponse = new HashMap<>();
            structuredResponse.put("inputs", inputs);
            structuredResponse.put("outputs", outputs);

            return structuredResponse;

        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al generar respuesta: " + e.getMessage());
            return error;
        }
    }

    private List<String> extractMatches(String text, String regex) {
        List<String> matches = new ArrayList<>();
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);

        while (matcher.find()) {
            matches.add(matcher.group(1).trim());
        }
        return matches;
    }


    /*public String generateResult(String prompt){
        OllamaOptions options = new OllamaOptions();
        options.setModel("qwen3-coder:480b-cloud");
        ChatResponse response = ChatModel.call(new Prompt(prompt,options));

        if(response != null)
        {
            return  response.getResult().getOutput().getText();
        }

        return "Recarga la pagina, Hubo un error";
    }*/
}
