package com.cloudnative.dd.persist.domain;

import java.time.ZonedDateTime;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Stuff {

    @Id
    private UUID id;
    private ZonedDateTime time;
    private String payload;

    public Stuff() {
    }

    public UUID getId() {
        return id;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public String getPayload() {
        return payload;
    }
}
