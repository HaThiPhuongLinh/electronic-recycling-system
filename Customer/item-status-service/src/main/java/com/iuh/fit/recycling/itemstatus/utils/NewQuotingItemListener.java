package com.iuh.fit.recycling.itemstatus.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.fit.recycling.itemstatus.entities.ItemStatus;
import com.iuh.fit.recycling.itemstatus.entities.Status;
import com.iuh.fit.recycling.itemstatus.services.IItemStatusService;
import com.iuh.fit.recycling.quoting.entities.QuotingItem;
import jakarta.jms.JMSException;
import jakarta.jms.Message;
import jakarta.jms.TextMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class NewQuotingItemListener {

    private final IItemStatusService itemStatusService;


    @JmsListener(destination = "recycling_initial")
    public void onMessageReceived(Message message) throws JMSException, JsonProcessingException {
        TextMessage textMessage = (TextMessage) message;
        System.out.println("new messs " + textMessage.getText());

//        ObjectMapper objectMapper = new ObjectMapper();
//
//        QuotingItem quotingItem = objectMapper.readValue(textMessage.getText(), QuotingItem.class);
        QuotingItem quotingItem = new QuotingItem();
        quotingItem.setQuotingItemId(textMessage.getText());
        ItemStatus itemStatus = ItemStatus.builder()
                .quotingItem(quotingItem)
                .status(Status.INITIAL)
                .dateTime(LocalDateTime.now())
                .build();

        itemStatusService.add(itemStatus);
    }

}
