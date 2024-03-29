package com.service;

import com.entities.DestinationEntity;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mapper.DestinationMapper;
import com.model.Destination;
import com.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class DestinationService {

    private final DestinationRepository repository;

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
    public Destination getDestination(int id) {
        DestinationEntity entity =  repository.findById(id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "Destination with id " + id + " not found."));
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
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Destination> getDestinations(String json) {

        List<Destination> list = repository.findAll().stream()
                .map(DestinationMapper::entityToDestination)
                .collect(Collectors.toList());

        int startIndex = 0;
        try {
            Map<String, Object> filter = new ObjectMapper().readValue(json, new TypeReference<Map<String, Object>>(){});
            startIndex = (int) filter.get("index");
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return list.subList(Math.max(0, startIndex), Math.min(list.size(), startIndex + 4));
    }

    @Transactional
    public List<Destination> previousDestinations(int startIndex) {
        List<Destination> list = repository.findAll().stream()
                .map(DestinationMapper::entityToDestination)
                .collect(Collectors.toList());

        return list.subList(Math.max(0, startIndex - 4), Math.min(list.size(), startIndex));
    }
}
