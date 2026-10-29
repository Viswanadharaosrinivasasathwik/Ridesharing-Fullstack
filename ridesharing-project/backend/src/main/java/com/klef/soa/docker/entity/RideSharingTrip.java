package com.klef.soa.docker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ride_sharing_trip")
public class RideSharingTrip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pickup_location", nullable = false)
    private String pickupLocation;

    @Column(name = "drop_location", nullable = false)
    private String dropLocation;

    @Column(nullable = false)
    private Double fare;

    @Column(nullable = false)
    private Boolean completed;

    public RideSharingTrip() {}

    public RideSharingTrip(String pickupLocation, String dropLocation, Double fare, Boolean completed) {
        this.pickupLocation = pickupLocation;
        this.dropLocation = dropLocation;
        this.fare = fare;
        this.completed = completed;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }
    public String getDropLocation() { return dropLocation; }
    public void setDropLocation(String dropLocation) { this.dropLocation = dropLocation; }
    public Double getFare() { return fare; }
    public void setFare(Double fare) { this.fare = fare; }
    public Boolean getCompleted() { return completed; }
    public void setCompleted(Boolean completed) { this.completed = completed; }
}
