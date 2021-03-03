import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import * as attractionService from "src/services/attractions/attraction.service";
import { PAGE_INDEX, SORT_BY, SORT_DIR, PAGE_SIZE } from "src/constants/common";
import { Button } from 'primereact/button';
const DEFAULT_VALUE = {
    sortBy: SORT_BY,
    pageIndex: PAGE_INDEX,
    sortDir: SORT_DIR,
    pageSize: PAGE_SIZE
}
class Attractions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            address: '',
            isTemporarityClosed: false,
            city: '',
            data: [],
            ...DEFAULT_VALUE
        }
    }

    fetchData = async () => {
        const { name, isTemporarityClosed, city, sortBy, sortDir, pageIndex, pageSize } = this.state;
        const result = await attractionService.search(name, city, isTemporarityClosed, sortBy, sortDir, pageIndex, pageSize);
        this.setState({ ...result });
    }
    componentDidMount() {
        this.fetchData();
    }

    descriptionTemplate = (rowData) => {
        // TODO lấy 1 phần của description , đằng sau là dấu ...
        return <>{rowData.description}</>
    }

    onSort = async (event) => {
        await this.setState({ sortBy: event.sortField, sortDir: -this.state.sortDir });
        this.fetchData();
    }

    initFormCreateOrUpdate = () => {
        
    }
    render() {
        const { data, sortBy, sortDir } = this.state
        console.log('sortDir', sortDir)
        return (
            <div className="datatable-doc-demo">
                <Button label="Click" icon="pi pi-check" onClick={this.initFormCreateOrUpdate}/>
                <div className="card">
                    <DataTable className='p-datatable-customers'
                        value={data} dataKey="id"
                        emptyMessage="No record found"
                        sortField={sortBy}
                        sortOrder={sortDir}
                        onSort={this.onSort}
                    >
                        <Column field="name" header="Name" sortable />
                        <Column field="description" header="Description" body={this.descriptionTemplate} />
                        <Column field="address" header="Address" />
                        <Column field="city" header="City" />
                        <Column header="Action" />
                    </DataTable>
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
export default connect(mapStateToProps)(Attractions);