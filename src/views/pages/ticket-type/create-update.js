import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { Component } from 'react';
import { Card, Form, Row, Col, Button, Table } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { withRouter } from 'react-router-dom';
import * as cityService from "src/services/city/city.service";
import * as ticketTypeService from "src/services/ticket-type/ticket-type.service";
import * as attractionService from "src/services/attractions/attraction.service";
import { ROUTER } from 'src/constants';
import { Toast } from 'primereact/toast';
import axios from 'axios';
class TicketTypeCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.toast = React.createRef();
        this.state = {
            disableAttraction: true,
            city: '',
            adultPrice: 0,
            childrenPrice: 0,
            name: '',
            newUrlImages: [],
            imageUpload: [],
            urlImages:[]
        }
    }
    componentDidMount = async () => {
        const listCities = (await cityService.search('', '', 1, 0, 1000))?.data;
        let listAttractions = (await attractionService.search('', '', '', null, '', 1, 0, 1000))?.data || [];
        listAttractions = listAttractions.map(v => { return { id: v.id, name: v.name } });
        const { pathname } = this.props.location;
        if (pathname !== ROUTER.TICKET_TYPE_CREATE) {
            const ticketType = await ticketTypeService.searchById(this.props.match.params.id);
            if (!ticketType) {
                this.props.history.push(ROUTER.TICKET_TYPE);
                return;
            }
            const city = ticketType.atrraction.city;
            city.atrractions = null;
            const attraction = { id: ticketType.atrraction.id, name: ticketType.atrraction.name }
            this.setState({ listCities, ...ticketType, city, attraction, listAttractions });
        }
        else {
            this.setState({ listCities, listAttractions });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { pathname } = this.props.location;
        const { name, adultPrice, childrenPrice, urlImages, attraction, imageUpload } = this.state;
        const data = {
            id: this.props.match.params.id,
            name,
            adultPrice,
            childrenPrice,
            atrractionId: attraction.id
        }

        if (pathname === ROUTER.TICKET_TYPE_CREATE) {
            data.imageUpload = imageUpload;
            const res = await ticketTypeService.create(data);
            if (res) {
                this.props.history.push(ROUTER.TICKET_TYPE);
            }
            else {
            }
        }
        else {
            data.imageUpload = imageUpload;
            data.urlImages = urlImages;
            const res = await ticketTypeService.update(data);
            if (res) {
                this.props.history.push(ROUTER.TICKET_TYPE);
            }
            else {
            }
        }
    }
    showSuccess = async (message) => {
        this.toast.current.show({ severity: 'success', summary: 'Success Message', detail: message });
    }
    showError(message) {
        this.toast.current.show({ severity: 'error', summary: 'Error Message', detail: message });
    }
    onChangeCity = async (e) => {
        this.setState({ city: e.value })
        if (e.value) {
            this.setState({ disableAttraction: false });
            let listAttractions = (await attractionService.search('', e.value.name, '', null, '', 1, 0, 1000))?.data || [];
            listAttractions = listAttractions.map(v => { return { id: v.id, name: v.name } });
            await this.setState({ listAttractions })
        }
    }
    imageHander = (e) => {
        const { newUrlImages, imageUpload } = this.state;
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                newUrlImages.push(reader.result);
                this.setState({ newUrlImages });
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            imageUpload.push(e.target?.files[0])
            this.setState({ imageUpload });
        }
    }
    onDeleteImage = (i) => {
        const { newUrlImages, imageUpload } = this.state;
        newUrlImages.splice(i, 1);
        imageUpload.splice(i, 1);
        this.setState({ newUrlImages, imageUpload });
    }
    onDeleteOldImage = (i) => {
        const { urlImages } = this.state;
        urlImages.splice(i, 1);
        this.setState({ urlImages });
    }
    render() {
        const { name, adultPrice, childrenPrice, disableAttraction, city, attraction, listCities, listAttractions, newUrlImages = [], image, urlImages } = this.state;
        const { pathname } = this.props.location;
        return (
            <div className="datatable-crud-demo">
                <Toast ref={this.toast} position="top-right" />
                <Card>
                    <Card.Header>
                        <Card.Title as="h4">{pathname == ROUTER.TICKET_TYPE_CREATE ? 'Create' : 'Edit'} Ticket Type</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <label>NAME</label>
                                        <InputText className='col-12' value={name} onChange={(e) => this.setState({ name: e.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <Form.Group>
                                        <label>adult price</label>
                                        <InputText type='number' className='col-12' value={adultPrice} onChange={(e) => this.setState({ adultPrice: e.target.value })} />
                                    </Form.Group>
                                </Col>
                                <Col className="pr-1" md="6">
                                    <Form.Group>
                                        <label>children price</label>
                                        <InputText type='number' className='col-12' value={childrenPrice} onChange={(e) => this.setState({ childrenPrice: e.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="6">
                                    <Dropdown options={listCities}
                                        value={city}
                                        onChange={this.onChangeCity}
                                        optionLabel="name" filterBy='name' className='col-12' placeholder="Select a City" style={{ padding: '0px' }} />
                                </Col>
                                <Col className="pr-1" md="6">
                                    <Dropdown options={listAttractions}
                                        disabled={disableAttraction}
                                        value={attraction}
                                        onChange={(e) => this.setState({ attraction: e.value })}
                                        optionLabel="name" filterBy='name' className='col-12' placeholder="Select a Attraction" style={{ padding: '0px' }} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Table>
                                        <tbody>
                                            {urlImages.map((v, i) =>
                                                <tr key={i}>
                                                    <td><img src={v} /></td>
                                                    <td><Button className='btn-fill pull-right' onClick={() => this.onDeleteOldImage(i)} variant='danger'>Delete</Button></td>
                                                </tr>
                                            )}
                                            {newUrlImages.map((v, i) =>
                                                <tr key={i}>
                                                    <td><img src={v} /></td>
                                                    <td><Button className='btn-fill pull-right' onClick={() => this.onDeleteImage(i)} variant='danger'>Delete</Button></td>
                                                </tr>
                                            )}
                                            <tr>
                                                <td><input type='file' onChange={this.imageHander} value={(e) => { this.setState({ image: e.target.value }) }} /></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Button
                                className="btn-fill pull-right"
                                type="submit"
                                variant="info"
                            >
                                Save Ticket Type
                                </Button>
                            <div className="clearfix"></div>
                        </Form>
                    </Card.Body>
                </Card>
            </div >
        );
    }
}

export default withRouter(TicketTypeCreateUpdate);