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
import { confirmDialog } from 'primereact/confirmdialog';
class CityCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.toast = React.createRef();
        this.state = {

        }
    }
    componentDidMount = async () => {
        const { pathname } = this.props.location;
        if (pathname !== ROUTER.CITY_CREATE) {
            await this.setState({

            });
        }
        else {

        }
    }

    showSuccess = async (message) => {
        this.toast.current.show({ severity: 'success', summary: 'Success Message', detail: message });
    }
    showError(message) {
        this.toast.current.show({ severity: 'error', summary: 'Error Message', detail: message });
    }
    onDelete = () => {
        confirmDialog({
            message: `Are you sure you want to DISABLE attraction Suối Tiên?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => this.props.history.push(ROUTER.CITY)
        });
    }
    render() {
        const { name, address, description, city, category, isTemporarityClosed, listCities, listCategories, adultPrice, childrenPrice } = this.state;
        const { pathname } = this.props.location;
        return (
            <div className="datatable-crud-demo">
                <Toast ref={this.toast} position="top-right" />
                <Card>
                    <Card.Header>
                        <Card.Title as="h4">{pathname == ROUTER.ATTRACTIONS_CREATE ? 'Create' : 'Edit'} City</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <label>NAME <span className='red-span'>(*)</span></label>
                                        <InputText className='col-12' value={name} onChange={(e) => this.setState({ name: e.target.value })} />
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
                            
                            <Row className='mt-2'>
                                <Col>
                                    <Button
                                        className="btn-fill pull-right"
                                        variant="info"
                                        style={{ width: '100px' }}
                                        onClick={() => this.props.history.push(ROUTER.CITY)}
                                    >
                                        Save
                                </Button>
                                    {/* <Button variant="danger" style={{ width: '100px' }} className="btn-fill pull-right ml-4" onClick={this.onDelete} >Disable</Button> */}

                                </Col>

                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default withRouter(CityCreateUpdate);