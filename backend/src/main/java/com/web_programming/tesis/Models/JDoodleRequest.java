package com.web_programming.tesis.Models;

public class JDoodleRequest {
    private String script;
    private String language;
    private String versionIndex;
    private String clientId;
    private String clientSecret;

    // Constructores
    public JDoodleRequest() {}

    public JDoodleRequest(String script, String clientId, String clientSecret) {
        this.script = script;
        this.language = "csharp";
        this.versionIndex = "4"; // .NET 6.0
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    // Getters y Setters
    public String getScript() { return script; }
    public void setScript(String script) { this.script = script; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getVersionIndex() { return versionIndex; }
    public void setVersionIndex(String versionIndex) { this.versionIndex = versionIndex; }

    public String getClientId() { return clientId; }
    public void setClientId(String clientId) { this.clientId = clientId; }

    public String getClientSecret() { return clientSecret; }
    public void setClientSecret(String clientSecret) { this.clientSecret = clientSecret; }
}
