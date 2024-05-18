package com.iuh.fit.recycling.itemstatus.entities;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ItemState {
    private Status status;
    private LocalDateTime time;
}
