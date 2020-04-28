package com.service;

import com.entities.DestinationEntity;
import com.mapper.DestinationMapper;
import com.model.Destination;
import com.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class DestinationService {

    private DestinationRepository repository;

    @Autowired
    public DestinationService(DestinationRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Destination addDestination(Destination destination) {
        DestinationEntity entity = DestinationMapper.destinationToEntity(destination);

        return DestinationMapper.entityToDestination(repository.save(entity));
    }

    @Transactional
    public void removeDestination(int id) {
        DestinationEntity existingDestination = repository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Destination with id " + id + " not found."));
        repository.delete(existingDestination);
    }

    @Transactional
    public Destination updateDestination(int id, Destination newDestination) {
        DestinationEntity existingDestination = repository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Destination with id " + id + " not found."));
        existingDestination.setCost(newDestination.getCost());
        existingDestination.setTargets(newDestination.getTargets());
        return DestinationMapper.entityToDestination(repository.save(existingDestination));
    }

    @Transactional
    public List<Destination> getAll() {
        return repository.findAll().stream()
                .map(DestinationMapper::entityToDestination)
                .limit(4)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Destination> nextDestinations(int startIndex) {
        return repository.findAll().stream()
                .map(DestinationMapper::entityToDestination)
                .collect(Collectors.toList())
                .subList(startIndex, startIndex + 4);

    }
}
