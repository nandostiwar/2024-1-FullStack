import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled, { css } from 'styled-components';

// Definir Placeholder utilizando styled-components
const Placeholder = styled.div`
  position: absolute;
  top: ${(props) => (props.isActive ? '-20px' : '50%')};
  left: 10px;
  transform: translateY(-50%);
  font-size: ${(props) => (props.isActive ? '16px' : '20px')};
  color: ${(props) => (props.isActive ? '#aaa' : '#555')};
  transition: top 0.2s, font-size 0.2s, color 0.2s;
`;

// Define el contenedor para el DatePicker con styled-components
const DatePickerContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #007aff; // Color de énfasis cuando se enfoca
  }
`;

const TailwindDatePicker = ({ placeholder = 'Seleccione una fecha', dateFormat = 'dd-MM-yyyy', onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <DatePickerContainer>
      {/* Mostrar placeholder cuando se enfoque o haya una fecha seleccionada */}
      <Placeholder isActive={isFocused || selectedDate}>
        {placeholder}
      </Placeholder>

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat={dateFormat}
        className="w-full border-none outline-none bg-transparent"
        wrapperClassName="w-full"
        placeholderText=""
        onFocus={handleFocus}
        onBlur={handleBlur}
        isClearable={true}
      />
    </DatePickerContainer>
  );
};

export default TailwindDatePicker;
