package com.iuh.fit.recycling.recycling.entities;

import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "func_assessment_item_id", referencedColumnName = "id")
    private FunctionalAssessmentReceivedItem item;
    private LocalDateTime time;
    private String note;
}
