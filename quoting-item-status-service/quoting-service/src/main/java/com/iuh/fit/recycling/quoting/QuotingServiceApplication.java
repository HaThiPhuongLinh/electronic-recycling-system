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
        List<String> productNames = List.of("iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15", "iPhone 14", "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini", "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 Mini", "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11", "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X");
        List<Double> productPrices = List.of(1056.00, 906.00, 754.00, 678.00, 535.00, 769.00, 703.00, 567.00, 579.00, 521.00, 389.00, 371.00, 398.00, 346.00, 263.00, 213.00, 307.00, 306.00, 233.00, 206.00, 173.00, 133.00, 136.00);
        List<String> productSeries = List.of("15", "15","15", "15","14", "14","14", "14","13", "13","13", "13","12", "12","12", "12","11", "11","11", "X","X", "X","X");
        List<String> imageUrls = List.of(
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715013889/new/iPhone/ip15max.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715014037/new/iPhone/ip15pro.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715957574/iPhone/ip15plus.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715014120/new/iPhone/ip15.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715096765/new/iPhone/ip14.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715096774/new/iPhone/ip14max.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715096769/new/iPhone/ip14pro.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715957573/iPhone/ip14plus.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715096761/new/iPhone/ip13max.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715096757/new/iPhone/ip13pro.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715096752/new/iPhone/ip13.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715957571/iPhone/ip13mini.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715096748/new/iPhone/ip12max.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715096744/new/iPhone/ip12pro.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715096741/new/iPhone/ip12.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715957570/iPhone/ip12mini.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715013814/new/iPhone/ip11max.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715013809/new/iPhone/ip11pro.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715013623/new/iPhone/ip11.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715957569/iPhone/ipXSmax.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715957567/iPhone/ipXS.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715957567/iPhone/ipXR.jpg",
                "https://res.cloudinary.com/dwywbuukd/image/upload/v1715013476/new/iPhone/ipX.jpg");

        for (int index = 0; index < productNames.size(); index++){
            Product product = Product.builder()
                    .productId(Long.valueOf(index+1))
                    .name(productNames.get(index))
                    .price(productPrices.get(index))
                    .series(productSeries.get(index))
                    .imageUrl(imageUrls.get(index))
                    .active(true)
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
                .active(true)
                .build();
        initialCondition.add(damagedCondition);

        Condition scratchedCondition = Condition.builder()
                .conditionId(2L)
                .name("Scratched or Scuffed")
                .percentDecrease(25)
                .active(true)
                .type(ConditionType.OVERALL)
                .build();
        initialCondition.add(scratchedCondition);

        Condition lightCondition = Condition.builder()
                .conditionId(3L)
                .name("Lightly Used")
                .percentDecrease(15)
                .active(true)
                .type(ConditionType.OVERALL)
                .build();
        initialCondition.add(lightCondition);

        Condition flawlessCondition = Condition.builder()
                .conditionId(4L)
                .name("Flawless or Like New")
                .percentDecrease(0)
                .active(true)
                .type(ConditionType.OVERALL)
                .build();
        initialCondition.add(flawlessCondition);

        Condition fullyLightCondition = Condition.builder()
                .conditionId(5L)
                .name("Screen works and fully lights up")
                .percentDecrease(0)
                .active(true)
                .type(ConditionType.SCREEN)
                .build();
        initialCondition.add(fullyLightCondition);

        Condition dimCondition = Condition.builder()
                .conditionId(6L)
                .name("Screen has flaws, flicker or is dim")
                .percentDecrease(20)
                .active(true)
                .type(ConditionType.SCREEN)
                .build();
        initialCondition.add(dimCondition);

        Condition faceIdCondition = Condition.builder()
                .conditionId(7L)
                .name("Face ID not working")
                .percentDecrease(15)
                .active(true)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(faceIdCondition);

        Condition chargeCondition = Condition.builder()
                .conditionId(8L)
                .name("Battery can not hold a charge")
                .percentDecrease(5)
                .active(true)
                .type(ConditionType.BATTERY)
                .build();
        initialCondition.add(chargeCondition);

        Condition battery1 = Condition.builder()
                .conditionId(9L)
                .name("Battery greater than equal 85%")
                .percentDecrease(0)
                .active(true)
                .type(ConditionType.BATTERY)
                .build();
        initialCondition.add(battery1);

        Condition battery2 = Condition.builder()
                .conditionId(10L)
                .name("Battery 75-85%")
                .percentDecrease(5)
                .active(true)
                .type(ConditionType.BATTERY)
                .build();
        initialCondition.add(battery2);

        Condition battery3 = Condition.builder()
                .conditionId(11L)
                .name("Battery less than 75%")
                .percentDecrease(7)
                .active(true)
                .type(ConditionType.BATTERY)
                .build();
        initialCondition.add(battery3);

        Condition buttonCondition = Condition.builder()
                .conditionId(12L)
                .name("Peripheral buttons not working")
                .percentDecrease(5)
                .active(true)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(buttonCondition);

        Condition frontCamera = Condition.builder()
                .conditionId(13L)
                .name("Front camera not good working")
                .percentDecrease(8)
                .active(true)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(frontCamera);

        Condition backCamera = Condition.builder()
                .conditionId(14L)
                .name("Back camera not good working")
                .percentDecrease(8)
                .active(true)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(backCamera);

        Condition ioSoundCondition = Condition.builder()
                .conditionId(15L)
                .name("Speaker and microphone not good working")
                .percentDecrease(4)
                .active(true)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(ioSoundCondition);

        Condition netCondition = Condition.builder()
                .conditionId(16L)
                .name("Mobile network, Wi-Fi, Bluetooth, and GPS connectivity not working")
                .percentDecrease(6)
                .active(true)
                .type(ConditionType.FUNCTIONAL)
                .build();
        initialCondition.add(netCondition);

        Condition newCondition = Condition.builder()
                .conditionId(17L)
                .name("Unopened retail packaging (factory sealed)")
                .percentDecrease(10)
                .active(true)
                .type(ConditionType.SEALED)
                .build();
        initialCondition.add(newCondition);
        return initialCondition;
    }
}
