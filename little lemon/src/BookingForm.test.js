// BookingForm.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./App"; // Assuming BookingForm is in App.jsx
import "@testing-library/jest-dom";

describe("BookingForm Component", () => {
  test("renders booking form with all inputs", () => {
    render(<BookingForm />);

    // Check for select and text inputs
    expect(screen.getByText("Booking Details")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Card Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name / Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MM/YYYY")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("CVV")).toBeInTheDocument();

    // Check checkboxes
    expect(screen.getByLabelText("Send booking confirmation via text")).toBeInTheDocument();
    expect(screen.getByLabelText("Send booking confirmation via email")).toBeInTheDocument();

    // Check submit button
    expect(screen.getByRole("button", { name: /book/i })).toBeInTheDocument();
  });

  test("handles form input correctly", () => {
    render(<BookingForm />);

    // Simulate user interactions
    const cardNumberInput = screen.getByPlaceholderText("Card Number");
    fireEvent.change(cardNumberInput, { target: { value: "4111111111111111" } });
    expect(cardNumberInput.value).toBe("4111111111111111");

    const nameInput = screen.getByPlaceholderText("First Name / Last Name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");

    const checkboxEmail = screen.getByLabelText("Send booking confirmation via email");
    fireEvent.click(checkboxEmail);
    expect(checkboxEmail.checked).toBe(true);

    const checkboxText = screen.getByLabelText("Send booking confirmation via text");
    fireEvent.click(checkboxText);
    expect(checkboxText.checked).toBe(true);
  });

  test("submits the form and logs details", () => {
    console.log = jest.fn(); // Mock console.log

    render(<BookingForm />);

    // Fill in form fields
    fireEvent.change(screen.getByPlaceholderText("Card Number"), { target: { value: "1234567812345678" } });
    fireEvent.change(screen.getByPlaceholderText("First Name / Last Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByPlaceholderText("MM/YYYY"), { target: { value: "12/2025" } });
    fireEvent.change(screen.getByPlaceholderText("CVV"), { target: { value: "123" } });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /book/i });
    fireEvent.click(submitButton);

    // Check console.log for submitted data
    expect(console.log).toHaveBeenCalledWith("Booking Details Submitted: ", {
      date: "",
      time: "",
      diners: "",
      cardNumber: "1234567812345678",
      name: "Jane Doe",
      expDate: "12/2025",
      cvv: "123",
      confirmationText: false,
      confirmationEmail: false,
    });
  });
});
