package com.klef.soa.docker.dto;

public class TripResponse {

    private Long id;
    private String pickupLocation;
    private String dropLocation;
    private Double fare;
    private Boolean completed;

    public TripResponse(Long id, String pickupLocation, String dropLocation, Double fare, Boolean completed) {
        this.id = id;
        this.pickupLocation = pickupLocation;
        this.dropLocation = dropLocation;
        this.fare = fare;
        this.completed = completed;
    }

    public Long getId() { return id; }
    public String getPickupLocation() { return pickupLocation; }
    public String getDropLocation() { return dropLocation; }
    public Double getFare() { return fare; }
    public Boolean getCompleted() { return completed; }
}
