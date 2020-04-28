package com.api.resources;

import com.model.Destination;
import com.model.Skill;
import com.model.SkillData;
import com.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/")
public class VacationController {

    private DestinationService service;

    @Autowired
    public VacationController(DestinationService service) {
        this.service = service;
    }

    @GET
    @Path("skillsList")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Skill> getSkillsList() {

        List<Skill> skills = SkillData.getSkillsData();
        return skills;
    }

    @POST
    @Consumes("application/json")
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/destination")
    public Destination addDestination(Destination destination) {
        return service.addDestination(destination);
    }

    @DELETE
    @Path("/destination/{id}")
    public void removeDestination(@PathParam("id") int id) {
        service.removeDestination(id);
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/json")
    @Path("/destination/{id}")
    public Destination updateCity(@PathParam("id") int id, Destination destination) {
        return service.updateDestination(id, destination);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/destinations")
    public List<Destination> getAll() {
        return service.getAll();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/next/{startIndex}")
    public List<Destination> getNextDestinations(@PathParam("startIndex") int startIndex) {
        return service.nextDestinations(startIndex);
    }


}
