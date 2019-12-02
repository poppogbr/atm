package app.singleton;

import java.net.URL;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import app.services.rest.dto.response.AtmDTO;
import io.micronaut.cache.annotation.Cacheable;
import io.micronaut.jackson.ObjectMapperFactory;

public class AtmsLoader {

	private final Logger logger = LoggerFactory.getLogger(AtmsLoader.class);

	@Cacheable("atms-cache")
	public List<AtmDTO> getAtms() {
		logger.info("START - load atms");
		List<AtmDTO> atms = null;

		try {
			URL url = new URL("https://www.dropbox.com/s/6fg0k2wxwrheyqk/ATMs?dl=1");
			ObjectMapper mapper = new ObjectMapperFactory().objectMapper(null, null);
			atms = mapper.readValue(url, new TypeReference<List<AtmDTO>>(){});
		} catch (Exception e) {
			logger.error("Error during load atms.json ", e);
		}
		logger.info("END - load atms");
		return atms;
	}
}
