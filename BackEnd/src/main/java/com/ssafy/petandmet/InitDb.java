package com.ssafy.petandmet;

import com.ssafy.petandmet.domain.*;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * 종 주문 2개
 * * userA
 * 	 * JPA1 BOOK
 * 	 * JPA2 BOOK
 * * userB
 * 	 * SPRING1 BOOK
 * 	 * SPRING2 BOOK
 */
@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitService initService;

    @PostConstruct
    public void init() {
//        initService.dbInit1();
//        initService.dbInit2();
        initService.dbInit3();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

        public void dbInit1() {
            System.out.println("Init1" + this.getClass());

            Center center = new Center();
            center.setUuid("asdasdasdasd");
            center.setName("11");
            center.setAddress("asd");
            center.setEmail("1234");
            em.persist(center);

            User user = new User();
            user.setUuid("asdasd");
            user.setName("현준");
            user.addCenter(center);
            em.persist(user);

//            Animal animal = new Animal();
//            animal.setName("sihwan");
//            animal.setAge(123);
//            em.persist(animal);
        }

//        public void dbInit2() {
//            Member member = createMember("userB", "진주", "2", "2222");
//            em.persist(member);
//
//            Book book1 = createBook("SPRING1 BOOK", 20000, 200);
//            em.persist(book1);
//
//            Book book2 = createBook("SPRING2 BOOK", 40000, 300);
//            em.persist(book2);
//
//            OrderItem orderItem1 = OrderItem.createOrderItem(book1, 20000, 3);
//            OrderItem orderItem2 = OrderItem.createOrderItem(book2, 40000, 4);
//
//            Delivery delivery = createDelivery(member);
//            Order order = Order.createOrder(member, delivery, orderItem1, orderItem2);
//            em.persist(order);
//        }

//        private Member createMember(String name, String city, String street, String zipcode) {
//            Member member = new Member();
//            member.setName(name);
//            member.setAddress(new Address(city, street, zipcode));
//            return member;
//        }
//
//        private Book createBook(String name, int price, int stockQuantity) {
//            Book book1 = new Book();
//            book1.setName(name);
//            book1.setPrice(price);
//            book1.setStockQuantity(stockQuantity);
//            return book1;
//        }
//
//        private Delivery createDelivery(Member member) {
//            Delivery delivery = new Delivery();
//            delivery.setAddress(member.getAddress());
//            return delivery;
//        }

        public void dbInit3() {
//            donate_log 확인
            System.out.println("Init3" + this.getClass());

            Center center = new Center();
            center.setUuid("aaaaa");
            center.setName("13");
            center.setAddress("asdfsd");
            center.setEmail("1234");
            em.persist(center);

            User user = new User();
            user.setUuid("aaww");
            user.setName("환희");
            user.addCenter(center);
            em.persist(user);

            Animal animal = new Animal();
            animal.setUuid("bbbdb");
            animal.setName("bb");
            animal.setAge(12);
            em.persist(animal);

            Donate donate = new Donate();
            donate.setCenter(center);
            donate.setItem_name("선풍기");
            donate.setTarget_price(320000);
            em.persist(donate);

            DonateLog donateLog = new DonateLog();
            donateLog.setDonate_id(donate);
            donateLog.setUser(user);
            donateLog.setAnimal(animal);
            donateLog.setCenter(center);
            donateLog.setPrice(30000);
            donateLog.setDonateDate(LocalDateTime.now());
            em.persist(donateLog);

//            ======== 라이브 확인 =======
            Live live = new Live();
            live.setName("세션");
            live.setCenter(center);
            em.persist(live);

            LiveAnimals liveAnimals = new LiveAnimals();
            liveAnimals.setAnimal(animal);
            liveAnimals.setLive_id(live);
            liveAnimals.setUuid("dfdfd");
            em.persist(liveAnimals);

//            ===== 산책 확인 =====
            Walk walk = new Walk();
            walk.setUser(user);
            walk.setAnimal(animal);
            walk.setDate(LocalDateTime.now().toLocalDate());
            walk.setTime(LocalTime.now());
            em.persist(walk);

        }
    }
}

