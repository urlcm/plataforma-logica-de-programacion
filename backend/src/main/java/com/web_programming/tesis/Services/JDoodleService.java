package com.web_programming.tesis.Services;
import com.web_programming.tesis.Models.CSharpExecutionRequest;
import com.web_programming.tesis.Models.CSharpExecutionResponse;
import com.web_programming.tesis.Models.JDoodleRequest;
import com.web_programming.tesis.Models.JDoodleResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class JDoodleService {
    private final WebClient webClient;

    @Value("${jdoodle.client.id:}")
    private String clientId;

    @Value("${jdoodle.client.secret:}")
    private String clientSecret;

    @Value("${jdoodle.api.url:https://api.jdoodle.com/v1/execute}")
    private String jdoodleApiUrl;

    public JDoodleService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    // 🔥 NUEVO MÉTODO - Agregar esto al final de la clase
    private String cleanCSharpCode(String code) {
        if (code == null) return "";

        // Reemplazar comillas escapadas por comillas normales
        return code.replace("\\\"", "\"")
                .replace("\\n", "\n")
                .replace("\\t", "\t");
    }


    public Mono<CSharpExecutionResponse> executeCSharpCode(String code) {
        // NUEVA LINEA: Limpiar el código antes de enviarlo
        String cleanedCode = cleanCSharpCode(code);
        JDoodleRequest request = new JDoodleRequest(code, clientId, clientSecret);

        return webClient.post()
                .uri(jdoodleApiUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(JDoodleResponse.class)
                .map(this::mapToExecutionResponse)
                .onErrorResume(error -> {
                    // Manejo de errores
                    return Mono.just(new CSharpExecutionResponse(
                            false,
                            "Error conectando con JDoodle: " + error.getMessage()
                    ));
                });
    }

    private CSharpExecutionResponse mapToExecutionResponse(JDoodleResponse jdoodleResponse) {
        CSharpExecutionResponse response = new CSharpExecutionResponse();

        if (jdoodleResponse.getOutput() != null) {
            response.setSuccess(true);
            response.setOutput(jdoodleResponse.getOutput());
        } else if (jdoodleResponse.getError() != null) {
            response.setSuccess(false);
            response.setError(jdoodleResponse.getError());
        } else {
            response.setSuccess(false);
            response.setError("No se recibió respuesta del compilador");
        }

        if (jdoodleResponse.getCpuTime() != null) {
            response.setExecutionTime(jdoodleResponse.getCpuTime());
        }

        return response;
    }

    // Método para verificar credenciales (opcional)
    public boolean areCredentialsConfigured() {
        return clientId != null && !clientId.isEmpty() &&
                clientSecret != null && !clientSecret.isEmpty();
    }
}
