import axios from "axios";


interface user {
    email: string;
    tel: string;
    appointment: AppointmentModel;
};


export const postUser 