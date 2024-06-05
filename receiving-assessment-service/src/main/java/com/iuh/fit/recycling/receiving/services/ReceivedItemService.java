package com.iuh.fit.recycling.receiving.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.fit.recycling.receiving.entities.ReceivedItem;
import com.iuh.fit.recycling.receiving.entities.ReceivedStatus;
import com.iuh.fit.recycling.receiving.models.ReceivedItemRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ReceivedItemService {

    List<ReceivedItem> findAllByStatus(ReceivedStatus status);

    List<ReceivedItem> findAll();

    ReceivedItem findByQuotingItemId(String quotingItemId);

    ReceivedItem findById(Long receivedItemId);

    ReceivedItem receive(String quotingItemId) throws JsonProcessingException;

    ReceivedItem updateReceivedItemProof(ReceivedItemRequest request, List<MultipartFile> receivingProof) throws IOException;
}
