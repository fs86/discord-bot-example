import { getPropertyValue } from '@helpers';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';

import { FieldWithAddon, FieldWithAddonProps } from './common/FieldWithAddon';

export interface SelectProps<TValue, TOption>
  extends Omit<FieldWithAddonProps, 'children' | 'width'> {
  valueField: string;
  textField: string;
  placeholder?: string;
  borderless?: boolean;
  showArrow?: boolean;
  width?: number | string;
  data?: TOption[];
  value?: unknown;
  onChange?: (value: TValue, option: TOption) => void;
  className?: string;
}

const StyledSelect = styled(AntdSelect)<{ width?: number | string }>`
  width: ${({ width }) => width};
`;

export function Select<TValue, TOption>({
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
  value,
  onChange,
  ...props
}: SelectProps<TValue, TOption>) {
  const { Option } = AntdSelect;
  const componentWidth = typeof width === 'number' ? `${width}px` : width;

  function handleOnChange(value: unknown) {
    const element = data?.find((item) => getPropertyValue(item, valueField) === value);
    onChange && onChange(value as TValue, element as TOption);
  }

  return (
    <FieldWithAddon addonBefore={addonBefore} addonAfter={addonAfter} {...props}>
      <StyledSelect
        id={id}
        onChange={handleOnChange}
        placeholder={placeholder}
        bordered={!borderless}
        showArrow={showArrow}
        width={componentWidth}
        defaultValue={value}
      >
        {data?.map((item) => {
          const itemValue = getPropertyValue(item, valueField);
          const itemText = getPropertyValue(item, textField);

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
