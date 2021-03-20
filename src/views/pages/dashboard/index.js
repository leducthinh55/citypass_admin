import React, { Component } from 'react';
import { Chart } from 'primereact/chart';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Revenue',
            data: [150, 140, 130, 155, 160, 200, 210, 180, 170, 170, 120, 110],
            backgroundColor: '#FFA726'
        },
        {
            label: 'Profit',
            data: [20, 25, 24, 30, 35, 40, 43, 30, 40, 40, 20, 10],
            backgroundColor: '#42A5F5'
        }
    ]
};
const data2 = {
    labels: ['Vietnam', 'Chinese', 'English', 'France', 'Japanese', 'Australia', 'Other'],
    datasets: [
        {
            data: [100000, 10000, 8000, 7000, 6000, 1500, 7200],
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#495057", "#ebedef", "#FFA726", "#eb6b34", "#343deb"
            ],
            hoverBackgroundColor: [
                "#64B5F6",
                "#81C784",
            ]
        }
    ]
};

const lightOptions2 = {
    legend: {
        labels: {
            fontColor: '#495057'
        }
    }
};
class Dashboard extends Component {
    render() {
        return (
            <div className="datatable-crud-demo">
                <div>
                    <div className="card">
                        <Row>
                            <Col>
                                <h4 className='text-center'>Revenue and Profit (Million VND)</h4>
                                {/* <Dropdown option={data} /> */}
                            </Col>
                        </Row>
                        <Chart type="bar" data={data} />
                    </div>
                    <div className="card">
                        <Row className='my-4'>
                            <Col>
                                <h3 className='text-center'>Vietnam and oversea (person)</h3>
                                <select>
                                    <option>2021</option>
                                    <option>2020</option>
                                    <option>2019</option>
                                    <option>2018</option>
                                </select>
                                <Chart type="pie" data={data2} options={lightOptions2} />
                            </Col>
                        </Row>
                    </div>

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
export default connect(mapStateToProps)(Dashboard);