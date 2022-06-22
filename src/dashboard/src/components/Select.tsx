import { getPropertyValue } from '@helpers';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

import { FieldWithAddon, FieldWithAddonProps } from './common/FieldWithAddon';

export interface SelectProps<T> extends Omit<FieldWithAddonProps, 'children' | 'width'> {
  valueField: string;
  textField: string;
  placeholder?: string;
  borderless?: boolean;
  showArrow?: boolean;
  width?: number | string;
  data?: T[];
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  className?: string;
}

const StyledSelect = styled(AntdSelect)<{ width?: number | string }>`
  width: ${({ width }) => width};
`;

export function Select<T>({
  id,
  valueField,
  textField,
  placeholder,
  borderless,
  addonBefore,
  addonAfter,
  showArrow = true,
  width = '100%',
  data,
  defaultValue,
  value,
  onChange,
  ...props
}: SelectProps<T>) {
  const { Option } = AntdSelect;
  const componentWidth = typeof width === 'number' ? `${width}px` : width;

  function handleOnChange(value: unknown) {
    const element = data?.find(
      (item: T) => getPropertyValue<T, string>(item, valueField) === value
    );

    onChange && onChange(element as T);
  }

  const rawValue = value && getPropertyValue<T, string>(value, valueField);

  return (
    <FieldWithAddon addonBefore={addonBefore} addonAfter={addonAfter} {...props}>
      <StyledSelect
        id={id}
        onChange={handleOnChange}
        placeholder={placeholder}
        bordered={!borderless}
        showArrow={showArrow}
        width={componentWidth}
        defaultValue={defaultValue}
        value={rawValue}
      >
        {data?.map((item: T) => {
          const itemValue = getPropertyValue<T, string>(item, valueField);
          const itemText = getPropertyValue<T, string>(item, textField);

          return (
            <Option value={itemValue} key={itemValue}>
              {itemText}
            </Option>
          );
        })}
      </StyledSelect>
    </FieldWithAddon>
  );
}
