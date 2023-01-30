import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/user"
});

interface AppointmentModel {
    room: number;
    payment: string;
    date: Date;
}
