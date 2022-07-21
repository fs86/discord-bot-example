import { ChangeEventHandler } from 'react';
import { Input as AntdInput } from 'antd';

import { FieldWithLabel, FieldWithLabelProps, FormField } from './common';

interface InputProps extends Omit<FieldWithLabelProps, 'children'> {
  name?: string;
  value?: string | number | readonly string[];
  placeholder?: string;
  addonBefore?: string;
  addonAfter?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <FormField className={className}>
      <FieldWithLabel label={label}>
        <AntdInput {...props} />
      </FieldWithLabel>
    </FormField>
  );
}
