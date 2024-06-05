package com.iuh.fit.recycling.quoting.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.iuh.fit.recycling.quoting.config.CustomDateSerializer;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuotingItem {
    @Id
    private String quotingItemId;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToMany
    @JoinTable(
            name = "item_condition",
            joinColumns = @JoinColumn(name = "quotingitem_id"),
            inverseJoinColumns = @JoinColumn(name = "condition_id"))
    private Set<Condition> conditions;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    private int percentStatus;
    private double price;
    @JsonSerialize(using = CustomDateSerializer.class)
    private final LocalDateTime date = LocalDateTime.now();
    private boolean inProcess;

}
