import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {LineChart, Line, XAxis, Tooltip, ResponsiveContainer} from 'recharts';
import moment from 'moment';
import _ from 'lodash';

const formatXAxis = (tickItem) => {
    const tick = moment(tickItem).format('MMM');
    return tick;
}

const getMonthAve = (arr, key) => {
    const vals = arr.map(a => a.retailSales);
    const ave = vals.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    return ave;
}

const groupChartData = (data) => {
    const byMonthData = {};
    const formattedData = [];

    // Group data into Month bucks
    data.forEach(d => {
        const bucket = moment(d.weekEnding).format("MM YYYY");

        if (!_.has(byMonthData, bucket)) {
            byMonthData[bucket] = []
        }

        byMonthData[bucket].push(d);
    });

    // Reduce data by Month
    for (let bucket in byMonthData) {
        const b = byMonthData[bucket];
        const retailSales = getMonthAve(b, 'retailSales');
        const retailerMargin = getMonthAve(b, 'retailerMargin');
        const unitsSold = getMonthAve(b, 'unitsSold');
        const wholesaleSales = getMonthAve(b, 'wholesaleSales');
        const weekEnding = moment(`01 ${bucket}`, ["DDMMYYYY"]).format();

        const monthObj = {
            weekEnding,
            retailSales,
            retailerMargin,
            unitsSold,
            wholesaleSales
        }

        formattedData.push(monthObj);
    }

    return formattedData;
}

const getTicks = (data) => {
    const grouped = groupChartData(data);

    const ticks = grouped.reduce( (a,c) => {
        a.push(c.weekEnding)
        return a;
    }, []);

    return ticks;
}

class Sidebar extends Component {
    render() {
        const {
            json,
            json: {
                sales,
            } = {},
            products,
        } = this.props;

        // Simulating async loading
        if (!products) {
            return null;
        }

        // For a more normalized graph, can view data by week
        const data = groupChartData(sales);
        const ticks = getTicks(sales);

        return (
            <div style={{width: '100%', height: '400px'}}>
                <ResponsiveContainer>
                    <LineChart data={sales}
                               margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="weekEnding"
                               tickFormatter={formatXAxis}
                               interval={4}
                               tickLine={false}
                               />
                        <Tooltip/>
                        <Line dot={false}
                              strokeWidth={2}
                              type="monotone"
                              dataKey="retailSales"
                              stroke="#48a9f9"/>
                        <Line dot={false}
                              strokeWidth={2}
                              type="monotone"
                              dataKey="wholesaleSales"
                              stroke="#9ba6c1"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.api.products,
        json: state.api.json,
    };
};

const ProductInfo = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Tag = styled.div`
  padding: 1em;
  border: 1px solid black;
`;

export default connect(
    mapStateToProps,
    null
)(Sidebar);