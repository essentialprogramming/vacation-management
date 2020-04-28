package com.model;

import lombok.*;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Destination {

    private int id;
    private String city;
    private String country;
    private String description;
    private List<String> targets;
    private double cost;
}
