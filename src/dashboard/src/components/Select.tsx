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
  onChange?: (value: T) => void;
  className?: string;
}

const StyledSelect = styled(AntdSelect)<{ width?: number | string }>`
  /* width: 100%; */
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
  onChange,
  className,
}: SelectProps<T>) {
  const { Option } = AntdSelect;
  const componentWidth = typeof width === 'number' ? `${width}px` : width;

  function handleOnChange(value: unknown) {
    const element = data?.find(
      (item: T) => getPropertyValue<T, string>(item, valueField) === value
    );
    onChange && onChange(element as T);
  }

  return (
    <FieldWithAddon addonBefore={addonBefore} addonAfter={addonAfter}>
      <StyledSelect
        id={id}
        onChange={handleOnChange}
        placeholder={placeholder}
        bordered={!borderless}
        showArrow={showArrow}
        width={componentWidth}
      >
        {data?.map((item: T) => {
          const value = getPropertyValue<T, string>(item, valueField);
          const text = getPropertyValue<T, string>(item, textField);

          return (
            <Option value={value} key={value}>
              {text}
            </Option>
          );
        })}
      </StyledSelect>
    </FieldWithAddon>
  );
}
