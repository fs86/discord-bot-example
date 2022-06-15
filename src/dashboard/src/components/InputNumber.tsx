import { InputNumber as AntdInputNumber } from 'antd';
import styled from 'styled-components';

import { FieldWithLabel, FieldWithLabelProps, FormField } from './common';

interface InputNumberProps extends Omit<FieldWithLabelProps, 'children'> {
  name?: string;
  value?: number;
  addonBefore?: string;
  addonAfter?: string;
  min?: number;
  max?: number;
  className?: string;
}

export function InputNumber({ label, className, ...props }: InputNumberProps) {
  return (
    <FormField className={className}>
      <FieldWithLabel label={label}>
        <AntdInputNumber {...props} />
      </FieldWithLabel>
    </FormField>
  );
}
