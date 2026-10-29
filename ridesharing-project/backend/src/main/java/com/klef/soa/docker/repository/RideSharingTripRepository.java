package com.klef.soa.docker.repository;

import com.klef.soa.docker.entity.RideSharingTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RideSharingTripRepository extends JpaRepository<RideSharingTrip, Long> {
}
