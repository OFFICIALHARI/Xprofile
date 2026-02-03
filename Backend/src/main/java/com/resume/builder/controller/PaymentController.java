package com.resume.builder.controller;

import com.resume.builder.document.Payment;
import com.resume.builder.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Payments", description = "Payment processing and order management APIs")
public class PaymentController {

    private final PaymentService paymentService;

    // ---------------- CREATE ORDER ----------------
    @PostMapping("/create-order")
    @Operation(summary = "Create payment order", description = "Create a new Razorpay order for premium upgrade")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid plan type")
    })
    public ResponseEntity<?> createOrder(
            @RequestBody Map<String, String> request,
            Authentication authentication) throws Exception {

        String planType = request.get("planType");

        if (planType == null || !planType.equalsIgnoreCase("PREMIUM")) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Invalid plan type")
            );
        }

        Payment payment =
                paymentService.createOrder(
                        authentication.getPrincipal(),
                        planType
                );

        return ResponseEntity.ok(
                Map.of(
                        "orderId", payment.getRazorpayOrderId(),
                        "amount", payment.getAmount(),
                        "currency", payment.getCurrency()
                )
        );
    }

    // ---------------- VERIFY PAYMENT ----------------
    @PostMapping("/verify")
    @Operation(summary = "Verify payment", description = "Verify Razorpay payment signature and complete order")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Payment verified successfully"),
            @ApiResponse(responseCode = "400", description = "Payment verification failed")
    })
    public ResponseEntity<?> verifyPayment(
            @RequestBody Map<String, String> request) {

        return ResponseEntity.ok(
                paymentService.verifyPayment(request)
        );
    }

    // ---------------- PAYMENT HISTORY ----------------
    @GetMapping("/history")
    @Operation(summary = "Get payment history", description = "Retrieve all payments made by the authenticated user")
    @ApiResponse(responseCode = "200", description = "Payment history retrieved successfully")
    public ResponseEntity<?> getPaymentHistory(
            Authentication authentication) {

        return ResponseEntity.ok(
                paymentService.getPaymentHistory(
                        authentication.getPrincipal()
                )
        );
    }

    // ---------------- ORDER DETAILS ----------------
    @GetMapping("/order/{orderId}")
    @Operation(summary = "Get order details", description = "Retrieve details of a specific order by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order details retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Order not found")
    })
    public ResponseEntity<?> getOrderDetails(
            @PathVariable String orderId) {

        return ResponseEntity.ok(
                paymentService.getOrderDetails(orderId)
        );
    }
}
