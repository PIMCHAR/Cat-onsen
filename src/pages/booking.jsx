import React from "react";

export default function Booking() {
    return (
        <form>
            <input type="date" name="Check-in" />
            <select label="Time">
                <option value={"1"}>8.00 AM</option>
                <option value={"2"}>9.00 AM</option>
                <option value={"3"}>10.00 AM</option>
            </select>
        </form>
    )
};