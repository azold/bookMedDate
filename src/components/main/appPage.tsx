import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Navigation from "../navBar/navBar";
import HomePage from "./pages/homePage/homePage";
import BookedPage from "./pages/bookedPage/bookedPage";
import AvailablePage from "./pages/availablePage/availablePage";
import IAppState from "../../store/appState";
import { menuClicked } from "../../store/action/navigationAction";
import { serviceClicked, receiveServices, serviceReservationCancelled, serviceReservationSaved } from "../../store/action/availableServicesAction";
import AvailableServices from "../../contracts/AvailableServices";
import { IAvailableServiceState } from "../../store/reducers/availableTableReducer";
import IDatetimeSlot from "../../contracts/DatetimeSlot";
import { serviceBooked, receiveBookedServices, bookedServiceClicked, bookedServiceDeleted } from "../../store/action/BookedServicesAction";
import { IServicesBase } from "../../contracts/ServiceBase";
import { IBookedServiceState } from "../../store/reducers/bookedTableReducer";
import { IBookedServices } from "../../contracts/BookedServices";

interface AppProps {
    selectedMenuId: number;
    availableServicesData: IAvailableServiceState;
    bookedServicesData: IBookedServiceState;
}

interface IDispatchProps {
    menuClicked(id: number): number;
    receiveServices(): AvailableServices[];
    serviceClicked(id: number): void;
    serviceReservationCancelled(): void;
    serviceReservationSaved(selectedServiceId: number, timeSlotId: IDatetimeSlot): void;
    serviceBooked(selectedService: IServicesBase, timeSlot: IDatetimeSlot): void;
    receiveBookedServices(): IBookedServices[];
    bookedServiceClicked(id: number): void;
    bookedServiceDeleted(id: number): void;
}

const mapStateToProps = (state: IAppState, ownProps: {}): AppProps => {
    return {
        selectedMenuId: state.pageReducer.selectedMenuId,
        availableServicesData: state.availableTableReducer,
        bookedServicesData: state.bookedTableReducer
    };
};

const mapDispatchToProps = (dispatch: any) => ({
   menuClicked: (id: number) => dispatch(menuClicked(id)),
   receiveServices: () => dispatch(receiveServices()),
   serviceClicked: (id: number) => dispatch(serviceClicked(id)),
   serviceReservationCancelled: () =>dispatch(serviceReservationCancelled()),
   serviceReservationSaved: (selectedServiceId: number, timeSlotId: IDatetimeSlot) => dispatch(serviceReservationSaved(selectedServiceId, timeSlotId)),
   serviceBooked: (selectedService: IServicesBase, timeSlot: IDatetimeSlot) => dispatch(serviceBooked(selectedService, timeSlot)),
   receiveBookedServices: () => dispatch(receiveBookedServices()),
   bookedServiceClicked: (id: number) => dispatch(bookedServiceClicked(id)),
   bookedServiceDeleted: (id: number) => dispatch(bookedServiceDeleted(id))
});

class AppPage extends React.PureComponent<AppProps & IDispatchProps> {
    
    public render(): JSX.Element {
        const content = this.defineContent(this.props.selectedMenuId);
        return (
            <span>
                <Navigation {...this.props} />                
                {content}                
            </span>
        );       
    }

    private defineContent(id: number): JSX.Element {
        let result;

        result = (id  === 0)
        ? <HomePage {...this.props} />
        : (
            (id  === 1) 
            ? <BookedPage {...this.props} />
            : <AvailablePage {...this.props} />
        );

        return result;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
