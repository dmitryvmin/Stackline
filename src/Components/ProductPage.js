import React, {Component} from 'react';
import {connect} from "react-redux";
import {PRODUCTS_ENDPOINT} from './../Constants';
import {fetchProducts} from './../Store/Actions';
import styled from 'styled-components';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './../App.css';

import Sibebar from './Sidebar';
import Chart from './Chart';
import Table from './Table';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
});

class ProductPage extends Component {

    componentDidMount() {
        // Fetching from a mock end-point to simulate the async call
        this.props.fetchProducts(PRODUCTS_ENDPOINT);
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Header><img src="https://uploads-ssl.webflow.com/5a8383550aeb2000019fea86/5a87886b0fa8530001f0e462_condensed-s.svg" /><span>Stackline</span></Header>
                <div className={classes.root} spacing={24}>
                    <Grid container>
                        <Grid className={classes.paper} item sm={4}>
                            <Container>
                                <Sibebar />
                            </Container>
                        </Grid>
                        <Grid className={classes.paper} item sm={8}>
                            <Container>
                                <Title>Retail Sales</Title>
                                <Chart />
                            </Container>
                            <Container>
                                <Table />
                            </Container>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: uri => {
            dispatch(fetchProducts(uri))
        },
    }
}

const Title = styled.h1`
  font-size: 1em;
  margin: 0 0 1em; 
  text-align: left;
  color: black;
`;

const Container = styled.div`
  background-color: white; 
  padding: 1em;
  margin-bottom: 2em; 
`;

const Header = styled.div`
  background-color: white; 
  width: 100%; 
  height: 55px;
  display: flex;
  align-items: center;
  & > img {
    float: left;  
    width: 20px;
    margin: 0 1em;
  }
`;

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(ProductPage));
