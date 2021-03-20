import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { Component } from 'react';
import { Card, Form, Row, Col, Button, Table } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import * as cityService from "src/services/city/city.service";
import * as ticketTypeService from "src/services/ticket-type/ticket-type.service";
import * as attractionService from "src/services/attractions/attraction.service";
import { ROUTER } from 'src/constants';
import { Toast } from 'primereact/toast';
class Collections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxConstrain: this.props.value?.maxConstrain || 1,
            ticketTypes: this.props.value.ticketTypes || []
        }
    }
    addTicketTypes = () => {
        const { ticketType } = this.state;
        if (!ticketType || !ticketType?.id) {
            return;
        }
        const ticketTypes = this.props.value.ticketTypes || [];
        if (ticketTypes.some(_ => _.id == ticketType.id)) {
            return;
        }
        const { index } = this.props;
        this.setState({ ticketType: {} });
        this.props.addTicketType(index, ticketType);
    }
    onDelete = (index) => {
        const ticketTypes = this.props.value.ticketTypes || [];
        const indexCollection = this.props.index;
        this.props.deleteTicketType(indexCollection, index)
        this.setState({});
    }
    renderItem = () => {
        const ticketTypes = this.props.value.ticketTypes || [];
        return ticketTypes.map((v, i) =>
            <tr>
                <td>{v.name}</td>
                <td><Button onClick={() => this.onDelete(i)} variant='danger'>Delete</Button></td>
            </tr>
        )
    }
    onChangeMaxConstrain = (e) => {
        this.setState({ maxConstrain: e.target.value });
        this.props.onChangeMaxConstrain(e.target.value, this.props.index);
    }
    render() {
        const { ticketType, maxConstrain } = this.state;
        const { listTicketType, value } = this.props;
        const ticketTypes = this.props.value.ticketTypes || [];
        return (
            <div>
                <Row>
                    <Col md='6'>
                        <label>Max Constraint:<span className='red-span'>(*)</span></label>   <InputText className='ml-2' min='1' type='number' placeholder='Enter max contrain' value={maxConstrain} onChange={this.onChangeMaxConstrain} />
                    </Col>
                    <Col md='6'>
                        <Button className='btn-fill pull-right' variant='danger'  style={{marginLeft: '143px'}} onClick={() => this.props.deleteCollection(this.props.index)}>Delete Collection</Button>
                    </Col>

                    <Table>
                        <tbody>
                            {ticketTypes.map((v, i) =>
                                <tr key={i}>
                                    <td>{v.name}</td>
                                    <td><Button className='btn-fill pull-right' variant='warning' style={{width:'90px'}} onClick={() => this.onDelete(i)}>Delete</Button></td>
                                </tr>
                            )}
                            <tr>
                                <td><Dropdown options={listTicketType}
                                    value={ticketType}
                                    filter
                                    onChange={(e) => this.setState({ ticketType: e.value })}
                                    optionLabel="name" filterBy='name' className='col-12' placeholder="Select a Attraction" />
                                </td>
                                <td><Button variant='success' className='btn-fill pull-right' style={{width:'90px'}} onClick={this.addTicketTypes}>Add</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </div>
        )
    }
}

export default Collections;