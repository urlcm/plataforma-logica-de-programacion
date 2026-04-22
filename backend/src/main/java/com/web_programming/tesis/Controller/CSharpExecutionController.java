package com.web_programming.tesis.Controller;
import com.web_programming.tesis.Models.CSharpExecutionRequest;
import com.web_programming.tesis.Models.CSharpExecutionResponse;
import com.web_programming.tesis.Services.JDoodleService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/csharp")
@CrossOrigin(value = "http://localhost:4200")
public class CSharpExecutionController {

    private final JDoodleService jdoodleService;

    public CSharpExecutionController(JDoodleService jdoodleService) {
        this.jdoodleService = jdoodleService;
    }

    @PostMapping("/execute")
    public Mono<ResponseEntity<CSharpExecutionResponse>> executeCSharp(
            @RequestBody CSharpExecutionRequest request) {

        if (request.getCode() == null || request.getCode().trim().isEmpty()) {
            return Mono.just(ResponseEntity.badRequest()
                    .body(new CSharpExecutionResponse(false, "El código no puede estar vacío")));
        }

        if (!jdoodleService.areCredentialsConfigured()) {
            return Mono.just(ResponseEntity.status(503)
                    .body(new CSharpExecutionResponse(false,
                            "Servicio de ejecución no configurado. Configure las credenciales de JDoodle.")));
        }

        return jdoodleService.executeCSharpCode(request.getCode())
                .map(response -> {
                    if (response.isSuccess()) {
                        return ResponseEntity.ok(response);
                    } else {
                        return ResponseEntity.status(500).body(response);
                    }
                });
    }


    // 🔥 NUEVO ENDPOINT para text/plain (agregar esto)
    @PostMapping(value = "/execute-text", consumes = MediaType.TEXT_PLAIN_VALUE)
    public Mono<ResponseEntity<CSharpExecutionResponse>> executeCSharpText(
            @RequestBody String code) {

        if (code == null || code.trim().isEmpty()) {
            return Mono.just(ResponseEntity.badRequest()
                    .body(new CSharpExecutionResponse(false, "El código no puede estar vacío")));
        }

        if (!jdoodleService.areCredentialsConfigured()) {
            return Mono.just(ResponseEntity.status(503)
                    .body(new CSharpExecutionResponse(false,
                            "Servicio de ejecución no configurado.")));
        }

        return jdoodleService.executeCSharpCode(code)
                .map(response -> {
                    if (response.isSuccess()) {
                        return ResponseEntity.ok(response);
                    } else {
                        return ResponseEntity.status(500).body(response);
                    }
                });
    }

    @GetMapping("/health")
    public ResponseEntity<CSharpExecutionResponse> healthCheck() {
        boolean configured = jdoodleService.areCredentialsConfigured();
        String message = configured ?
                "Servicio C# configurado correctamente" :
                "Servicio C# necesita configuración de credenciales";

        CSharpExecutionResponse response = new CSharpExecutionResponse(
                configured,
                message
        );

        return configured ?
                ResponseEntity.ok(response) :
                ResponseEntity.status(503).body(response);
    }
}
