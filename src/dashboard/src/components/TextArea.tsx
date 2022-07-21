import { ChangeEventHandler, ReactNode } from 'react';
import { Input as AntdInput } from 'antd';
import styled from 'styled-components';

import { scrollBarStyle } from './common/shared-styles/scrollBarStyle';
import { FieldWithLabel, FieldWithLabelProps, FormField } from './common';

const { TextArea: AntdTextArea } = AntdInput;

const StyledTextArea = styled(AntdTextArea)`
  resize: none;
  ${scrollBarStyle}
`;

interface TextAreaProps extends Omit<FieldWithLabelProps, 'children'> {
  value?: string;
  rows?: number;
  footer?: ReactNode;
  className?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export function TextArea({ label, rows = 3, footer, className, ...props }: TextAreaProps) {
  return (
    <FormField className={className}>
      <FieldWithLabel label={label}>
        <StyledTextArea rows={rows} {...props} />
        {footer && footer}
      </FieldWithLabel>
    </FormField>
  );
}
