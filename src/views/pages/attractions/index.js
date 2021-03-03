import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import * as attractionService from "src/services/attractions/attraction.service";
import { PAGE_INDEX, SORT_BY, SORT_DIR, PAGE_SIZE } from "src/constants/common";
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
        console.log(event);
        await this.setState({ sortBy: event.sortField, sortDir: -event.sortOrder });
        console.log(this.state.sortDir);
    }
    render() {
        const { data, sortBy, sortDir } = this.state
        return (
            <div className="datatable-doc-demo">
                <div className="card">
                    <DataTable className='p-datatable-customers'
                        value={data} dataKey="id"
                        emptyMessage="No record found"
                        onSort={this.onSort}
                        sortField={sortBy}
                        sortOrder={sortDir}
                    >
                        <Column field="name" header="Name" sortable={true} />
                        <Column field="description" header="Description" body={this.descriptionTemplate} />
                        <Column field="address" header="Address" />
                        <Column field="city" header="City" sortable />
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