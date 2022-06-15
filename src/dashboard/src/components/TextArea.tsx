import { ChangeEventHandler } from 'react';
import { Input as AntdInput } from 'antd';

import { FieldWithLabel, FieldWithLabelProps, FormField } from './common';

interface TextAreaProps extends Omit<FieldWithLabelProps, 'children'> {
  value?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export function TextArea({ label, className, ...props }: TextAreaProps) {
  const { TextArea: AntdTextArea } = AntdInput;

  return (
    <FormField className={className}>
      <FieldWithLabel label={label}>
        <AntdTextArea {...props} />
      </FieldWithLabel>
    </FormField>
  );
}
