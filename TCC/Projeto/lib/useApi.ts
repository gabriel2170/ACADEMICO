import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";

const TEMPORARYoneProduct: Product = {
    id: 1,
    image: '/tmp/pizza1.png',
    categoryName: 'Tradicional',
    name: 'Calabresa',
    price: 55.40,
    description: 'aaaaaaaaaaaaaa',
    qtd: 0
}

export const useApi = (tenantSlug: string) => ({

    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function async
    // Informações dos tenants/estabelecimentos, boolean retorna falso ou o tenant.
    getTenant: async () => {
        switch (tenantSlug) {
            case 'delivery1':
                return {
                    slug: 'delivery1',
                    name: 'Pizzaria',
                    primaryColor: '#834655',
                    secondColor: '#c4ac71',
                }
                break;


            case 'delivery2':
                return {
                    slug: 'delivery2',
                    name: 'Cervejaria',
                    primaryColor: '#e7a117',
                    secondColor: '#393d44'
                }
                break;

            case 'delivery3':
                return {
                    slug: 'delivery3',
                    name: 'Hamburgueria',
                    primaryColor: '#393e46',
                    secondColor: '#eeeeee'
                }
                break;

                case 'delivery4':
                    return {
                        slug: 'delivery4',
                        name: 'Sorveteria',
                        primaryColor: '#b4718d',
                        secondColor: '#c59196'
                    }
                    break;
                default: return false;                   
            
        }
        
    },

    getAllProducts: async () => {
        let products = [];
        for (let q = 0; q < 10; q++) {
            products.push({
                ...TEMPORARYoneProduct,
                id: q + 1
            })
        }
        return products
    },

    getProduct: async (id: number) => {
        return {...TEMPORARYoneProduct, id};
    }

});