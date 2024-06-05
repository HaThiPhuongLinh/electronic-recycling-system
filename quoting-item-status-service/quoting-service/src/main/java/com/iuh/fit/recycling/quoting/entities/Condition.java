package com.iuh.fit.recycling.quoting.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "conditions")
public class Condition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conditionId;
    private ConditionType type;
    private String name;
    private Integer percentDecrease;
    private String note;
    @JsonIgnore
    private Boolean active;

    @JsonIgnore
    public boolean isValidInformation(){
        if (type == null || name == null || percentDecrease == null) {
            return false;
        }
        return true;
    }

}
