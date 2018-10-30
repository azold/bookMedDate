import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dispatch } from "redux";
import { menuClicked } from "../../../../store/action/navigationAction";
import { IPageState } from "../../../../store/reducers/pageReducer";
import AvailableTableComponent from "./availableTable/availableTable";
import AvailableServices from "../../../../contracts/AvailableServices";
import { connect } from "react-redux";
import { IAvailableServiceState } from "../../../../store/reducers/availableTableReducer";
import IDatetimeSlot from "../../../../contracts/DatetimeSlot";
import { IServicesBase } from "../../../../contracts/ServiceBase";

interface IDispatchProps {
    availableServicesData: IAvailableServiceState;
    receiveServices(): AvailableServices[];
    serviceClicked(id: number): void;
    serviceReservationCancelled(): void;
    serviceReservationSaved(selectedServiceId: number, timeSlotId: IDatetimeSlot): void;
    serviceBooked(selectedService: IServicesBase, timeSlot: IDatetimeSlot): void;
}

 export default class AvailablePage extends React.PureComponent<IDispatchProps>{        

    public render(): JSX.Element {

        return (
            <AvailableTableComponent {...this.props} />
        );       
    }

}
