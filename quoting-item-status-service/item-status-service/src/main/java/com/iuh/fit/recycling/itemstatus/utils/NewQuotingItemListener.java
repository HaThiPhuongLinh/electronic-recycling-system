package com.iuh.fit.recycling.itemstatus.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.fit.recycling.itemstatus.entities.ItemStatus;
import com.iuh.fit.recycling.itemstatus.entities.Status;
import com.iuh.fit.recycling.itemstatus.models.responses.ItemStatusDTO;
import com.iuh.fit.recycling.itemstatus.services.IItemStatusService;
import com.iuh.fit.recycling.quoting.entities.QuotingItem;
import com.iuh.fit.recycling.quoting.exception.BadRequestException;
import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.TextMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class NewQuotingItemListener {

    private final IItemStatusService itemStatusService;

    private LocalDateTime parseDatetime(String formattedDateTime){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(formattedDateTime, formatter);
    }

    @JmsListener(destination = "recycling_initial")
    public void onInit(Message message) throws JMSException {
        TextMessage textMessage = (TextMessage) message;
        String quotingItemId = textMessage.getText();

        System.out.println("new messs " + quotingItemId);
        if (itemStatusService.existsByQuotingItemId(quotingItemId)){
            throw new BadRequestException("quotingItemId is already exist");
        }

        QuotingItem quotingItem = new QuotingItem();
        quotingItem.setQuotingItemId(quotingItemId);
        ItemStatus itemStatus = ItemStatus.builder()
                .quotingItem(quotingItem)
                .status(Status.INITIAL)
                .time(LocalDateTime.now())
                .build();

        itemStatusService.add(itemStatus);
    }

    @JmsListener(destination = "recycling_received")
    public void onReceivedItem(Message message) throws JMSException, JsonProcessingException {
        TextMessage textMessage = (TextMessage) message;
        String itemStatusString = textMessage.getText();
        System.out.println("new messs " + itemStatusString);

        ObjectMapper mapper = new ObjectMapper();
        ItemStatusDTO itemStatusDTO = mapper.readValue(itemStatusString, ItemStatusDTO.class);

        if (!itemStatusService.existsByQuotingItemIdAndStatus(itemStatusDTO.getQuotingItemId(), Status.INITIAL)){
            throw new BadRequestException("The quotingItemId is not init");
        }
        Status status = null;
        if (itemStatusDTO.getAccepted() == null)
            status = Status.RECEIVED;
        else if (itemStatusDTO.getAccepted())
            status = Status.EXTERNAL_EVALUATING_ACCEPTED;
        else status = Status.EXTERNAL_EVALUATING_CONFLIC;

        if (status.equals(Status.RECEIVED) && itemStatusService.existsByQuotingItemIdAndStatus(itemStatusDTO.getQuotingItemId(), Status.RECEIVED)){
            return;
        }

        QuotingItem quotingItem = QuotingItem.builder()
                .quotingItemId(itemStatusDTO.getQuotingItemId())
                .build();


        ItemStatus itemStatus = ItemStatus.builder()
                .quotingItem(quotingItem)
                .status(status)
                .time(parseDatetime(itemStatusDTO.getTime()))
                .build();
        itemStatusService.add(itemStatus);

        if (status == Status.RECEIVED){
            itemStatusService.add(ItemStatus.builder()
                    .quotingItem(quotingItem)
                    .status(Status.EXTERNAL_EVALUATING)
                    .time(parseDatetime(itemStatusDTO.getTime()))
                    .build());
        }else if (status == Status.EXTERNAL_EVALUATING_ACCEPTED){
            itemStatusService.add(ItemStatus.builder()
                    .quotingItem(quotingItem)
                    .status(Status.INTERNAL_EVALUATING)
                    .time(parseDatetime(itemStatusDTO.getTime()))
                    .build());
        } else{
            itemStatusService.add(ItemStatus.builder()
                    .quotingItem(quotingItem)
                    .status(Status.WILL_BE_RETURN)
                    .time(parseDatetime(itemStatusDTO.getTime()))
                    .build());
        }

    }

    @JmsListener(destination = "recycling_assessment")
    public void onAssessmentItem(Message message) throws JMSException, JsonProcessingException {
        TextMessage textMessage = (TextMessage) message;
        String itemStatusString = textMessage.getText();
        ObjectMapper mapper = new ObjectMapper();
        ItemStatusDTO itemStatusDTO = mapper.readValue(itemStatusString, ItemStatusDTO.class);
        if (!itemStatusService.existsByQuotingItemIdAndStatus(itemStatusDTO.getQuotingItemId(), Status.RECEIVED)){
            throw new BadRequestException("The quotingItem is not received");
        }

        if (itemStatusService.existsByQuotingItemIdAndStatus(itemStatusDTO.getQuotingItemId(), Status.EXTERNAL_EVALUATING_CONFLIC)){
            throw new BadRequestException("The quotingItem is in conflict at receiving service");
        }

        if (itemStatusService.existsByQuotingItemIdAndStatus(itemStatusDTO.getQuotingItemId(), Status.INTERNAL_EVALUATING_CONFLICT)){
            throw new BadRequestException("The quotingItem is in conflict at assessment service");
        }

        Status status = null;
        if (itemStatusDTO.getAccepted() == null)
            status = Status.INTERNAL_EVALUATING;
        else if (itemStatusDTO.getAccepted())
            status = Status.INTERNAL_EVALUATING_ACCEPTED;
        else status = Status.INTERNAL_EVALUATING_CONFLICT;

        QuotingItem quotingItem = QuotingItem.builder()
                .quotingItemId(itemStatusDTO.getQuotingItemId())
                .build();

        ItemStatus itemStatus = ItemStatus.builder()
                .quotingItem(quotingItem)
                .status(status)
                .time(LocalDateTime.now())
                .build();
        itemStatusService.add(itemStatus);

        itemStatus = ItemStatus.builder()
                .quotingItem(quotingItem)
                .status(Status.WILL_BE_RETURN)
                .time(LocalDateTime.now())
                .build();
        itemStatusService.add(itemStatus);

    }
}
