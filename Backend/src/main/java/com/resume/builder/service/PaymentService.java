package com.resume.builder.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.resume.builder.document.Payment;
import com.resume.builder.document.User;
import com.resume.builder.dto.AuthResponse;
import com.resume.builder.repository.PaymentRepository;
import com.resume.builder.repository.UserRepository;
import com.resume.builder.util.AppConstants;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    // ---------------- CREATE ORDER ----------------
    public Payment createOrder(Object principal, String planType)
            throws RazorpayException {

        AuthResponse authResponse =
                authService.getProfile((User) principal);

        RazorpayClient razorpayClient =
                new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        int amount = 99900; // ₹999 (paise)
        String currency = "INR";
        String receipt =
                AppConstants.PREMIUM + "-" +
                        UUID.randomUUID().toString().substring(0, 8);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", currency);
        orderRequest.put("receipt", receipt);

        Order razorpayOrder =
                razorpayClient.orders.create(orderRequest);

        Payment payment = Payment.builder()
                .userId(authResponse.getId())
                .razorpayOrderId(razorpayOrder.get("id"))
                .amount(amount)
                .currency(currency)
                .planType(planType)
                .status("created")
                .receipt(receipt)
                .build();

        return paymentRepository.save(payment);
    }

    // ---------------- VERIFY PAYMENT ----------------
    public Map<String, Object> verifyPayment(Map<String, String> request) {

        String orderId = request.get("razorpay_order_id");
        String paymentId = request.get("razorpay_payment_id");
        String signature = request.get("razorpay_signature");

        Payment payment = paymentRepository
                .findByRazorpayOrderId(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found"));

        payment.setRazorpayPaymentId(paymentId);
        payment.setRazorpaySignature(signature);
        payment.setStatus("paid");

        paymentRepository.save(payment);

        // Update user subscription plan to Premium
        User user = userRepository.findById(payment.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        log.info("Updating user {} subscription from {} to Premium", user.getId(), user.getSubscriptionPlan());
        user.setSubscriptionPlan("Premium");
        User updatedUser = userRepository.save(user);
        log.info("User {} subscription updated to {}", updatedUser.getId(), updatedUser.getSubscriptionPlan());

        return Map.of(
                "message", "Payment verified successfully",
                "status", "success"
        );
    }

    // ---------------- PAYMENT HISTORY ----------------
    public List<Payment> getPaymentHistory(Object principal) {

        AuthResponse authResponse =
                authService.getProfile((User) principal);

        return paymentRepository
                .findByUserIdOrderByCreatedAtDesc(authResponse.getId());
    }

    // ---------------- GET ORDER DETAILS ----------------
    public Payment getOrderDetails(String orderId) {

        return paymentRepository
                .findByRazorpayOrderId(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));
    }
}
