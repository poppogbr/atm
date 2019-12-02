export interface Atm {
    address: Address;
    distance: number;
    type: string;
}

export interface Address {
    street: string;
    housenumber: string;
    postalcode: string;
    city: string;
    geoLocation: GeoLocation;
}

export interface GeoLocation {
    lat: string;
    lng: string;
}
