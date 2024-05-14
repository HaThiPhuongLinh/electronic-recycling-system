package com.iuh.fit.recycling.quoting.config;

import jakarta.persistence.EntityManagerFactory;
import org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

//@Configuration
//@EnableJpaRepositories(
//        entityManagerFactoryRef = "primaryEntityManagerFactory",
//        transactionManagerRef = "primaryTransactionManager",
//        basePackages = {"com.iuh.fit.recycling.quoting.repositories"}
//)
public class DBConfig {
//    @Value("${spring.db1.datasource.url}")
//    private String url;
//
//    @Value("${spring.db1.datasource.username}")
//    private String username;
//
//    @Value("${spring.db1.datasource.password}")
//    private String password;
//
//
//    @Primary
//    @Bean(name = "primaryDbDataSource")
//    public DataSource primaryDbDataSource(){
//        return DataSourceBuilder.create()
//                .url(url)
//                .username(username)
//                .password(password)
//                .build();
//    }
//
//    @Primary
//    @Bean(name = "primaryEntityManagerFactory")
//    public LocalContainerEntityManagerFactoryBean primaryEntityManagerFactory(
//            EntityManagerFactoryBuilder builder,
//            @Qualifier("primaryDbDataSource") DataSource primaryDataSource) {
//        Map<String, String> props = new HashMap<>();
//        props.put("hibernate.physical_naming_strategy"
//                , CamelCaseToUnderscoresNamingStrategy.class.getName());
//        return builder
//                .dataSource(primaryDataSource)
//                .packages("com.iuh.fit.recycling.quoting.entities")
//                .properties(props)
//                .build();
//    }
//
//    @Primary
//    @Bean(name = "primaryTransactionManager")
//    public PlatformTransactionManager primaryTransactionManager(
//            @Qualifier("primaryEntityManagerFactory") EntityManagerFactory
//                    primaryEntityManagerFactory) {
//        return new JpaTransactionManager(primaryEntityManagerFactory);
//    }
}
