import "./styles.css";

// App.jsx
import React, { useState } from "react";
import "./App.css"; // Import the CSS file

function BookingForm() {
  const [bookingDetails, setBookingDetails] = useState({
    date: "",
    time: "",
    diners: "",
    cardNumber: "",
    name: "",
    expDate: "",
    cvv: "",
    confirmationText: false,
    confirmationEmail: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Details Submitted: ", bookingDetails);
  };

  return (
    <div className="form-container">
      <div className="booking-card">
        <h1>Little Lemon - Chicago</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Booking Details</label>
            <select
              name="date"
              value={bookingDetails.date}
              onChange={handleChange}
              required
            >
              <option value="">Date - Time - Number of Diners</option>
              <option value="2023-12-01T18:00">Dec 1, 6:00 PM, 2 Diners</option>
              <option value="2023-12-02T20:00">Dec 2, 8:00 PM, 4 Diners</option>
            </select>
          </div>

          <div className="form-group">
            <label>Credit Card Details</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={bookingDetails.cardNumber}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="First Name / Last Name"
              value={bookingDetails.name}
              onChange={handleChange}
              required
            />
            <div className="input-row">
              <input
                type="text"
                name="expDate"
                placeholder="MM/YYYY"
                value={bookingDetails.expDate}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={bookingDetails.cvv}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div>
              <input
                type="checkbox"
                name="confirmationText"
                checked={bookingDetails.confirmationText}
                onChange={handleChange}
              />
              <label>Send booking confirmation via text</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="confirmationEmail"
                checked={bookingDetails.confirmationEmail}
                onChange={handleChange}
              />
              <label>Send booking confirmation via email</label>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
