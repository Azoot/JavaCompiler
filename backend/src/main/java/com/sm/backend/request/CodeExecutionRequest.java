package com.sm.backend.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record CodeExecutionRequest(String sourceCode) {
    @JsonCreator
    public CodeExecutionRequest(@JsonProperty("sourceCode") String sourceCode) {
        this.sourceCode = sourceCode;
    }
}