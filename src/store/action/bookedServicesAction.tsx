import {createAction} from "redux-act";
import { fakeAvailableServices } from "../../fakeData/fakeAvailableServices";
import IDatetimeSlot from "../../contracts/DatetimeSlot";
import { IServicesBase } from "../../contracts/ServiceBase";

const receiveBookedServices = createAction("Receive booked services");

const serviceBooked = createAction("Service booked", (selectedService: IServicesBase, timeSlot: IDatetimeSlot ) => ({
    selectedService,
    timeSlot
}));

const bookedServiceClicked = createAction("Service clicked", (selectedServiceId: number) => ({
    selectedServiceId
}));

const bookedServiceDeleted = createAction("Service deleted", (selectedServiceId: number) => ({
    selectedServiceId
}));

export {
    receiveBookedServices,
    serviceBooked,
    bookedServiceClicked,
    bookedServiceDeleted
}
