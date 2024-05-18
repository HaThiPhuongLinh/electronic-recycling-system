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
public class FunctionalAssessmentReceivedItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "received_item_id", referencedColumnName = "id")
    private ReceivedItem receivedItem;
    @ElementCollection
    @CollectionTable(name = "functional_assessment_proof", joinColumns = @JoinColumn(name = "functional_assessment_id"))
    private List<String> functionalAssessmentProof;
    private FunctionalAssessmentStatus status;
    private LocalDateTime time;
    private String note;
}
