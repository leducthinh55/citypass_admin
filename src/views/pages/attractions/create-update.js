import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { Component } from 'react';
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { withRouter } from 'react-router-dom';
import * as cityService from "src/services/city/city.service";
import * as categoryService from "src/services/category/category.service";
import * as attractionService from "src/services/attractions/attraction.service";
import { ROUTER } from 'src/constants';
import { Toast } from 'primereact/toast';
class AttractionCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.toast = React.createRef();
        this.state = {
        }
    }
    componentDidMount = async () => {
        const listCities = (await cityService.search('', '', 1, 0, 1000))?.data;
        const listCategories = (await categoryService.search('', '', 1, 0, 1000))?.data;
        const { pathname } = this.props.location;
        if (pathname !== ROUTER.ATTRACTIONS_CREATE) {
            const attractions = await attractionService.searchById(this.props.match.params.id);
            if (!attractions) {
                this.props.history.push(ROUTER.ATTRACTIONS);
                return;
            }
            attractions.city.atrractions = null;
            attractions.category.atrractions = null;
            this.setState({ listCities, listCategories, ...attractions });
        }
        else {
            this.setState({ listCities, listCategories });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { pathname } = this.props.location;
        const { name, address, description, city, category, isTemporarityClosed } = this.state;
        const data = {
            id: this.props.match.params.id,
            name,
            address,
            description,
            cityId: city.id,
            categoryId: category.id,
            isTemporarityClosed
        }
        if (pathname === ROUTER.ATTRACTIONS_CREATE) {
            const res = await attractionService.create(data);
            if(res) {
                this.showSuccess('Create Successful')
                this.props.history.push(ROUTER.ATTRACTIONS);
            }
            else {
                this.showError('Create Fail')
            }
        }
        else {
            const res = await attractionService.update(data);
            if(res) {
                await this.showSuccess('Update Successful')
                this.props.history.push(ROUTER.ATTRACTIONS);
            }
            else {
                this.showError('Update Fail')
            }
        }
    }
    showSuccess = async (message) => {
        this.toast.current.show({ severity: 'success', summary: 'Success Message', detail: message });
    }
    showError(message) {
        this.toast.current.show({ severity: 'error', summary: 'Error Message', detail: message });
    }
    render() {
        const { name, address, description, city, category, isTemporarityClosed, listCities, listCategories } = this.state;
        const { pathname } = this.props.location;
        return (
            <div className="datatable-crud-demo">
                <Toast ref={this.toast} position="top-right" />
                <Card>
                    <Card.Header>
                        <Card.Title as="h4">{pathname == ROUTER.ATTRACTIONS_CREATE ? 'Create' : 'Edit'} Attractions</Card.Title>
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
                                <Col md="12">
                                    <Form.Group>
                                        <label>ADDRESS</label>
                                        <InputText className='col-12' value={address} onChange={(e) => this.setState({ address: e.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <label>Desciption</label>
                                        <InputTextarea rows={6} cols={80} value={description} onChange={(e) => this.setState({ description: e.target.value })} className='col-12' autoResize />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>Category</label>
                                        <Dropdown options={listCategories}
                                            value={category}
                                            onChange={(e) => this.setState({ category: e.value })}
                                            optionLabel="name" filterBy='name' className='col-12' placeholder="Select a Category" style={{ padding: '0px' }} />
                                    </Form.Group>
                                </Col>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>City</label>
                                        <Dropdown options={listCities}
                                            value={city}
                                            onChange={(e) => this.setState({ city: e.value })}
                                            optionLabel="name" filterBy='name' className='col-12' placeholder="Select a City" style={{ padding: '0px' }} />
                                    </Form.Group>
                                </Col>
                                <Col className="px-1" md="4">
                                    <Form.Group>
                                        <label>Is Close</label>
                                        <Row className='col-12'>
                                            <Col className='pl-5'>
                                                <RadioButton value={false} name="isTemporarityClosed"
                                                    onChange={(e) => this.setState({ isTemporarityClosed: e.value })} checked={isTemporarityClosed === false} />
                                                <label className="pl-2 mb-0">False</label>
                                            </Col>
                                            <Col>
                                                <RadioButton value={true} name="isTemporarityClosed"
                                                    onChange={(e) => this.setState({ isTemporarityClosed: e.value })} checked={isTemporarityClosed === true} />
                                                <label className="pl-2 mb-0">True</label>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button
                                className="btn-fill pull-right"
                                type="submit"
                                variant="info"
                            >
                                Save Attraction
                                </Button>
                            <div className="clearfix"></div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default withRouter(AttractionCreateUpdate);