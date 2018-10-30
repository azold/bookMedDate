import { IServicesBase } from "./ServiceBase";
import IDatetimeSlot from "./DatetimeSlot";
import * as moment from 'moment';

interface IOpenHours {
    from: moment.Moment;
    to: moment.Moment;
}

export default interface IAvailableServices {
    service: IServicesBase;
    availableDateTimeSlots: IDatetimeSlot[];
    openHours: IOpenHours;
    isBooked: boolean;
}

