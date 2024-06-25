// creamos un custom hooks llamado useOrder (se encarga de almacenar los precios de los pedidos a medida que pulsamos en los botones para luego calcular las propinas)
// primero definimos un state
import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"


export default function useOrder() {
    //* Aquí definidos nuestro state y funciones
    // state de pedido
    const [order, setOrder] = useState<OrderItem[]>([])
    // state de propina
    const [tip, setTip] = useState(0)

    // Función que exportaremos
    //* Función que se utiliza para agregar elementos
    const addItem = (item : MenuItem) => {
        // evitar registros duplicados: Cuando pulsamos en un mismo botón varias veces queremos que sume la cantidad y no añada el mismo producto varias veces
        const itemExist = order.find( orderItem => orderItem.id === item.id)//comprobamos si el elemento ya existe
        if(itemExist) { //si el producto que añadimos ya existe   
            console.log('ya existe...')                                                
            // Ahora queremos localizar cuál es el elemento repetido, Identificamos que elemento se pulsó 2veces, utilizamos map para no modificar el array original e incrementamos en + 1 quantity cada vez que se hace click en un mismo elemento
            const updateOrder = order.map( orderItem => orderItem.id === item.id ?
                 {...orderItem, quantity: orderItem.quantity + 1} : orderItem)
                //  Seteamos el cambio
                setOrder(updateOrder)
        }else{
            // si no existe crea una copia del contenido y añade la cantidad 1 y setea el cambio/guarda los cambios..
            const newItem = {...item, quantity: 1}
            setOrder([...order, newItem])
        }
    }

    console.log(order)

    // Función para eliminar el elemento del menú 
    const removeItem = (id: MenuItem['id']) =>{ //como id es de tipo any (que puede ser de cualquier tipo) utilizamos el type de MenuItem para que se le asigne el tipo number al id
        // Ahora ya podemos setear el state
        setOrder(order.filter(item => item.id !== id )) // Crea un nuevo array con los elementos diferentes a los que le he pasado por lo tanto eliminará los que son iguales
    }

    // Función para guardar la orden
    const placeOrder = () => {
        // Seteamos los cambios, se guardarían en la base de datos(esta parte se verá más adelante)
        // Y se reinician la orden y la propinaa sus valores iniciales, setOrder a un array vacío y setTip a 0
        setOrder([])
        setTip(0)
    }


    return {
        //* Aquí retornaremos un objeto
        //* exportamos las funciones para hacerlas disponibles y poder utilizarlas en nuestros componentes
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}

/* 
    * Paso a paso en la creación y utilización de un hook:

    Este hook encapsula la lógica del estado relacionado con el pedido y la propina.

    Devuelve un objeto que contiene tanto los estados (order y tip) como las funciones 
    para manipular esos estados (addItem, removeItem, setTip...).


    1º Creamos nuestros estados y funciones en nuestro hook useOrders
    2º Exportamos la función en el return como un objeto, las hacemos disponibles para utilizarlas en los componentes
    3º Abrimos el archivo App.tsx y agregamos el nuevo objeto:

          * Dentro de function App()    
          const {order, addItem, removeItem, tip, setTip, "placeOrder" } = useOrder()

          esta constante extrae las propiedades y métodos del objeto devuelto por useOrder.
          Esto me permite usar order, addItem, removeItem, tip, y setTip directamente en mi componente App.

        -ejemplo de desestructuración de un objeto que se devuelve desde un custom hook en React.

        order: Es el estado que contiene la lista de items en el pedido.
        addItem: Es una función para agregar un item al pedido.
        removeItem: Es una función para eliminar un item del pedido.
        tip: Es el estado que contiene el valor de la propina.
        setTip: Es una función para establecer el valor de la propina.
    
    4º uso en el componente App.tsx:
    
    * order se pasa a OrderContents para mostrar los items del pedido.
    * removeItem se pasa a OrderContents para permitir eliminar items del pedido.

    <OrderContents
        order = {order}
        removeItem = {removeItem}
    />

    * addItem se pasa a MenuItem para permitir agregar items al pedido.
    * etc..
    <MenuItem
        key = {item.id}
        item = {item}
        addItem={addItem}
    >
    5º Definir los types:

    *Nota: Muy Importante -> 

    Definir los tipos en TypeScript te ayuda a asegurar que tus componentes reciban y manejen los datos 
    correctamente. En el caso de OrderTotalsProps y TipPercentageFormProps, especificar order, tip, 
    placeOrder, y setTip asegura que estos componentes tengan acceso a los datos y funciones que 
    necesitan para funcionar correctamente.

    Ejemplo:

    OrderTotalsProps
    Este tipo define las propiedades que tu componente OrderTotals espera recibir.

    -código typescript:

        type OrderTotalsProps = {
            order: OrderItem[],      // Array de objetos OrderItem, que representa el pedido actual
            tip: number,             // Un número que representa la propina
            placeOrder: () => void   // Una función sin argumentos que se llama para realizar el pedido, no retorna nada (void)
        }

        OrderItem es un tipo definido que probablemente incluye propiedades como id, name, price, y quantity.


*/ 
