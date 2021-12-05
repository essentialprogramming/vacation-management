package com.api.resources;

import com.model.Destination;
import com.service.DestinationService;
import com.web.json.JsonResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Tag(description = "Vacation API", name = "Vacation Services")
@Path("/")
public class VacationController {

    @Context
    private HttpServletRequest httpRequest;

    private final DestinationService service;

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
    @Produces(MediaType.APPLICATION_JSON)
    public JsonResponse removeDestination(@PathParam("id") int id) {
        service.removeDestination(id);
        return new JsonResponse()
                .with("status", "success")
                .done();
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
    public List<Destination> getDestinations(@QueryParam("filter") String filter) {
        return service.getDestinations(filter);
    }




}
