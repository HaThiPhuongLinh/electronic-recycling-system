package com.iuh.fit.recycling.receiving.services;


import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentStatus;
import com.iuh.fit.recycling.receiving.models.FunctionalAssessmentItemRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FunctionalAssessmentReceivedItemService {

    List<FunctionalAssessmentReceivedItem> findAllByStatus(FunctionalAssessmentStatus status);

    List<FunctionalAssessmentReceivedItem> findAll();

    FunctionalAssessmentReceivedItem findByQuotingItemId(String quotingItemId);

//    FunctionalAssessmentReceivedItem initNew(String quotingItemId);

    FunctionalAssessmentReceivedItem updateFunctionalAssessmentProof(FunctionalAssessmentItemRequest request, List<MultipartFile> assessmentProof) throws IOException;


}
