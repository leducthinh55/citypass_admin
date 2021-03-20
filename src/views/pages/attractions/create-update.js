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
import NumberFormat from 'react-number-format';
import FileUploader from 'src/views/core/button-file';
class AttractionCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.toast = React.createRef();
        this.state = {
            listImage: [1, 2, 3, 4, 5]
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
            this.setState({ listCities, listCategories, ...attractions, childrenPrice: 500000, adultPrice: 1000000, });
        }
        else {
            await this.setState({
                listCities, listCategories,

            });
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
            // const res = await attractionService.create(data);
            // if (res) {
            //     this.showSuccess('Create Successful')
            //     this.props.history.push(ROUTER.ATTRACTIONS);
            // }
            // else {
            //     this.showError('Create Fail')
            // }
        }
        else {
            // const res = await attractionService.update(data);
            // if (res) {
            //     await this.showSuccess('Update Successful')
            //     this.props.history.push(ROUTER.ATTRACTIONS);
            // }
            // else {
            //     this.showError('Update Fail')
            // }
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
            message: `Are you sure you want to delete attraction Suối Tiên?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => this.props.history.push(ROUTER.ATTRACTIONS)
        });
    }
    deleteImage = (i) => {
        const {listImage} = this.state;
        listImage.splice(i,1);
        this.setState({listImage});
    }
    render() {
        const { listImage, name, address, description, city, category, isTemporarityClosed, listCities, listCategories, adultPrice, childrenPrice } = this.state;
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
                                        <label>NAME <span className='red-span'>(*)</span></label>
                                        <InputText className='col-12' value={name} onChange={(e) => this.setState({ name: e.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <label>ADDRESS <span className='red-span'>(*)</span></label>
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
                                <Col className="pr-1" md="6">
                                    <Form.Group>
                                        <label>adult price<span className='red-span'>(*)</span></label>
                                        <NumberFormat style={{ border: '1px solid #ced4da' }} className='col-12' value={adultPrice} thousandSeparator={true} suffix=' ₫' onValueChange={(e) => {
                                            const { formattedValue, value } = e;
                                            // formattedValue = $2,223
                                            // value ie, 2223
                                            this.setState({ adultPrice: formattedValue })
                                        }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col className="pr-1" md="6">
                                    <Form.Group>
                                        <label>children price </label>
                                        <NumberFormat style={{ border: '1px solid #ced4da' }} className='col-12' value={childrenPrice} thousandSeparator={true} suffix=' ₫' onValueChange={(e) => {
                                            const { formattedValue, value } = e;
                                            // formattedValue = $2,223
                                            // value ie, 2223
                                            this.setState({ childrenPrice: formattedValue })
                                        }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>Category <span className='red-span'>(*)</span></label>
                                        <Dropdown options={listCategories}
                                            value={category}
                                            onChange={(e) => this.setState({ category: e.value })}
                                            optionLabel="name" filterBy='name' className='col-12' placeholder="Select a Category" style={{ padding: '0px' }} />
                                    </Form.Group>
                                </Col>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>City <span className='red-span'>(*)</span></label>
                                        <Dropdown options={listCities}
                                            value={city}
                                            onChange={(e) => this.setState({ city: e.value })}
                                            optionLabel="name" filterBy='name' className='col-12' placeholder="Select a City" style={{ padding: '0px' }} />
                                    </Form.Group>
                                </Col>
                                <Col className="px-1" md="4">
                                    <Form.Group>
                                        <label>Is Close <span className='red-span'>(*)</span></label>
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
                            <Row>
                                {listImage.map((v, i) => {
                                    return (
                                        <Col>
                                            <label>Image</label>
                                            <Form.Group>
                                                <div class="img-wrap" style={{
                                                    position: "relative",
                                                    display: 'inline-block',
                                                    fontSize: '0'
                                                }}>
                                                    <span onClick={() =>this.deleteImage(i)} class="close" style={{
                                                        position: 'absolute',
                                                        top: '2px',
                                                        right: '2px',
                                                        zIndex: '100',
                                                        backgroundColor: '#FFF',
                                                        padding: '5px 2px 2px',
                                                        color: '#000',
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer',
                                                        opacity: '.5',
                                                        textAlign: 'center',
                                                        fontSize: '22px',
                                                        lineHeight: '10px',
                                                        borderRadius: '50%',
                                                    }}>&times;</span>
                                                    <img style={{ width: '150px' }}
                                                        src={require("src/assets/img/suoi_tien1.jfif").default}
                                                        alt="..."
                                                    />
                                                </div>
                                            </Form.Group>

                                        </Col>
                                    )
                                })}
                                <Col>
                                    <Form.Group style={{ paddingTop: '50px' }}>
                                        <FileUploader />
                                    </Form.Group>

                                </Col>
                            </Row>
                            <Row className='mt-2'>
                                <Col>
                                    <Button
                                        className="btn-fill pull-right"
                                        variant="info"
                                        style={{ width: '100px' }}
                                        onClick={() => this.props.history.push(ROUTER.ATTRACTIONS)}
                                    >
                                        Save
                                </Button>
                                    <Button variant="danger" style={{ width: '100px' }} className="btn-fill pull-right ml-4" onClick={this.onDelete} >Disable</Button>

                                </Col>

                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </div >
        );
    }
}

export default withRouter(AttractionCreateUpdate);