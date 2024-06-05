package com.iuh.fit.recycling.receiving.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReceivedItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String quotingItemId;
    private LocalDateTime time;
    @ElementCollection
    @CollectionTable(name = "media_proof", joinColumns = @JoinColumn(name = "received_item_id"))
    private List<String> mediaProof;
    private ReceivedStatus status;
    private String note;
}
