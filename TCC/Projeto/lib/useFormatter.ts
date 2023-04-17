export const useFormatter = () => ({
    formatPrice: (price: number) => {

        if (price != null || price != 0 || price != undefined || !price ) {
            return price.toLocaleString('pt-br', {
                minimumFractionDigits: 2, // numero de digitos
                style: 'currency',
                currency: 'BRL'
            });
        }else{
            return
        }
    }
});

// https://pt.stackoverflow.com/questions/244083/tolocalestring-r-brasileiro