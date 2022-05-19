import { Select as AntdSelect } from 'antd';

interface SelectProps<T> {
  valueField: string;
  textField: string;
  onChange?: (value: T) => void;
  data?: T[];
}

export function Select<T>({ valueField, textField, onChange, data }: SelectProps<T>) {
  const { Option } = AntdSelect;

  function handleOnChange(value: any) {
    const element = data?.find((item: any) => item[valueField] === value);
    onChange && onChange(element as T);
  }

  return (
    <AntdSelect onChange={handleOnChange}>
      {data?.map((item: any) => (
        <Option value={item[valueField]}>{item[textField]}</Option>
      ))}
    </AntdSelect>
  );
}
