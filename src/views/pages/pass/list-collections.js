import React, { Component } from 'react';
import { Card, Form, Row, Col, Button, Table } from "react-bootstrap";
import { Dropdown } from 'primereact/dropdown';
import * as ticketTypeService from "src/services/ticket-type/ticket-type.service";
import { ROUTER } from 'src/constants';
import Collections from './collections';
import { connect } from 'react-redux'
class ListCollections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collections: this.props.collections || []
        }
    }
    componentDidMount = async () => {
        let listTicketType = (await ticketTypeService.search('', 0, 0, 0, '', '', '', -1, 0, 1000))?.data;
        listTicketType = listTicketType.map(v => { return { id: v.id, name: v.name, adultPrice: v.adultPrice, childrenPrice: v.childrenPrice } });
        this.setState({ listTicketType });
    }
    addCollection = () => {
        const { collections } = this.state;
        collections.push({});
        this.setState({ collections })
    }
    deleteCollection = (index) => {
        this.props.deleteCollection(index)
        this.setState({})
    }
    render() {
        const { listTicketType } = this.state;
        const { collections } = this.props;
        return (
            <div>
                {collections.map((v, i) =>
                    <Collections key={i} listTicketType={listTicketType} value={v} index={i}
                        addTicketType={this.props.addTicketType}
                        deleteTicketType={this.props.deleteTicketType}
                        deleteCollection={this.deleteCollection}
                        onChangeMaxConstrain={this.props.onChangeMaxConstrain} />
                )}
                <Button onClick={this.addCollection} className='btn-fill pull-right' variant='warning'>Add Collections</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(ListCollections);