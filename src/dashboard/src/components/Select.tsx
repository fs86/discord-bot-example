import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

import { FieldWithLabel, FieldWithLabelProps } from './common/FieldWithLabel';

interface SelectProps<T> extends Omit<FieldWithLabelProps, 'children'> {
  valueField: string;
  textField: string;
  width?: number;
  data?: T[];
  onChange?: (value: T) => void;
}

const StyledSelect = styled(AntdSelect)`
  width: 100%;
`;

export function Select<T>({
  id,
  valueField,
  textField,
  width = 120,
  data,
  onChange,
  ...props
}: SelectProps<T>) {
  const { Option } = AntdSelect;

  function handleOnChange(value: any) {
    const element = data?.find((item: any) => item[valueField] === value);
    onChange && onChange(element as T);
  }

  return (
    <FieldWithLabel width={width} {...props}>
      <StyledSelect id={id} onChange={handleOnChange}>
        {data?.map((item: any) => (
          <Option value={item[valueField]}>{item[textField]}</Option>
        ))}
      </StyledSelect>
    </FieldWithLabel>
  );
}
