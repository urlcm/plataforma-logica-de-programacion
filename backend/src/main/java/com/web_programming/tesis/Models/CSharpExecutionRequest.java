package com.web_programming.tesis.Models;

public class CSharpExecutionRequest {
    private String code;

    // Constructores
    public CSharpExecutionRequest() {}

    public CSharpExecutionRequest(String code) {
        this.code = code;
    }

    // Getters y Setters
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}
