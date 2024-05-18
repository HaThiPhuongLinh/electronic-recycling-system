package com.iuh.fit.recycling.recycling.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
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
public class RecyclingItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "func_assessment_item_id", referencedColumnName = "id")
    private FunctionalAssessmentReceivedItem item;
    @OneToMany
    @JoinColumn(name = "recycling_item_id")
    private List<Accessory> claimedAccessory;
    private LocalDateTime time;
    private String note;
}
