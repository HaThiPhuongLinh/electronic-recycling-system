package com.iuh.fit.recycling.quoting.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;
    private String name;
    private String email;
    private String address;
    private String bankName;
    private String accountNumber;

    @JsonIgnore
    public boolean isValidInformation(){
        if (this.getName() == null ||
                this.getEmail() == null ||
                this.getAddress() == null ||
                this.getAccountNumber() == null)
            return false;
        return true;
    }

}
