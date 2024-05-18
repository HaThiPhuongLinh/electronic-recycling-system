package com.iuh.fit.recycling.quoting.controllers;

import com.iuh.fit.recycling.quoting.entities.Condition;
import com.iuh.fit.recycling.quoting.entities.ConditionType;
import com.iuh.fit.recycling.quoting.exception.SuccessResponse;
import com.iuh.fit.recycling.quoting.services.ConditionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/condition")
public class ConditionController {
    private final ConditionService conditionService;

    @GetMapping
    public ResponseEntity<List<Condition>> findAll(@RequestParam(name = "type", required = false) ConditionType type){
        if (type == null)
            return ResponseEntity.ok(conditionService.findAll());
        else
            return ResponseEntity.ok(conditionService.findAllByType(type));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Condition> findById(@PathVariable Long id){
        return ResponseEntity.ok(conditionService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Condition> add(@RequestBody Condition condition){
        return ResponseEntity.ok(conditionService.add(condition));
    }

    @PutMapping
    public  ResponseEntity<Condition> update(@RequestBody Condition condition) {
        return ResponseEntity.ok(conditionService.update(condition));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable Long id){
        conditionService.delete(id);
        return ResponseEntity.ok(new SuccessResponse("Delete Condition successfully"));
    }
}
