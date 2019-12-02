package app.services.rest;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.annotation.Nullable;
import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import app.services.rest.dto.response.AddressDTO;
import app.services.rest.dto.response.AtmDTO;
import app.singleton.AtmsLoader;
import io.micronaut.core.util.StringUtils;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Produces;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;

@Controller("/atm")
public class AtmSearchController {

	private AtmsLoader atmsLoader;
	private final Logger logger = LoggerFactory.getLogger(AtmSearchController.class);
	
	protected AtmSearchController() {}
	
	@Inject
	public AtmSearchController(AtmsLoader atmsLoader) {
		this.atmsLoader = atmsLoader;
	}
	
	@Get("/search")
	@Secured(SecurityRule.IS_AUTHENTICATED)
	@Produces(MediaType.APPLICATION_JSON)
	public List<AtmDTO> searchAtms(@Nullable @QueryValue(value = "query") String query) {
		logger.info("START - searchAtms");
		
		List<AtmDTO> atms = atmsLoader.getAtms();
		
		if(StringUtils.isEmpty(query)) {
			return atms;
		}
		
		final String queryUpperCase = query.toUpperCase();
		
		List<AtmDTO> atmsFiltered = 
				atms.parallelStream()
					.filter(atm -> filterInAtmFields(atm, queryUpperCase)
							|| filterInAddressFields(atm.getAddress(), queryUpperCase)
							|| filterInGeoLocationFields(atm.getAddress(), queryUpperCase)
						)
					.collect(Collectors.toList());

		logger.info("END - searchAtms");
		return atmsFiltered;
	}
	
	private boolean filterInAtmFields(AtmDTO atm, String query) {
		return (Objects.nonNull(atm.getType()) && atm.getType().toUpperCase().contains(query))
				|| (Objects.nonNull(atm.getDistance()) && String.valueOf(atm.getDistance()).equals(query));
	}
	
	private boolean filterInAddressFields(AddressDTO address, String query) {
		return Objects.nonNull(address) 
				&& ((Objects.nonNull(address.getCity()) && address.getCity().toUpperCase().contains(query))
				|| (Objects.nonNull(address.getHousenumber()) && address.getHousenumber().toUpperCase().contains(query))
				|| (Objects.nonNull(address.getPostalcode()) && address.getPostalcode().toUpperCase().contains(query))
				|| (Objects.nonNull(address.getStreet()) && address.getStreet().toUpperCase().contains(query)));
	}
	
	private boolean filterInGeoLocationFields(AddressDTO address, String query) {
		return Objects.nonNull(address)
				&& Objects.nonNull(address.getGeoLocation()) 
				&&((Objects.nonNull(address.getGeoLocation().getLat()) && address.getGeoLocation().getLat().toUpperCase().contains(query))
				|| (Objects.nonNull(address.getGeoLocation().getLng()) && address.getGeoLocation().getLng().toUpperCase().contains(query)));
	}
}
