import { getPropertyValue } from '@helpers';
import { Select as AntdSelect } from 'antd';

import { FieldWithLabel, FieldWithLabelProps } from './common/FieldWithLabel';

interface SelectProps<T> extends Omit<FieldWithLabelProps, 'children'> {
  valueField: string;
  textField: string;
  placeholder?: string;
  width?: number;
  data?: T[];
  onChange?: (value: T) => void;
}

export function Select<T>({
  id,
  valueField,
  textField,
  placeholder,
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
      <AntdSelect id={id} onChange={handleOnChange} placeholder={placeholder}>
        {data?.map((item: T) => {
          const value = getPropertyValue<T, string>(item, valueField);
          const text = getPropertyValue<T, string>(item, textField);

          return (
            <Option value={value} key={value}>
              {text}
            </Option>
          );
        })}
      </AntdSelect>
    </FieldWithLabel>
  );
}
