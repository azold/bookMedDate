import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import { Modal, Button } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import IAppState from '../../../store/appState';
import { connect } from 'react-redux';
import IAvailableServices from '../../../contracts/AvailableServices';
import { IBookedServices } from '../../../contracts/BookedServices';
import { serviceReservationCancelled, serviceReservationSaved } from '../../../store/action/availableServicesAction';
import { serviceBooked } from '../../../store/action/BookedServicesAction';
import AvailableServices from '../../../contracts/AvailableServices';
import { IAvailableServiceState } from '../../../store/reducers/availableTableReducer';
import IDatetimeSlot from '../../../contracts/DatetimeSlot';
import { IBookedServiceState } from '../../../store/reducers/bookedTableReducer';

interface datetimeSlot {        
    id: number,
    dateStart: moment.Moment,
    dateEnd: moment.Moment,        
}

const modalActions ={
    serviceReservationCancelled,
    serviceReservationSaved,
    serviceBooked
}

type IModalProps = typeof modalActions & {
    availableServicesData: IAvailableServiceState;
    selectedAvalableServiceId: number | undefined;
    bookedServices: IBookedServices[],
    selectedBookedServiceId: number | undefined;
    bookedServiceData: IBookedServiceState,
}

class BaseModalComponent extends React.PureComponent<IModalProps>{
    private selectedCalendarSlot: moment.Moment | null = null;
    private exludedTimes: moment.Moment[];
    private selectedService: AvailableServices | undefined;
    private selectedTimeSlot: IDatetimeSlot | undefined;

    public render(): JSX.Element {
        this.selectedService = this.defineSelectedService();
        this.exludedTimes = this.defineExludedDates();

        this.selectedCalendarSlot = this.getSelectedSlot(this.props.availableServicesData.selectedTimeSlot);

        const minHour = this.getMinTime();
        const maxHour = this.getMaxTime();
        return (
            <div className="static-modal">
                 <Modal show={this.props.availableServicesData.isModalOpened || this.props.bookedServiceData.isModalOpened} onHide={this.cancelOperation.bind(this)}>
                    <Modal.Header>
                        <Modal.Title>Book an appointment</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Please select a date and time slot:</p>
                        <div className="col-md-12">
                            <DatePicker 
                                inline        
                                selected={this.selectedCalendarSlot}          
                                onChange={this.selectDateTime.bind(this)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                dateFormat="YYYY/MM/DD"
                                timeIntervals={15}
                                minTime={minHour}
                                maxTime={maxHour}
                                placeholderText="Click to select a date"
                                isClearable={true}
                                showWeekNumbers
                                filterDate={this.isWeekday}
                                excludeTimes={this.exludedTimes}
                            />
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.cancelOperation.bind(this)}>Cancel</Button>
                        <Button bsStyle="primary" onClick={this.saveOperation.bind(this)}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    private defineSelectedService(): AvailableServices | undefined {
        let selectedService: AvailableServices | undefined;

        const id = this.props.availableServicesData.selectedServiceId !== undefined ? this.props.availableServicesData.selectedServiceId : this.props.selectedBookedServiceId;
        selectedService = this.props.availableServicesData.availableServices.find(service => service.service.serviceId == id);

        return selectedService;
    }

    private getMinTime(): moment.Moment {
        if (this.selectedService !== undefined) {
            const startDates = this.selectedService.availableDateTimeSlots.map(a => a.dateStart);
            return moment.min(startDates);
        } else {
            return moment().hours(8).minutes(0);
        }
    }

    private getMaxTime(): moment.Moment {
        if (this.selectedService !== undefined) {
            const startDates = this.selectedService.availableDateTimeSlots.map(a => a.dateStart);
            return moment.max(startDates);
        } else {
            return moment().hours(16).minutes(45);
        }        
    }

    private decorateSelectedElement(selectedCalendarSlot: moment.Moment) {
        const elements = document.getElementsByTagName("li");
        const text = selectedCalendarSlot.format("HH:mm");
        for (let i=0; i < elements.length; i++) {

            if ((elements[i].textContent !== text) &&elements[i].classList.contains("react-datepicker__time-list-item--selected")){
                 elements[i].classList.remove("react-datepicker__time-list-item--selected"); 
            }
            if (elements[i].textContent === text )
            elements[i].classList.add("react-datepicker__time-list-item--selected");
        }
        
    }

    private selectDateTime(selectedTimeSlot: moment.Moment): void {     
        console.log("date changed: " + selectedTimeSlot.format("LLL"));

        selectedTimeSlot.set({second:0,millisecond:0})
        this.selectedTimeSlot = this.defineSelectedTimeSlot(selectedTimeSlot);
        this.selectedCalendarSlot = this.selectedTimeSlot.dateStart;
        this.decorateSelectedElement(this.selectedCalendarSlot);
    }

    private saveOperation(): void {
        this.props.serviceReservationSaved(this.props.availableServicesData.selectedServiceId, this.selectedTimeSlot);
        this.props.serviceBooked(this.selectedService.service, this.selectedTimeSlot);
    }

    private defineSelectedTimeSlot(selectedTimeSlot: moment.Moment): IDatetimeSlot | null {

        for (let i = 0; i < this.selectedService.availableDateTimeSlots.length; i++) {
            const element = this.selectedService.availableDateTimeSlots[i];

            if (!element.isReserved) {
                const isSame = moment(selectedTimeSlot).isSame(moment(element.dateStart), "minute")
                if (isSame) {
                    return element;
                }
            }
        }

        return null;
    }

    private defineExludedDates(): moment.Moment[] {
        let exludedTimes: moment.Moment[] = [];

        if (this.selectedService !== undefined) {
            const reservedTimes = this.selectedService.availableDateTimeSlots.filter(time => time.isReserved);
            reservedTimes.forEach(element => {
                exludedTimes.push(element.dateStart);
            });
        }
        
        return exludedTimes;
    }    

    private getSelectedSlot(slotId: IDatetimeSlot): moment.Moment | null {
        let selectedslot = null;

        if (slotId !== undefined) {
            selectedslot = slotId.dateStart;
        }

        return selectedslot;
    }

    private isWeekday(date: moment.Moment): boolean {
        const day = date.day()
        return day !== 0 && day !== 6
    }

    private cancelOperation(): void {
        this.props.serviceReservationCancelled();
    }
}

const mapStateToProps = (state: IAppState) => ({
    availableServicesData: state.availableTableReducer,
    selectedAvalableServiceId: state.availableTableReducer.selectedServiceId,
    bookedServices: state.bookedTableReducer.bookedServices,
    bookedServiceData: state.bookedTableReducer,
    selectedBookedServiceId: state.bookedTableReducer.selectedServiceId
});

export default connect(mapStateToProps, modalActions)(BaseModalComponent);
