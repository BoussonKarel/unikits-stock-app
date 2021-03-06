// @ts-ignore
import WooCommerceAPI from 'react-native-woocommerce-api';
import { cs, ck } from './secrets';

const API = new WooCommerceAPI({
  url: 'https://dev.unikits.be', // Your store URL
  ssl: true,
  consumerKey: ck, // Your consumer secret
  consumerSecret: cs, // Your consumer secret
  wpAPI: true, // Enable the WP REST API integration
  version: 'wc/v3', // WooCommerce WP REST API version
  queryStringAuth: true
});

const API_get = async (endpoint : string, params : Object) : Promise<any> => {
  params = {
    // per_page : 10,
    ...params
   }

  return new Promise<any>(async (resolve, reject) => {
    API.get(endpoint, params)
    .then((data : any) => {
      resolve(data);
    })
    .catch((error: any) => {
      reject(error);
    })
  });
}

const API_put = async (endpoint : string, data : Object) : Promise<any> => {
  return new Promise<any>(async (resolve, reject) => {
    API.put(endpoint, data)
    .then((response : any) => {
      resolve(response);
    })
    .catch((error: any) => {
      reject(error);
    })
  });
}

export const woocommerce = {
  get: {
    products: async (params : Object = {}) => {
      return API_get("products", params);
    },
    product: async (id: number, params: Object = {}) => {
      return API_get(`products/${id}`, params);
    },
    orders: async (params : Object = {}) => {
      return API_get("orders", params);
    }
  },
  put: {
    product: async (id: number, data: Object = {}) => {
      return API_put(`products/${id}`, data);
    }
  }
}
