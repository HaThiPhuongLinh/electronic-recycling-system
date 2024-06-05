package com.iuh.fit.recycling.itemstatus.entities;

import com.iuh.fit.recycling.quoting.entities.QuotingItem;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemStatusId;

    @ManyToOne
    @JoinColumn(name = "quotingitem_id")
    private QuotingItem quotingItem;

    private Status status;
    private LocalDateTime time;

}
