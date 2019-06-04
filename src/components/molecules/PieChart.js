import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import store from 'store/configStore';
import { connect } from 'react-redux';

const NumberWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.grey};
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.m};
  border-radius: 50%;
  height: 70px;
  width: 70px;
  box-shadow: 1px 1px 60px white;
  /* border: 6px solid ${({ theme }) => theme.grey}; */

  ${({ big }) =>
    big &&
    css`
      top: 20px;
      right: 20px;
      height: 100px;
      width: 100px;
      font-size: ${({ theme }) => theme.fontSize.l};
    `}


  ${({ color }) =>
    color === 'green' &&
    css`
      border-right: 6px solid ${color};
    `}

  ${({ color }) =>
    color === 'blue' &&
    css`
      border-right: 6px solid ${color};
      border-bottom: 6px solid ${color};
    `}  

    ${({ color }) =>
      color === 'orange' &&
      css`
        border-right: 6px solid ${color};
        border-bottom: 6px solid ${color};
        border-left: 6px solid ${color};
      `}   

    ${({ color }) =>
      color === 'red' &&
      css`
        border-right: 6px solid ${color};
        border-bottom: 6px solid ${color};
        border-left: 6px solid ${color};
        border-top: 6px solid ${color};
      `} 
  `;

const chooseBorderColor = number => {
  let color = 'green';
  if (number <= 25) color = 'green';
  else if (number <= 50) color = 'blue';
  else if (number <= 75) color = 'orange';
  else if (number <= 100) color = 'red';

  return color;
};

const PieChart = ({ big, title, items }) => {
  let index = 0;
  if (items.length > 0) {
    index = items.findIndex(item => item.title === title);
  }
  // console.log(items[index].fakeindicator);

  const chartNumber = items[index].fakeindicator;

  return (
    <>
      <NumberWrapper big={big} color={chooseBorderColor(chartNumber)}>
        {`${Math.round(chartNumber * 100) / 100}%`}
      </NumberWrapper>
    </>
  );
};

const mapStateToProps = state => {
  const { json } = state;
  return { items: json };
};
export default connect(mapStateToProps)(PieChart);
