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
  valueField,
  textField,
  borderless,
  addonBefore,
  addonAfter,
  showArrow = true,
  width = '100%',
  data,
  onChange,
  className,
  inline,
  ...props
}: SelectProps<TValue, TOption>) {
  const { Option } = AntdSelect;
  const componentWidth = typeof width === 'number' ? `${width}px` : width;

  function handleOnChange(value: unknown) {
    const element = data?.find((item) => getPropertyValue(item, valueField) === value);
    onChange && onChange(value as TValue, element as TOption);
  }

  return (
    <FieldWithAddon
      addonBefore={addonBefore}
      addonAfter={addonAfter}
      className={className}
      inline={inline}
    >
      <StyledSelect
        onChange={handleOnChange}
        bordered={!borderless}
        showArrow={showArrow}
        width={componentWidth}
        {...props}
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
