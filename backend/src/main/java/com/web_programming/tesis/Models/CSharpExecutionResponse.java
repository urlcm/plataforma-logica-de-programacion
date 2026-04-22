package com.web_programming.tesis.Models;

public class CSharpExecutionResponse {
    private boolean success;
    private String output;
    private String error;
    private String executionTime;

    // Constructores
    public CSharpExecutionResponse() {}

    public CSharpExecutionResponse(boolean success, String output) {
        this.success = success;
        this.output = output;
    }

    // Getters y Setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public String getExecutionTime() { return executionTime; }
    public void setExecutionTime(String executionTime) { this.executionTime = executionTime; }
}
