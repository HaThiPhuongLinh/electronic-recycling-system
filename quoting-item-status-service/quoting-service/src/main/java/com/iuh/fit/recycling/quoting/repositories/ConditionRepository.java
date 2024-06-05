package com.iuh.fit.recycling.quoting.repositories;


import com.iuh.fit.recycling.quoting.entities.Condition;
import com.iuh.fit.recycling.quoting.entities.ConditionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ConditionRepository extends JpaRepository<Condition, Long> {

    List<Condition> findAllByTypeAndActiveIsTrue(ConditionType type);

    List<Condition> findAllByActiveIsTrue();
}
