import Appointment from "./appointment";

export default interface Userdata {
    id: number
    email: string;
    tel: string;
    appointment: Appointment;
}