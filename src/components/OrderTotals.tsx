import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void
}
// Nuevo componente para mostrar los Totales

export default function OrderTotals({order, tip, placeOrder} : OrderTotalsProps) {

    // Se calcula el subtotal a pagar
    const subtotalAmount = useMemo(() =>order.reduce((total, item) => 
    total + (item.quantity * item.price), 0), [order])

    // Se calcula la propina, Queremos que el código se ejecute únicamente cuando ciertas dependencias cambien (cuando cambien la propina (tip) y cuando cambie el contenido de nuestra orden (order))
    // MUY IMPORTANTE EL USO DE LAS DEPENDENCIAS [tip, order] SE EJECUTARÁ EL CÓDIGO SÓLAMENTE CUANDO LAS DEPENDENCIAS CAMBIEN
    const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order])
    // Se calcula el total a pagar
    const totalAmount= useMemo(() => subtotalAmount + tipAmount, [tip, order])
    
    // *Nota: otra opción en lugar de usar useMemor es utilizar useCallback, tiene una sintaxis distinta pero hacen los mismo

  return (
    <>
        <div className=" space-y-3">
            <h2 className=" font-black text-2xl">Totales y Propina:</h2>
            <p>Subtotal a pagar: {''}   {/* {''} abriendo llaves le decimos que vamos a generar código javascript e introducimos un espacio*/}
                <span className=" font-bold">{formatCurrency(subtotalAmount)}</span>
            </p>

            <p>Propina: {''}   
                <span className=" font-bold">{formatCurrency(tipAmount)}</span>
            </p>

            <p>Total a Pagar: {''}   
                <span className=" font-bold">{formatCurrency(totalAmount)}</span>
            </p>
        </div>

        {/* Botón para reiniciar nuestro state */}
        <button 
            className=" w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
            disabled={totalAmount === 0}   
            onClick={placeOrder}
        >
            Guardar Orden


        </button>
    </>
  )
}
