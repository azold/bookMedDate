import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Panel } from 'react-bootstrap';
import { BookedPanel } from "../../../../../../constants/panelConstants"; 

export default class BookedPanelComponent extends React.Component{

    public render(): JSX.Element {

        return (
            <Panel bsStyle="info">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">{BookedPanel.title}</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <div className="col-md-6">
                        <p>
                            {BookedPanel.details}
                        </p>
                    </div>
                    <div className="col-md-6">
                        <img className="img-responsive" src="./images/BOOKING.png"/>
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
