import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import * as passService from "src/services/passes/pass.service";
import { PAGE_INDEX, SORT_BY, SORT_DIR, PAGE_SIZE } from "src/constants/common";
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Paginator } from 'primereact/paginator';
import * as cityService from "src/services/city/city.service";
import { confirmDialog } from 'primereact/confirmdialog';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { ROUTER } from 'src/constants';
import * as attractionService from "src/services/attractions/attraction.service";
const DEFAULT_VALUE = {
    sortBy: SORT_BY,
    pageIndex: PAGE_INDEX,
    sortDir: SORT_DIR,
    pageSize: PAGE_SIZE
}
class Pass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            childrenPrice: '',
            urlImage: '',
            city: '',
            expireDuration: 0,
            rate: 0,
            priceType: 0,
            data: [],
            listCities: [],
            ...DEFAULT_VALUE,
        }
    }

    fetchData = async () => {
        const { name, priceFrom, priceTo, city, attraction, sortBy, sortDir, pageIndex, pageSize } = this.state;
        const result = await passService.search(name, priceFrom, priceTo, attraction, city, sortBy, sortDir, pageIndex, pageSize);
        this.setState({ ...result });
    }
    async componentDidMount() {
        const listCities = (await cityService.search('', '', 1, 0, 1000))?.data;
        const listAttraction = (await attractionService.search('', '', '', null, '', 1, 0, 1000))?.data;
        this.setState({ listCities, listAttraction });
        this.fetchData();
    }

    onSort = async (event) => {
        await this.setState({ sortBy: event.sortField, sortDir: -this.state.sortDir });
        this.fetchData();
    }

    leftContents = () => {
        return (
            <React.Fragment>
                <span className="title"></span>
            </React.Fragment>
        )
    }
    onSearch = async () => {
        const { selectedCity, selectedAttraction } = this.state;
        await this.setState({ city: selectedCity?.name || '', attraction: selectedAttraction?.name || '' })
        this.fetchData();
    }
    rightContents = () => {
        const { listCities, selectedCity, priceFrom, priceTo, selectedAttraction, listAttraction } = this.state;
        return (
            <React.Fragment>
                <div className="p-col-12 mr-2">
                    <div className="p-inputgroup">
                        <InputText placeholder="Enter name" onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    </div>
                </div>
                <div className="p-col-12 mr-2">
                    <div className="p-inputgroup">
                        <InputText placeholder="Price From" onChange={(e) => { this.setState({ priceFrom: e.target.value }) }} />
                    </div>
                </div>
                <div className="p-col-12 mr-2">
                    <div className="p-inputgroup">
                        <InputText placeholder="Price To" onChange={(e) => { this.setState({ priceTo: e.target.value }) }} />
                    </div>
                </div>
                <Dropdown
                    value={selectedCity}
                    options={listCities}
                    onChange={(e) => this.setState({ selectedCity: e.value })}
                    optionLabel="name"
                    placeholder="Select city"
                    className="mr-2"
                    filter
                    showClear
                    filterBy="name"
                />
                <Dropdown
                    value={selectedAttraction}
                    options={listAttraction}
                    onChange={(e) => this.setState({ selectedAttraction: e.value })}
                    optionLabel="name"
                    placeholder="Select Attraction"
                    className="mr-2"
                    filter
                    showClear
                    filterBy="name"
                />
                <Button label="Search" icon="pi pi-search" className="p-button-secondary mr-2" onClick={this.onSearch} />
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={this.openNew} />
            </React.Fragment>
        )
    }

    openNew = () => {
        const { history } = this.props;
        history.push({
            pathname: ROUTER.PASS_CREATE
        });
    }

    deleteBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-times p-c" className="p-button-warning" label="Disable" onClick={() => this.onDelete(rowData)} />
            </React.Fragment>
        );
    }
    onDelete = (rowData) => {
        confirmDialog({
            message: `Are you sure you want to delete ${rowData.name}?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => await this.deleteRow(rowData.id)
        });
    }
    deleteRow = async (id) => {
        const res = await attractionService.deleteAttraction(id);
        if (res) {
            this.fetchData();
        }
    }
    onPageChange = async (e) => {
        await this.setState({ pageIndex: e.first })
        this.fetchData();
    }
    noTemplate = (rowData, column) => {
        return <span>{column.rowIndex + 1}</span>
    }
    nameTemplate = (rowData) => {
        return <Link to={`${ROUTER.PASS}/${rowData.id}`}>{rowData.name}</Link>
    }
    isTemporarityClosedTemplate = (rowData) => {
        return rowData.isTemporarityClosed ? <span>True</span> : <span>False</span>
    }
    direct = (pathName, sub = false, data = {}, state = {}) => {
        const { history } = this.props;
        const search = new URLSearchParams({
            sub,
            ...data
        }).toString();
        history.push({
            pathName,
            search: sub ? search : null,
            state: { ...history.location.state, ...state }
        });
    }
    formatter = new Intl.NumberFormat('vn-VN', {
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    childrenPriceTemplate = (rowData) => {
        return <span>{this.formatter.format(rowData.childrenPrice)}  ₫</span>
    }
    PriceTemplate = (rowData) => {
        return <span>{this.formatter.format(rowData.price)}  ₫</span>
    }
    render() {
        const { data, sortBy, sortDir, pageIndex, pageSize, total } = this.state
        return (
            <div className="datatable-crud-demo">
                <div className="card">
                    <Toolbar className="p-mb-3" left={this.leftContents} right={this.rightContents}></Toolbar>
                    <DataTable className='p-datatable-customers p-datatable-sm'
                        value={data} dataKey="id"
                        emptyMessage="No record found"
                        sortField={sortBy}
                        sortOrder={sortDir}
                        onSort={this.onSort}
                    >
                        <Column header="No." body={this.noTemplate} style={{ width: '5%' }} />
                        <Column body={this.nameTemplate} header="Name" sortable style={{ width: '30%' }} />
                        <Column body={this.childrenPriceTemplate} field="childrenPrice" header="Children Price" sortable style={{ width: '18%' }} />
                        <Column body={this.PriceTemplate} field="price" header="Adult Price" sortable style={{ width: '18%' }} />
                        <Column field="expireDuration" header="Expire duration (days)" sortable style={{ width: '15%' }} />
                    </DataTable>
                    <Paginator rows={pageSize} totalRecords={total} first={pageIndex}
                        onPageChange={this.onPageChange}
                    ></Paginator>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}
export default withRouter(connect(mapStateToProps)(Pass));