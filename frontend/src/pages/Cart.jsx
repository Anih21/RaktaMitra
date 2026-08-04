import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {

const {

cart,

removeFromCart,

totalAmount

}=useCart();

return(

<div className="container">

<h1>Blood Cart</h1>

{

cart.length===0?

<p>No Blood Units Selected</p>

:

<>

{

cart.map(item=>(

<div
className="card"
key={item.bankId+item.group}
>

<h3>{item.bankName}</h3>

<p>

Blood Group :

<b>

{item.group}

</b>

</p>

<p>

Quantity :

<b>

{item.quantity}

</b>

</p>

<p>

Charge :

<b>

₹{item.price}

</b>

</p>

<p>

Subtotal :

<b>

₹{item.price*item.quantity}

</b>

</p>

<button

className="btn"

onClick={()=>removeFromCart(

item.bankId,

item.group

)}

>

Remove

</button>

</div>

))

}

<hr/>

<h2>

Total

₹{totalAmount}

</h2>

<button className="btn">

Proceed To Checkout

</button>

</>

}

</div>

);

}