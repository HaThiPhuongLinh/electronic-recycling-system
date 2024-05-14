package com.iuh.fit.recycling.quoting.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SuccessResponse {
    private Integer status;
    private String message;

    public SuccessResponse(String message) {
        this.status = 200;
        this.message = message;
    }
}
