package com.klef.soa.docker.controller;

import com.klef.soa.docker.dto.TripRequest;
import com.klef.soa.docker.dto.TripResponse;
import com.klef.soa.docker.service.RideSharingTripService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
@Tag(name = "Ride Sharing Trips")
public class RideSharingTripController {

    private final RideSharingTripService service;

    public RideSharingTripController(RideSharingTripService service) {
        this.service = service;
    }

    @Operation(summary = "Add a new trip (ID is auto-generated)")
    @PostMapping
    public ResponseEntity<TripResponse> addTrip(@Valid @RequestBody TripRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.addTrip(request));
    }

    @Operation(summary = "Get all trips")
    @GetMapping
    public List<TripResponse> getAllTrips() {
        return service.getAllTrips();
    }

    @Operation(summary = "Delete a trip by id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTrip(@PathVariable Long id) {
        service.deleteTrip(id);
        return ResponseEntity.ok(Map.of("message", "Trip " + id + " deleted successfully"));
    }
}
