import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Table, Button } from 'react-bootstrap';
import { BookedTableHeader } from "../../../../../constants/tableConstants"; 
import { IBookedServiceState } from "../../../../../store/reducers/bookedTableReducer";
import { IBookedServices } from "../../../../../contracts/BookedServices";
import BaseModalComponent from "../../../modal/modal";

interface IDispatchProps {
    bookedServicesData: IBookedServiceState;
    receiveBookedServices(): IBookedServices[];
    bookedServiceClicked(id: number): void;
    bookedServiceDeleted(id: number): void;
}

export default class BookedTableComponent extends React.PureComponent<IDispatchProps>{

    public componentWillMount(): void {
        this.props.receiveBookedServices();
    }

    public render(): JSX.Element {        
        const headerRows = this.generateTableHeaders();    

        let content = <div className="col-md-12 text-center">No booked services</div>;
        if (this.props.bookedServicesData.bookedServices !== undefined && this.props.bookedServicesData.bookedServices.length > 0) {
            const body = this.generateTableBody(this.props.bookedServicesData.bookedServices);

            content = <div>
                        <Table striped responsive hover>
                            <thead>
                                {headerRows}
                            </thead>
                            <tbody>
                                {body}
                            </tbody>                    
                        </Table>
                        <BaseModalComponent {...this.props} />
                      </div>;
        }
       
        return (
            <div className="col-md-12">
                {content}
            </div>
        );
    }

    private generateTableHeaders(): JSX.Element {

        var keys = Object.keys( BookedTableHeader );    
        const headers:{ [key: string] : string; } = {...BookedTableHeader};
        const cols: JSX.Element[] = [];

        for (let i = 0; i < keys.length; i++) {
            let key = "cellheader " + i;
            let text = headers[keys[i]];     
            cols.push(<th key={key}>{text}</th>);    
        }

        return <tr key="header">{cols}</tr>;
    }

    private generateTableBody(data: IBookedServices[]): JSX.Element[] {

        const rows: JSX.Element[] = [];
        var colCount = Object.keys( BookedTableHeader ).length;       

        for (let i = 0; i < data.length; i++) {
            const cols: JSX.Element[] = [];
            const id = data[i].service.serviceId;
            cols.push(<td key={this.guid()} onClick={this.showModal.bind(this, id)}>{data[i].service.serviceName}</td>);  
            cols.push(<td key={this.guid()} onClick={this.showModal.bind(this, id)}>{data[i].service.doctor}</td>);

            const date = data[i].bookedDateTime.dateStart.format("MMM/DD");
            cols.push(<td key={this.guid()} onClick={this.showModal.bind(this, id)} >{date}</td>);

            const time = data[i].bookedDateTime.dateStart.format("HH:mm")
            cols.push(<td key={this.guid()} onClick={this.showModal.bind(this, id)}>{time}</td>);

            let referral = data[i].service.referral ? <input id="checkBox" type="checkbox" checked disabled/> : <input id="checkBox" type="checkbox" disabled/>;
            cols.push(<td key={this.guid()} onClick={this.showModal.bind(this, id)}>{referral}</td>);  

           let preReq = "-";
            if (data[i].service.prerequiredServieName !== undefined) {
                preReq = data[i].service.prerequiredServieName;
            }
            cols.push(<td key={this.guid()} >{preReq}</td>);

            cols.push(<td key={this.guid()} ><Button bsSize="xs" bsStyle="primary" onClick={this.showModal.bind(this, id)} ><i className="glyphicon glyphicon-pencil"></i></Button></td>);

            cols.push(<td key={this.guid()} ><Button bsSize="xs" bsStyle="danger" onClick={this.deleteReservation.bind(this, id)} ><i className="glyphicon glyphicon-trash"></i></Button></td>);

            let row = <tr key={this.guid()}>{cols}</tr>;
            rows.push(row);
        }

        return rows;
    }

    private showModal(id: number): any {        
        this.props.bookedServiceClicked(id);
    }

    private deleteReservation(id: number): void {
        this.props.bookedServiceDeleted(id);
    }

    private guid(): string {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    private s4(): string {
        const result = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);

        return result;
    }
}
