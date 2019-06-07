package com.cloudnative.dd.persist.rest;

import java.util.List;
import java.util.UUID;

import com.cloudnative.dd.persist.domain.Stuff;
import com.cloudnative.dd.persist.domain.StuffRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StuffController {
    private final StuffRepository stuffRepository;

    public StuffController(StuffRepository stuffRepository) {
        this.stuffRepository = stuffRepository;
    }

    @GetMapping(value = "/{id}")
    public Stuff get(@PathVariable UUID id) {
        return stuffRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("not found"));
    }

    @GetMapping
    public List<Stuff> findAll() {
        return stuffRepository.findAll();
    }

    @PostMapping(value = "/")
    public void post(@RequestBody Stuff stuff) {
        stuffRepository.save(stuff);
    }
}
