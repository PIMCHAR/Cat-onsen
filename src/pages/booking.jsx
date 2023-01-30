import React from "react";

export default function Booking() {
    return (
        <form>
            <input type="date" name="Check-in" />
            <select label="Time">
                <option value={"08.00"}>8.00 AM</option>
                <option value={"09.00"}>9.00 AM</option>
                <option value={"10.00"}>10.00 AM</option>
            </select>
        </form>
    )
};