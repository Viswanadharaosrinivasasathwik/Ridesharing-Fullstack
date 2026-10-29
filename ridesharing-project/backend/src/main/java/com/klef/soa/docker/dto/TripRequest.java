package com.klef.soa.docker.dto;

import jakarta.validation.constraints.*;

/** Request body for adding a trip. Note: NO id field - the database generates it. */
public class TripRequest {

    @NotBlank(message = "Pickup location is required")
    @Size(min = 2, max = 100, message = "Pickup location must be 2 to 100 characters")
    private String pickupLocation;

    @NotBlank(message = "Drop location is required")
    @Size(min = 2, max = 100, message = "Drop location must be 2 to 100 characters")
    private String dropLocation;

    @NotNull(message = "Fare is required")
    @DecimalMin(value = "1.0", message = "Fare must be at least 1")
    @DecimalMax(value = "100000.0", message = "Fare must not exceed 100000")
    private Double fare;

    @NotNull(message = "Completed status is required")
    private Boolean completed;

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }
    public String getDropLocation() { return dropLocation; }
    public void setDropLocation(String dropLocation) { this.dropLocation = dropLocation; }
    public Double getFare() { return fare; }
    public void setFare(Double fare) { this.fare = fare; }
    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
}
