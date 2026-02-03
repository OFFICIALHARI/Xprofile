package com.resume.builder.repository;

import com.resume.builder.document.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends MongoRepository<Payment, String> {

    List<Payment> findByUserIdOrderByCreatedAtDesc(String userId);

    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);
}
