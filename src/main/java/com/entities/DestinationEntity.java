package com.entities;


import com.util.list.StringListConverter;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity(name = "destination")
@Getter
@Setter@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DestinationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private int id;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    @Column(name = "description")
    private String description;

    @Convert(converter = StringListConverter.class)
    @Column(name = "targets")
    private List<String> targets;

    @Column(name = "cost")
    private double cost;


}
