import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

class Sidebar extends Component {
    render() {
        const {
            json: {
                image,
                subtitle,
                title,
                id,
                retailer,
                brand,
                tags
            } = {},
            products
        } = this.props;

        // Simulating async loading
        if (!products) {
            return null;
        }

        return (
            <div>
                <Image src={image}/>
                <Title>{title}</Title>
                <ProductInfo>{subtitle}</ProductInfo>
                <Hr />
                <div>
                    {tags.map(t => <Chip key={t}><span>{t}</span></Chip>)}
                </div>
                <Hr />
                <Button>Overiew</Button>
                <Button>Sales</Button>
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

const Hr = styled.div`
  background-color: #d0cdcd75;
  margin: 1em 0; 
  height: 1px;
  width: 100%; 
`;

const ProductInfo = styled.span`
  font-size: 0.75em;
  display: block;
  text-align: center;
  color: #8c8c8c;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;

const Button = styled.h1`
  display: block; 
  font-size: 1em;
  color: #5a6372; 
  margin: 1.5em 0; 
  text-transform: uppercase; 
`;

const Chip = styled.div`
    height: 28px;
    cursor: default;
    border: 1px solid #d0cdcd;
    display: inline-flex;
    font-size: 0.8125rem;
    box-sizing: border-box;
    align-items: center;
    white-space: nowrap;
    border-radius: 3px;
    vertical-align: middle;
    justify-content: center;
    text-decoration: none;
    margin: 0.25em; 
    & > span {
        cursor: inherit;
        display: flex;
        align-items: center;
        user-select: none;
        white-space: nowrap;
        padding-left: 14px;
        padding-right: 14px;
    }
`;

const Image = styled.img`
    width: 70%;
    margin: 0 auto;
    display: block;
`;

export default connect(
    mapStateToProps,
    null
)(Sidebar);