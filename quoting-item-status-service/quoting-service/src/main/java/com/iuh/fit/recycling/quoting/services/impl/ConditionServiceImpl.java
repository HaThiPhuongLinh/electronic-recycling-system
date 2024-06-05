package com.iuh.fit.recycling.quoting.services.impl;

import com.iuh.fit.recycling.quoting.entities.Condition;
import com.iuh.fit.recycling.quoting.entities.ConditionType;
import com.iuh.fit.recycling.quoting.exception.BadRequestException;
import com.iuh.fit.recycling.quoting.exception.NotFoundException;
import com.iuh.fit.recycling.quoting.repositories.ConditionRepository;
import com.iuh.fit.recycling.quoting.services.ConditionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConditionServiceImpl implements ConditionService {

    private final ConditionRepository conditionRepository;

    @Override
    public List<Condition> findAll() {

        return conditionRepository.findAllByActiveIsTrue();
    }

    @Override
    public Condition findById(Long id) {
        if (id  == null)
            throw new BadRequestException("ConditionId can not be null");

        return conditionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("condition not found"));
    }

    @Override
    public List<Condition> findAllByType(ConditionType type) {

        if (type == null)
            throw new BadRequestException("conditionType is required");

        return conditionRepository.findAllByTypeAndActiveIsTrue(type);
    }

    @Override
    public Condition add(Condition condition) {

        if (condition == null)
            throw new BadRequestException("Condition can not be null");

        if (!condition.isValidInformation())
            throw new BadRequestException("Condition information is required");

        condition.setConditionId(null);
        condition.setActive(true);
        return conditionRepository.save(condition);
    }

    @Override
    public Condition update(Condition condition) {
        if (condition == null)
            throw new BadRequestException("Condition can not be null");

        if (!condition.isValidInformation() || condition.getConditionId() == null)
            throw new BadRequestException("Condition information is required");

        Condition existedCondition = findById(condition.getConditionId());
        existedCondition.setName(condition.getName() != null ? condition.getName() : existedCondition.getName());
        existedCondition.setType(condition.getType() != null ? condition.getType() : existedCondition.getType());
        existedCondition.setNote(condition.getNote() != null ? condition.getNote() : existedCondition.getNote());

        return conditionRepository.save(existedCondition);
    }

    @Override
    public void delete(Long conditionId) {
        Condition condition = findById(conditionId);
        condition.setActive(false);
        conditionRepository.save(condition);
    }
}
