package com.iuh.fit.recycling.quoting.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private String name;
    private String series;
    private String imageUrl;
    private Double price;
    private String note;
    @JsonIgnore
    private Boolean active;

    @JsonIgnore
    public boolean isValidInformation(){
        if (this.getName() == null
                || this.getPrice() == null
                || this.getImageUrl() == null
                || this.getSeries() == null)
            return false;
        return true;
    }

}
