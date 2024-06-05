package com.iuh.fit.recycling.recycling.entities;

import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;


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
    @ManyToMany
    @JoinTable(
            name = "claimed_accessory",
            joinColumns = @JoinColumn(name = "accessory_id"),
            inverseJoinColumns = @JoinColumn(name = "recycling_item_id"))
    private Set<Accessory> claimedAccessory;
    private LocalDateTime time;
    private String note;
}
