import MenuItem from "./components/MenuItem"
import OrderContents from "./components/OrderContents"
import OrderTotals from "./components/OrderTotals"
import TipPercentageForm from "./components/TipPercentageForm"
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"

function App() {

  // console.log(menuItems)

  // Desestructuración del custom hook useOrder
  const {order, addItem, removeItem, tip, setTip, placeOrder } = useOrder()

  return (
    <>
    <header className=" bg-teal-400 py-5">
      <h1 className="text-center text-4xl font-black">Calculadora de Propinas y Consumo</h1>
    </header>

    <main className=" max-w-7xl mx-auto py-20 grid md: grid-cols-2">{/*grid md: grid-cols-2 ponemos los h2 en paralelo en tailwind con bootstrap usaría col y row...*/}
      <div className="p-5">
        <h2 className="text-4xl font-black">Menú</h2>
        <div className=" space-y-3 mt-10">
          {menuItems.map(item => ( // Renderización del componente menuItems usando .map()
            <MenuItem
            key = {item.id}
            item = {item}
            addItem={addItem}
            />
            ))}
        </div>
      </div>
      <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {order.length ? (
            <>
              <OrderContents
              order = {order}
              removeItem = {removeItem}
              />
              <TipPercentageForm
                setTip={setTip}
                tip={tip}
              />

              <OrderTotals
                order = {order}
                tip = {tip}
                placeOrder = {placeOrder}
              />
            </>
          ) : (
            <p className=" text-center">La orden está vacía</p>
          )}
          
      </div>
    </main>

    </>
  )
}

export default App
