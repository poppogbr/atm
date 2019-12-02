import { ApiConfigurations } from './services.model';
import { environment } from '../../../environments/environment';

export const apis: ApiConfigurations = {
    atm: {
        endpoint: environment.ATM_ENDPOINT,
        services: {
            login: {
                method: 'POST',
                path: '/login'
            },
            logout: {
                method: 'POST',
                path: '/logout'
            },
            atmSearch: {
                method: 'GET',
                path: '/atm/search'
            }
        }
    }
}
