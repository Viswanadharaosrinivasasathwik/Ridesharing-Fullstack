package com.klef.soa.docker.service;

import com.klef.soa.docker.dto.TripRequest;
import com.klef.soa.docker.dto.TripResponse;

import java.util.List;

public interface RideSharingTripService {
    TripResponse addTrip(TripRequest request);
    List<TripResponse> getAllTrips();
    void deleteTrip(Long id);
}
