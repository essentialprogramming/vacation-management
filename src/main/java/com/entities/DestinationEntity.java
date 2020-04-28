package com.entities;


import com.vladmihalcea.hibernate.type.array.ListArrayType;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.List;

@Entity(name = "destination")
@Getter
@Setter@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@TypeDef(
        name = "list-array",
        typeClass = ListArrayType.class
)
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

    @Type(type = "list-array")
    @Column(name = "targets")
    private List<String> targets;

    @Column(name = "cost")
    private double cost;


}
