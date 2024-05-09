import React, { useState } from 'react';
import Select from 'react-select';
import styled, { css } from 'styled-components';

const Placeholder = styled.div`
  position: absolute;
  top: ${(props) => (props.isActive ? '-20px' : '50%')};
  left: 10px;
  transform: translateY(-50%);
  font-size: ${(props) => (props.isActive ? '16px' : '20px')};
  color: ${(props) => (props.isActive ? '#aaa' : '#555')};
  transition: top 0.2s, font-size 0.2s, color 0.2s;
`;

const SelectContainer = styled.div`
  position: relative;
  margin: 20px 0;
`;

const CustomSelect = styled(Select)`
  .react-select__control {
    padding-top: 10px; /* Para dar espacio al placeholder cuando flote */
    
  }
`;

const GenericSelect = ({ options, placeholder, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);


  const handleOptionChange = (date) => {
    setSelectedOption(date);
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
    <SelectContainer>
      <Placeholder isActive={isFocused || selectedOption}>
        {placeholder}
      </Placeholder>
      <CustomSelect
        Select
        isClearable={true}
        placeholder={isFocused ? '' : placeholder}
        options={options}
        isSearchable={true}
        onChange={handleOptionChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </SelectContainer>
  );
};

export default GenericSelect;
