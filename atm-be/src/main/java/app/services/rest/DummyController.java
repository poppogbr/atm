package app.services.rest;

import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;

@Controller("/")
public class DummyController {

	@Get
	@Secured(SecurityRule.IS_AUTHENTICATED)
	@Produces(MediaType.APPLICATION_JSON)
	public void dummy() {
		return;
	}
}
