package com.iuh.fit.recycling.recycling.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentStatus;
import com.iuh.fit.recycling.receiving.exception.BadRequestException;
import com.iuh.fit.recycling.receiving.exception.NotFoundException;
import com.iuh.fit.recycling.receiving.models.ItemStatusDTO;
import com.iuh.fit.recycling.receiving.utils.DateTimeUtil;
import com.iuh.fit.recycling.recycling.entities.Transaction;
import com.iuh.fit.recycling.recycling.repositories.TransactionRepository;
import com.iuh.fit.recycling.recycling.services.TransactionService;
import com.iuh.fit.recycling.recycling.utils.RestUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionItemServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final JmsTemplate template;
    @Override
    public List<Transaction> findAll() {
        return transactionRepository.findAll();
    }

    @Override
    public Transaction findByQuotingItemId(String quotingItemId) {
        return transactionRepository.findByItemReceivedItemQuotingItemId(quotingItemId)
                .orElseThrow(() -> new NotFoundException("Item not found"));
    }

    @Override
    public Transaction addNewTransaction(String quotingItemId) throws JsonProcessingException {
        FunctionalAssessmentReceivedItem item = RestUtils.getFunctionalAssessmentReceivedItemByQuotingItemId(quotingItemId);
        if(item == null)
            throw new BadRequestException("The item not found in assessment service");

        if (item.getStatus().equals(FunctionalAssessmentStatus.PENDING))
            throw new BadRequestException("The item pending at assessment service");

        if (item.getStatus().equals(FunctionalAssessmentStatus.DENIED))
            throw new BadRequestException("The item has been denied by assessment service");



        Transaction existedTransaction = transactionRepository.findByItemReceivedItemQuotingItemId(quotingItemId).orElse(null);
        if (existedTransaction != null)
            throw new BadRequestException("The item has been payment");


        Transaction transaction = Transaction.builder()
                .item(item)
                .time(LocalDateTime.now())
                .build();

        transaction = transactionRepository.save(transaction);

        ItemStatusDTO itemStatusDTO = ItemStatusDTO.builder()
                .time(DateTimeUtil.getDateTimeString(LocalDateTime.now()))
                .quotingItemId(quotingItemId)
                .build();

        ObjectMapper mapper = new ObjectMapper();
        String itemStatusDTOString = mapper.writeValueAsString(itemStatusDTO);
        template.convertAndSend("recycling_payment", itemStatusDTOString);

        return transaction;
    }
}
