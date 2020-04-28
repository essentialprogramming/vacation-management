package com.mapper;

import com.entities.DestinationEntity;
import com.model.Destination;

public class DestinationMapper {

    public static Destination entityToDestination(DestinationEntity entity) {
        return Destination.builder()
                .id(entity.getId())
                .city(entity.getCity())
                .country(entity.getCountry())
                .description(entity.getDescription())
                .targets(entity.getTargets())
                .cost(entity.getCost())
                .build();
    }

    public static DestinationEntity destinationToEntity(Destination destination) {
        return DestinationEntity.builder()
                .city(destination.getCity())
                .country(destination.getCountry())
                .description(destination.getDescription())
                .targets(destination.getTargets())
                .cost(destination.getCost())
                .build();
    }
}
