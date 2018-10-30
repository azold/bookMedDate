import produce from "immer";
import {createReducer} from "redux-act";
import IAvailableServices from "../../contracts/AvailableServices";
import IDatetimeSlot from "../../contracts/DatetimeSlot";
import { IBookedServices } from "../../contracts/BookedServices";
import { receiveBookedServices, serviceBooked, bookedServiceClicked, bookedServiceDeleted } from "../action/BookedServicesAction";

export interface IBookedServiceState{
    bookedServices: IBookedServices[];
    selectedServiceId: number | undefined;
    isModalOpened: boolean;
}

const initialState: IBookedServiceState = {
    bookedServices: [],
    selectedServiceId: undefined,
    isModalOpened: false
};

let bookedData: IBookedServices[] = [];

const bookedTableReducer = createReducer<IBookedServiceState>({}, initialState);

bookedTableReducer.on(receiveBookedServices, (state) => produce(state, (draft) => {
    draft.bookedServices = bookedData;
    draft.selectedServiceId = undefined;
    draft.isModalOpened = false;
}));

bookedTableReducer.on(serviceBooked, (state, payload) => produce(state, (draft) => {    
    bookedData = bookedData.map((item) => ({
        ...item,}));

    const existingData = bookedData.find(x => x.service.serviceId === payload.selectedService.serviceId);

    if(existingData === undefined) {
        const newBookedService: IBookedServices =  {
            service: payload.selectedService,
            bookedDateTime: payload.timeSlot
        };
        bookedData.push(newBookedService);
    } else {
        const newBookedService: IBookedServices =  {
            service: payload.selectedService,
            bookedDateTime: payload.timeSlot
        };
        const index = bookedData.findIndex(x => x.service.serviceId === existingData.service.serviceId);
        bookedData.splice(index, 1, newBookedService);
    }

    draft.bookedServices = bookedData;
    draft.selectedServiceId = undefined;
    draft.isModalOpened = false;
}));

bookedTableReducer.on(bookedServiceClicked, (state, payload) => produce(state, (draft) => {
    draft.bookedServices = bookedData;
    draft.selectedServiceId = payload.selectedServiceId,
    draft.isModalOpened = true;
}));

bookedTableReducer.on(bookedServiceDeleted, (state, payload) => produce(state, (draft) => {

    bookedData = bookedData.map((item) => ({
        ...item,}));

    const existingData = bookedData.find(x => x.service.serviceId === payload.selectedServiceId);

    const index = bookedData.findIndex(x => x.service.serviceId === existingData.service.serviceId);
    bookedData.splice(index, 1);

    draft.bookedServices = bookedData;
    draft.selectedServiceId = undefined,
    draft.isModalOpened = false;
}));
export default bookedTableReducer;
