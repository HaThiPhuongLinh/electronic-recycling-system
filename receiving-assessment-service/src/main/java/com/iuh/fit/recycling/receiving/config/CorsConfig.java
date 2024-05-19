package com.iuh.fit.recycling.receiving.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    //on -> rest&&!ws
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOriginPattern("*"); // Chấp nhận từ mọi nguồn
        config.addAllowedMethod("*"); // Chấp nhận mọi phương thức
        config.addAllowedHeader("*"); // Chấp nhận mọi loại header
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        source.registerCorsConfiguration("/ws/**", config);
        return new CorsFilter(source);
    }
}
