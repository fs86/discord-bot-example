import { FormField } from './common/FormField';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TextInputProps {}

// eslint-disable-next-line no-empty-pattern
export function TextInput({}: TextInputProps) {
  return (
    <FormField>
      <input type="text"></input>
    </FormField>
  );
}
