package app.services.rest.dto.response;

import java.io.Serializable;

public class AtmDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private AddressDTO address;
	private Long distance;
	private String type;
	
	public AddressDTO getAddress() {
		return address;
	}
	public void setAddress(AddressDTO address) {
		this.address = address;
	}
	public Long getDistance() {
		return distance;
	}
	public void setDistance(Long distance) {
		this.distance = distance;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
