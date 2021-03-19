import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { Component } from 'react';
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { withRouter } from 'react-router-dom';
import * as passService from "src/services/passes/pass.service";
import { ROUTER } from 'src/constants';
import { storage } from 'src/firebase/firebase'
import { Toast } from 'primereact/toast';
import Collections from './collections';
import ListCollections from './list-collections';
const IMAGE_DEFAULT = 'https://www.jaipuriaschoolpatna.in/wp-content/uploads/2016/11/blank-img.jpg';
class PassCreateUpdate extends Component {
    constructor(props) {
        super(props);
        this.toast = React.createRef();
        this.state = {
            collections: [],
            urlImage: IMAGE_DEFAULT,
            adultPriceAdd: 0,
            childrenPriceAdd: 0
        }
    }
    componentDidMount = async () => {
        const { pathname } = this.props.location;
        if (pathname !== ROUTER.PASS_CREATE) {
            let pass = await passService.searchById(this.props.match.params.id);
            if (!pass) {
                this.props.history.push(ROUTER.PASS);
                return;
            }
            if (!pass.urlImage) {
                pass.urlImage = IMAGE_DEFAULT;
            }
            this.setState({ ...pass });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { image, name, description, price, childrenPrice, expireDuration } = this.state;
        const id = this.props.match.params?.id;
        let { collections } = this.state;
        let urlImage = '';
        if (image) {
            const random = Math.floor(Math.random() * 9999999);
            await storage.ref(`images/pass/${image.name}-${random}`).put(image);
            urlImage = await storage.ref("images/pass").child(`${image.name}-${random}`).getDownloadURL();
        }
        const { pathname } = this.props.location;
        collections = collections.map(v => {
            const { MaxConstrain, ticketTypes } = v;
            const TicketTypeIds = ticketTypes.map(_ => _.id);
            return { MaxConstrain, TicketTypeIds };
        })
        const data = {
            id, urlImage, name, description, price, childrenPrice, expireDuration, collections
        }
        if (pathname === ROUTER.PASS_CREATE) {
            console.log('fasfasfasdf');
            const res = await passService.create(data);
            if (res) {
                this.props.history.push(ROUTER.PASS);
            }
            else {
            }
        }
        else {
            // const res = await passService.update(data);
            // if (res) {
            //     this.props.history.push(ROUTER.PASS);
            // }
            // else {
            // }
        }
    }
    caculatePrice() {
        const { collections } = this.state;
        let adultPriceAdd = 0;
        let childrenPriceAdd = 0;
        collections.map(v => {
            const maxConstrain = v.maxConstrain || 1;
            let tmpAdult = 0;
            let tmpChildren = 0
            v.ticketTypes.map(_ => {
                let { adultPrice = 0, childrenPrice = 0 } = _;
                tmpAdult += adultPrice;
                tmpChildren += childrenPrice;
            });
            adultPriceAdd += Math.floor(tmpAdult * maxConstrain / v.ticketTypes.length);
            childrenPriceAdd += Math.floor(tmpChildren * maxConstrain / v.ticketTypes.length);
        })
        this.setState({ adultPriceAdd, childrenPriceAdd });
    }
    addTicketType = async (index, ticketType) => {
        const { collections } = this.state;
        collections[index] = collections[index] || {};
        collections[index].ticketTypes = collections[index].ticketTypes || [];
        collections[index].ticketTypes.push(ticketType);
        await this.setState({ collections });
        this.caculatePrice();
    }
    deleteTicketType = async (indexCollection, index) => {
        const { collections } = this.state;
        collections[indexCollection] = collections[indexCollection] || {};
        collections[indexCollection].ticketTypes = collections[indexCollection].ticketTypes || [];
        collections[indexCollection].ticketTypes.splice(index, 1);
        await this.setState({ collections });
        this.caculatePrice();
    }
    deleteCollection = async (indexCollection) => {
        const { collections } = this.state;
        collections.splice(indexCollection, 1);
        await this.setState({ collections });
        this.caculatePrice();
    }
    onChangeMaxConstrain = async (maxConstrain, index) => {
        const { collections } = this.state;
        collections[index] = collections[index] || {};
        collections[index].maxConstrain = maxConstrain
        await this.setState({ collections });
        this.caculatePrice();
    }
    imageHander = (e) => {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ urlImage: reader.result })
            }
        }
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            this.setState({ image: e.target?.files[0] });
        }
    }
    render() {
        const { name, description, expireDuration, childrenPrice, price, listTicketType, image, collections, urlImage, adultPriceAdd, childrenPriceAdd } = this.state;
        const { pathname } = this.props.location;
        return (
            <div className="datatable-crud-demo">
                <Toast ref={this.toast} position="top-right" />
                <Card>
                    <Card.Header>
                        <Card.Title as="h4">{pathname == ROUTER.PASS_CREATE ? 'Create' : 'Edit'} Pass</Card.Title>
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
                                        <label>Desciption</label>
                                        <InputTextarea rows={6} cols={80} value={description} onChange={(e) => this.setState({ description: e.target.value })} className='col-12' autoResize />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>adult price ({adultPriceAdd}) </label>
                                        <InputText type='number' className='col-12' value={price} onChange={(e) => this.setState({ price: e.target.value })} />
                                    </Form.Group>
                                </Col>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>children price ({childrenPriceAdd})</label>
                                        <InputText type='number' className='col-12' value={childrenPrice} onChange={(e) => this.setState({ childrenPrice: e.target.value })} />
                                    </Form.Group>
                                </Col>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>Expire Duration (day)</label>
                                        <InputText type='number' className='col-12' value={expireDuration} onChange={(e) => this.setState({ expireDuration: e.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>Image</label>
                                        <Form.File.Input type='file' className='col-12' onChange={this.imageHander} />
                                        <img src={urlImage} style={{ width: '300px' }} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="10">
                                    <ListCollections
                                        onChangeMaxConstrain={this.onChangeMaxConstrain}
                                        deleteCollection={this.deleteCollection} deleteTicketType={this.deleteTicketType} addTicketType={this.addTicketType} collections={collections} />

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

export default withRouter(PassCreateUpdate);