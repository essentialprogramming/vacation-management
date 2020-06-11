package com.api.resources;

import com.model.Destination;
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

    @POST
    @Consumes("application/json")
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/destinations")
    public Destination addDestination(Destination destination) {
        return service.addDestination(destination);
    }


    @GET
    @Path("/destinations/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Destination getDestination(@PathParam("id") int id) {
        return service.getDestination(id);
    }

    @DELETE
    @Path("/destinations/{id}")
    public void removeDestination(@PathParam("id") int id) {
        service.removeDestination(id);
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/json")
    @Path("/destinations/{id}")
    public Destination updateCity(@PathParam("id") int id, Destination destination) {
        return service.updateDestination(id, destination);
    }



    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/destinations")
    public List<Destination> getNextDestinations(@QueryParam("index") int startIndex) {
        return service.getDestinations(startIndex);
    }




}
