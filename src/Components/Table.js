import React, {Component} from 'react';
import {connect} from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        boxShadow: 'none',
    },
    table: {
        minWidth: 700,
    },
});

const ProductTable = props => {
    const {
        json: {
            sales,
        } = {},
        products,
        classes,
    } = props;

    // Simulating async loading
    if (!products) {
        return null;
    }

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow >
                        <TableCell>Week Ending</TableCell>
                        <TableCell numeric>Retail Sales</TableCell>
                        <TableCell numeric>Wholesale Sales</TableCell>
                        <TableCell numeric>Units Sold</TableCell>
                        <TableCell numeric>Retailer Margin</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sales.map((row, i) => {
                        return (
                            <TableRow key={`productTable-${i}`} hover>
                                <TableCell component="th" scope="row">
                                    {row.weekEnding}
                                </TableCell>
                                <TableCell numeric>{row.retailSales}</TableCell>
                                <TableCell numeric>{row.wholesaleSales}</TableCell>
                                <TableCell numeric>{row.unitsSold}</TableCell>
                                <TableCell numeric>{row.retailerMargin}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

const mapStateToProps = state => {
    return {
        products: state.api.products,
        json: state.api.json,
    };
};

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(ProductTable));
