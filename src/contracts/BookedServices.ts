import { IServicesBase } from "./ServiceBase";
import IDatetimeSlot from "./DatetimeSlot";

export interface IBookedServices {
    service: IServicesBase;
    bookedDateTime: IDatetimeSlot;
}