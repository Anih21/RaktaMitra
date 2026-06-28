import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaSearch,
  FaWarehouse,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTimes,
} from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import "../styles/pages.css";

const BLOOD_BANKS = [
  {
    id: 1,
    name: "State Blood Bank, Mumbai",
    city: "Mumbai",
    district: "Mumbai City",
    address: "Parel, Mumbai, Maharashtra",
    phone: "022-2410XXXX",
    status: "available",
    stock: {
      "A+": 25,
      "A-": 8,
      "B+": 18,
      "B-": 4,
      "AB+": 10,
      "AB-": 2,
      "O+": 30,
      "O-": 5,
    },
  },
  {
    id: 2,
    name: "Sassoon General Hospital Blood Bank",
    city: "Pune",
    district: "Pune",
    address: "Station Road, Pune",
    phone: "020-2612XXXX",
    status: "available",
    stock: {
      "A+": 18,
      "A-": 6,
      "B+": 15,
      "B-": 2,
      "AB+": 8,
      "AB-": 1,
      "O+": 24,
      "O-": 4,
    },
  },
  {
    id: 3,
    name: "Government Medical College Blood Bank",
    city: "Nagpur",
    district: "Nagpur",
    address: "Medical College Road, Nagpur",
    phone: "0712-274XXXX",
    status: "limited",
    stock: {
      "A+": 5,
      "A-": 1,
      "B+": 6,
      "B-": 1,
      "AB+": 2,
      "AB-": 0,
      "O+": 8,
      "O-": 1,
    },
  },
  {
    id: 4,
    name: "Civil Hospital Blood Bank",
    city: "Nashik",
    district: "Nashik",
    address: "Civil Hospital Campus, Nashik",
    phone: "0253-225XXXX",
    status: "available",
    stock: {
      "A+": 20,
      "A-": 7,
      "B+": 17,
      "B-": 5,
      "AB+": 9,
      "AB-": 3,
      "O+": 28,
      "O-": 6,
    },
  },
  {
    id: 5,
    name: "Indian Red Cross Society Blood Bank",
    city: "Thane",
    district: "Thane",
    address: "Thane West, Maharashtra",
    phone: "022-2534XXXX",
    status: "unavailable",
    stock: {
      "A+": 0,
      "A-": 0,
      "B+": 0,
      "B-": 0,
      "AB+": 0,
      "AB-": 0,
      "O+": 0,
      "O-": 0,
    },
  },
  {
    id: 6,
    name: "Government Medical College Blood Bank",
    city: "Aurangabad",
    district: "Aurangabad",
    address: "GMC Campus, Aurangabad",
    phone: "0240-233XXXX",
    status: "available",
    stock: {
      "A+": 16,
      "A-": 5,
      "B+": 14,
      "B-": 3,
      "AB+": 7,
      "AB-": 2,
      "O+": 22,
      "O-": 4,
    },
  },
  {
    id: 7,
    name: "Chhatrapati Pramila Raje Blood Bank",
    city: "Kolhapur",
    district: "Kolhapur",
    address: "Kolhapur City",
    phone: "0231-265XXXX",
    status: "limited",
    stock: {
      "A+": 6,
      "A-": 2,
      "B+": 7,
      "B-": 1,
      "AB+": 3,
      "AB-": 1,
      "O+": 9,
      "O-": 2,
    },
  },
  {
    id: 8,
    name: "Civil Hospital Blood Bank",
    city: "Solapur",
    district: "Solapur",
    address: "Civil Hospital, Solapur",
    phone: "0217-272XXXX",
    status: "available",
    stock: {
      "A+": 19,
      "A-": 6,
      "B+": 16,
      "B-": 3,
      "AB+": 8,
      "AB-": 2,
      "O+": 26,
      "O-": 5,
    },
  },
];

const STATUS_LABEL_KEY = {
  available: "available",
  limited: "limited",
  unavailable: "unavailable",
};

export default function BloodBanks() {
  const { t } = useTranslation();

  const [query, setQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);

  const filtered = BLOOD_BANKS.filter((bank) =>
    `${bank.city} ${bank.district} ${bank.name}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <PageHeader
        title={t("banks.title")}
        subtitle={t("banks.subtitle")}
      />

      <section className="section">
        <div className="container">

          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder={t("banks.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t("banks.searchPlaceholder")}
            />
          </div>

          {filtered.length === 0 ? (
            <p style={{ textAlign: "center" }}>
              {t("common.noResults")}
            </p>
          ) : (
            <div className="grid grid-3">            
              {filtered.map((bank) => (
                <div className="card list-card" key={bank.id}>
                  <div className="list-card-top">
                    <div className="list-card-icon">
                      <FaWarehouse />
                    </div>

                    <span className={`badge badge-${bank.status}`}>
                      {t(`banks.${STATUS_LABEL_KEY[bank.status]}`)}
                    </span>
                  </div>

                  <h3>{bank.name}</h3>

                  <div className="list-card-meta">
                    <FaMapMarkerAlt /> {bank.city}, {bank.district}
                  </div>

                  <div className="list-card-meta">
                    <FaPhoneAlt /> {bank.phone}
                  </div>

                  <div className="list-card-footer">
                    <button
                      className="btn btn-outline"
                      onClick={() => setSelectedBank(bank)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* View Details Modal */}
      {selectedBank && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedBank(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedBank(null)}
            >
              <FaTimes />
            </button>

            <h2>{selectedBank.name}</h2>

            <div className="details-section">
              <h3>📍 Address</h3>
              <p>{selectedBank.address}</p>
            </div>

            <div className="details-section">
              <h3>📞 Contact Details</h3>
              <p>{selectedBank.phone}</p>
            </div>

            <div className="details-section">
              <h3>🩸 Available Blood Stock</h3>

              <table className="stock-table">
                <thead>
                  <tr>
                    <th>Blood Group</th>
                    <th>Units Available</th>
                  </tr>
                </thead>

                <tbody>
                  {Object.entries(selectedBank.stock).map(
                    ([group, units]) => (
                      <tr key={group}>
                        <td>{group}</td>
                        <td>{units}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}