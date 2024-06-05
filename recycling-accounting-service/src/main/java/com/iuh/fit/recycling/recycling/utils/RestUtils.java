package com.iuh.fit.recycling.recycling.utils;

import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
import org.springframework.web.client.RestClient;

public class RestUtils {
    private static final RestClient restClient = RestClient.create();

    public static FunctionalAssessmentReceivedItem getFunctionalAssessmentReceivedItemByQuotingItemId(String quotingItemId){
        try {
            FunctionalAssessmentReceivedItem item = restClient.get()
                    .uri("http://localhost:8083/api/v1/assessment/item?quoting_item_id=" + quotingItemId)
                    .retrieve()
                    .body(FunctionalAssessmentReceivedItem.class);

            return item;
        }catch (Exception e){
            return null;

        }
    }
}
