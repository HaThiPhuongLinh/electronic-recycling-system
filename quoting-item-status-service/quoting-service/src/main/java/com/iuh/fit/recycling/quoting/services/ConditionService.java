package com.iuh.fit.recycling.quoting.services;

import com.iuh.fit.recycling.quoting.entities.Condition;
import com.iuh.fit.recycling.quoting.entities.ConditionType;

import java.util.List;

public interface ConditionService {
    List<Condition> findAll();
    Condition findById(Long id);
    List<Condition> findAllByType(ConditionType type);
    Condition add(Condition condition);
    Condition update(Condition condition);
    void delete(Long conditionId);


}
