// Creamos esta función para formatear un string a moneda en los archivos que lo requieran, coloca el signo dolar 

export function formatCurrency(quantity: number){
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(quantity)
}