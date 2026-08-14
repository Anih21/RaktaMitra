import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWarehouse, FaHospital, FaHeartbeat, FaUser, FaSave, FaSignOutAlt } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import "../styles/pages.css";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [inventory, setInventory] = useState({
    "A+": 0, "A-": 0, "B+": 0, "B-": 0, "AB+": 0, "AB-": 0, "O+": 0, "O-": 0,
    plasma: 0, platelets: 0
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProfile();
  }, [token, navigate]);

  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setProfile(data.profile);
        if (data.profile && data.profile.inventory) {
          setInventory(data.profile.inventory);
        }
      } else {
        setError(data.message || "Failed to load profile");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setInventory((prev) => ({
      ...prev,
      [name]: Math.max(0, parseInt(value) || 0)
    }));
  };

  const handleSaveInventory = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const endpoint =
      user.role === "BLOOD_BANK"
        ? "http://localhost:5000/api/bloodbanks/inventory"
        : "http://localhost:5000/api/hospitals/inventory";

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ inventory })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inventory updated successfully!");
        fetchProfile();
      } else {
        setError(data.message || "Failed to update inventory");
      }
    } catch (err) {
      console.error(err);
      setError("Connection error. Could not update inventory.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "80px 0" }}>
        <div className="dm-spinner" style={{ margin: "0 auto 20px" }} />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const isFacility = user.role === "BLOOD_BANK" || user.role === "HOSPITAL";

  return (
    <>
      <PageHeader
        title={`${user.role.replace("_", " ")} Dashboard`}
        subtitle={`Welcome back, ${user.fullName}`}
      />

      <div className="container" style={{ paddingBottom: "60px" }}>
        {error && <div className="alert alert-error">{error}</div>}

        <div className="grid grid-3" style={{ gap: "24px", alignItems: "start" }}>
          {/* Left Column: Profile Card */}
          <div className="card" style={{ gridColumn: isFacility ? "span 1" : "span 3" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div className="list-card-icon" style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}>
                {user.role === "BLOOD_BANK" && <FaWarehouse />}
                {user.role === "HOSPITAL" && <FaHospital />}
                {user.role === "DONOR" && <FaHeartbeat />}
                {user.role === "SEEKER" && <FaUser />}
              </div>
              <h2 style={{ margin: 0 }}>Profile Details</h2>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.95rem" }}>
              <div><strong>Name:</strong> {user.fullName}</div>
              <div><strong>Email:</strong> {user.email}</div>
              <div><strong>Mobile Number:</strong> {user.phone}</div>
              {profile && (
                <>
                  {profile.licenceNumber && <div><strong>Licence Number:</strong> {profile.licenceNumber}</div>}
                  {profile.phone && profile.phone !== user.phone && <div><strong>Facility Phone:</strong> {profile.phone}</div>}
                  {profile.address && <div><strong>Address:</strong> {profile.address}</div>}
                  {profile.city && <div><strong>City/District:</strong> {profile.city}, {profile.district || ""}</div>}
                </>
              )}
            </div>

            <button
              className="btn btn-outline"
              onClick={handleLogout}
              style={{ marginTop: "24px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
            >
              <FaSignOutAlt /> Log Out
            </button>
          </div>

          {/* Right Column: Inventory updates (Only for Blood Banks and Hospitals) */}
          {isFacility && (
            <div className="card" style={{ gridColumn: "span 2" }}>
              <h2 style={{ marginBottom: "20px" }}>Live Stock Inventory Management</h2>
              
              <form onSubmit={handleSaveInventory}>
                <h3 style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "8px", marginBottom: "16px" }}>Blood Packets (Pouches)</h3>
                
                <div className="grid grid-4" style={{ gap: "12px", marginBottom: "24px" }}>
                  {BLOOD_GROUPS.map((bg) => (
                    <div className="form-group" key={bg} style={{ marginBottom: 0 }}>
                      <label style={{ fontSize: "0.85rem", fontWeight: 700 }}>{bg}</label>
                      <input
                        type="number"
                        name={bg}
                        value={inventory[bg] || 0}
                        onChange={handleStockChange}
                        min="0"
                        className="form-control"
                        style={{ padding: "8px" }}
                      />
                    </div>
                  ))}
                </div>

                <h3 style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "8px", marginBottom: "16px" }}>Other Blood Components</h3>
                
                <div className="form-row" style={{ marginBottom: "24px" }}>
                  <div className="form-group">
                    <label style={{ fontWeight: 700 }}>Plasma Units</label>
                    <input
                      type="number"
                      name="plasma"
                      value={inventory.plasma || 0}
                      onChange={handleStockChange}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontWeight: 700 }}>Platelets Units</label>
                    <input
                      type="number"
                      name="platelets"
                      value={inventory.platelets || 0}
                      onChange={handleStockChange}
                      min="0"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={saving}
                  style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 auto" }}
                >
                  <FaSave /> {saving ? "Saving Changes..." : "Save Live Stock"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
