import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { BLOOD_INVENTORY } from "../data/bloodInventory";
import PageHeader from "../components/PageHeader";
import "../styles/pages.css";

const BLOOD_BANKS = [
  {
    id: 1,
    name: "State Blood Bank, Mumbai",
    city: "Mumbai",
    district: "Mumbai City",
    phone: "022-2410XXXX"
  },
  {
    id: 2,
    name: "Sassoon General Hospital Blood Bank",
    city: "Pune",
    district: "Pune",
    phone: "020-2612XXXX"
  },
  {
    id: 3,
    name: "Government Medical College Blood Bank",
    city: "Nagpur",
    district: "Nagpur",
    phone: "0712-274XXXX"
  }
];

export default function BloodBankDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState({});

  const bank = BLOOD_BANKS.find((b) => b.id === Number(id));
  const inventory = BLOOD_INVENTORY[id] || [];

  if (!bank) {
    return <h2>Blood Bank Not Found</h2>;
  }

  return (
    <>
      <PageHeader
        title={bank.name}
        subtitle="Available Blood Units"
      />

      <div className="container">
        <div className="card">
          <h2>{bank.name}</h2>

          <p><strong>City:</strong> {bank.city}</p>
          <p><strong>District:</strong> {bank.district}</p>
          <p><strong>Phone:</strong> {bank.phone}</p>
        </div>

        <br />

        <div className="grid grid-3">
          {inventory.map((blood) => (
            <div className="card" key={blood.group}>
              <h2>{blood.group}</h2>

              <p>
                Available:
                <strong> {blood.units} Pouches</strong>
              </p>

              <p>
                Processing Charge:
                <strong> ₹{blood.price}</strong>
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "15px"
                }}
              >
                <button
                  onClick={() =>
                    setQuantity({
                      ...quantity,
                      [blood.group]: Math.max(
                        1,
                        (quantity[blood.group] || 1) - 1
                      )
                    })
                  }
                >
                  -
                </button>

                <span>{quantity[blood.group] || 1}</span>

                <button
                  onClick={() =>
                    setQuantity({
                      ...quantity,
                      [blood.group]: (quantity[blood.group] || 1) + 1
                    })
                  }
                >
                  +
                </button>
              </div>

              <br />

              <button
                className="btn"
                onClick={() => {
                  addToCart({
                    bankId: bank.id,
                    bankName: bank.name,
                    group: blood.group,
                    price: blood.price,
                    quantity: quantity[blood.group] || 1
                  });

                  alert("Added To Cart");
                }}
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}