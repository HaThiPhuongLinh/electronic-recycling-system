package com.iuh.fit.recycling.quoting;

import com.iuh.fit.recycling.quoting.entities.Condition;
import com.iuh.fit.recycling.quoting.entities.ConditionType;
import com.iuh.fit.recycling.quoting.entities.Product;
import com.iuh.fit.recycling.quoting.repositories.ConditionRepository;
import com.iuh.fit.recycling.quoting.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class QuotingServiceApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(QuotingServiceApplication.class, args);
    }

    @Autowired
    ConditionRepository conditionRepository;

    @Autowired
    ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {

        if (conditionRepository.count() == 0)
            conditionRepository.saveAll(getInitialCondition());
        if (productRepository.count() == 0)
            productRepository.saveAll(getInitialProduct());
    }

    public List<Product> getInitialProduct(){
        List<Product> initialProducts = new ArrayList<Product>();
        List<String> productNames = List.of("iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15", "iPhone 14", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini", "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 Mini", "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11", "iPhone SE 3rd Gen (2022)", "iPhone SE 2nd Gen (2020)", "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X");
        List<Double> productPrices = List.of(1056.00, 906.00, 754.00, 678.00, 535.00, 769.00, 703.00, 567.00, 579.00, 521.00, 389.00, 371.00, 398.00, 346.00, 263.00, 213.00, 307.00, 306.00, 233.00, 179.00, 108.00, 206.00, 173.00, 133.00, 136.00);
        List<String> productSeries = List.of("15", "15","15", "15","14", "14","14", "14","13", "13","13", "13","12", "12","12", "12","11", "11","11", "SE","SE", "X","X", "X","X");
        List<String> imageUrls = List.of(
                "https://static1.xdaimages.com/wordpress/wp-content/uploads/2023/09/iphone-15-pro-max-render.png",
                "https://tse4.mm.bing.net/th?id=OIP.SRS9Ltsjmu8xUyvMLSNMawHaHa&pid=Api&P=0&h=180",
                "https://tse4.mm.bing.net/th?id=OIP.YAnacEzL7beXMZTXS65fTgHaHa&pid=Api&P=0&h=180",
                "https://mobilepriceall.com/wp-content/uploads/2022/09/Apple-iPhone-14-1024x1024.jpg",
                "https://tse1.mm.bing.net/th?id=OIP.BBjeLwCpYb22yGXbVwO6ugHaHa&pid=Api&P=0&h=180",
                "https://tse1.explicit.bing.net/th?id=OIP.m5ACWxos50nDdUJHa4cdwgHaJP&pid=Api&P=0&h=180",
                "https://tse1.explicit.bing.net/th?id=OIP.m5ACWxos50nDdUJHa4cdwgHaJP&pid=Api&P=0&h=180",
                "https://tse1.mm.bing.net/th?id=OIP.VjmMFF8dzwAWsq3J2DmiVwHaKI&pid=Api&P=0&h=180",
                "https://tse3.mm.bing.net/th?id=OIP.3HwPr7_552aJvfTBX5c8bgHaHa&pid=Api&P=0&h=180",
                "https://tse2.mm.bing.net/th?id=OIP.JJKJX9HOg7CDK__XAcS9eQHaHa&pid=Api&P=0&h=180",
                "https://tse3.mm.bing.net/th?id=OIP.EnzxhRw9AaylKc7Y5oldkQHaHq&pid=Api&P=0&h=180",
                "https://tse3.mm.bing.net/th?id=OIP.nOOqPJYHzaLbJ-z72Qc0ZQHaHa&pid=Api&P=0&h=180",
                "https://tse2.mm.bing.net/th?id=OIP.xZ0lTEj1v9UsIWS47n4TIAHaHa&pid=Api&P=0&h=180",
                "https://tse4.mm.bing.net/th?id=OIP.5ZYKLNX_stZB3QEvHyPxogHaHa&pid=Api&P=0&h=180",
                "https://tse1.mm.bing.net/th?id=OIP.PSd6wxGdQ7mv_KlVXQlb2AHaHa&pid=Api&P=0&h=180",
                "https://tse1.mm.bing.net/th?id=OIP.oo-97_tYPL6qnFn88R8hdgHaKC&pid=Api&P=0&h=180",
                "https://tse1.mm.bing.net/th?id=OIP.geux4Xp6qUZO921hk6vgqAHaHa&pid=Api&P=0&h=180",
                "https://tse1.mm.bing.net/th?id=OIP.hjZtIcknYScvdNMCKTpfvgAAAA&pid=Api&P=0&h=180",
                "https://tse2.mm.bing.net/th?id=OIP.g7VEHAUk5jl2-5kGfWAXTQHaKm&pid=Api&P=0&h=180",
                "https://tse1.mm.bing.net/th?id=OIP.wB80PR2A78cUu1xPYL3A1QHaHa&pid=Api&P=0&h=180",
                "https://tse1.mm.bing.net/th?id=OIP.wt7q_o0-mA1erWXftgB6ggHaHa&pid=Api&P=0&h=180",
                "https://tse2.mm.bing.net/th?id=OIP.T5hDlxGpJQlm_tQuQ54MFQHaHa&pid=Api&P=0&h=180",
                "https://tse2.mm.bing.net/th?id=OIP.T5hDlxGpJQlm_tQuQ54MFQHaHa&pid=Api&P=0&h=180",
                "https://tse3.mm.bing.net/th?id=OIP.5o202bFOS8lFj6WEqd8j5AHaJr&pid=Api&P=0&h=180",
                "https://tse4.mm.bing.net/th?id=OIP.Sy77abNURFtH9WUd3u6qwwHaKG&pid=Api&P=0&h=180"
        );

        for (int index = 0; index < productNames.size(); index++){
            Product product = Product.builder()
                    .productId(Long.valueOf(index+1))
                    .name(productNames.get(index))
                    .price(productPrices.get(index))
                    .series(productSeries.get(index))
                    .imageUrl(imageUrls.get(index))
                    .build();
            initialProducts.add(product);
        }

        return initialProducts;
    }

    public List<Condition> getInitialCondition(){
        List<Condition> initialCondition = new ArrayList<Condition>();

        Condition damagedCondition = Condition.builder()
                .conditionId(1L)
                .name("Damaged or Broken")
                .percentDecrease(40)
                .type(ConditionType.OVERALL)
                .build();
        initialCondition.add(damagedCondition);

        Condition scratchedCondition = Condition.builder()
                .conditionId(2L)
                .name("Scratched or Scuffed")
                .percentDecrease(25)
                .type(ConditionType.OVERALL)
                .build();
        initialCondition.add(scratchedCondition);

        Condition lightCondition = Condition.builder()
                .conditionId(3L)
                .name("Lightly Used")
                .percentDecrease(15)
                .type(ConditionType.OVERALL)
                .build();
        initialCondition.add(lightCondition);

        Condition flawlessCondition = Condition.builder()
                .conditionId(4L)
                .name("Flawless or Like New")
                .percentDecrease(0)
                .type(ConditionType.OVERALL)
                .build();
        initialCondition.add(flawlessCondition);

        Condition fullyLightCondition = Condition.builder()
                .conditionId(5L)
                .name("Screen works and fully lights up")
                .percentDecrease(0)
                .type(ConditionType.SCREEN)
                .build();
        initialCondition.add(fullyLightCondition);

        Condition dimCondition = Condition.builder()
                .conditionId(6L)
                .name(" Screen has flaws, flicker or is dim")
                .percentDecrease(20)
                .type(ConditionType.SCREEN)
                .build();
        initialCondition.add(dimCondition);

        Condition faceIdCondition = Condition.builder()
                .conditionId(7L)
                .name("Face ID not working")
                .percentDecrease(15)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(faceIdCondition);

        Condition chargeCondition = Condition.builder()
                .conditionId(8L)
                .name("Battery that can hold a charge")
                .percentDecrease(5)
                .type(ConditionType.BATTERY)
                .build();
        initialCondition.add(chargeCondition);

        Condition battery1 = Condition.builder()
                .conditionId(9L)
                .name("Battery greater than equal 85%")
                .percentDecrease(0)
                .type(ConditionType.BATTERY)
                .build();
        initialCondition.add(battery1);

        Condition battery2 = Condition.builder()
                .conditionId(10L)
                .name("Battery 75-85%")
                .percentDecrease(5)
                .type(ConditionType.BATTERY)
                .build();
        initialCondition.add(battery2);

        Condition battery3 = Condition.builder()
                .conditionId(11L)
                .name("Battery less than 75%")
                .percentDecrease(7)
                .type(ConditionType.BATTERY)
                .build();
        initialCondition.add(battery3);

        Condition buttonCondition = Condition.builder()
                .conditionId(12L)
                .name("All peripheral buttons")
                .percentDecrease(55)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(buttonCondition);

        Condition frontCamera = Condition.builder()
                .conditionId(13L)
                .name("Front camera not good working")
                .percentDecrease(8)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(frontCamera);

        Condition backCamera = Condition.builder()
                .conditionId(14L)
                .name("Back camera not good working")
                .percentDecrease(8)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(backCamera);

        Condition ioSoundCondition = Condition.builder()
                .conditionId(15L)
                .name("Speaker and microphone not good working")
                .percentDecrease(4)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(ioSoundCondition);

        Condition netCondition = Condition.builder()
                .conditionId(16L)
                .name("Mobile network, Wi-Fi, Bluetooth, and GPS connectivity")
                .percentDecrease(6)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(netCondition);
        return initialCondition;
    }
}
