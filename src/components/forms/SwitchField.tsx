// Chakra imports
import {
  Box,
  Flex,
  Switch,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useController } from 'react-hook-form';
import { Form } from './Form';
import { ControlledInput } from './types';

export const SwitchFieldForm: ControlledInput<{}, boolean> = ({
  control,
  controller,
  ...props
}) => {
  const {
    field: { value, ...field },
    fieldState, 
  } = useController(controller);

  return (
    <Form isInvalid={fieldState.invalid} isRequired={control.required} {...control.baseControl}>
      <Flex justify="space-between" align="center" borderRadius="16px" gap={3}>
        <Box>
          <Text as="label" fontSize={{ base: '16px', md: 'lg' }} fontWeight="medium" mb={0}>
            {control.label}
          </Text>
          <Text fontSize={{ base: 'sm', md: 'md' }} color="TextSecondary">
            {control.description}
          </Text>
        </Box>
        <Switch.Root size="md" checked={value} {...field} {...props}>
          <Switch.HiddenInput />
          {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
        </Switch.Root>
      </Flex>
      {fieldState.error?.message && (
        <Text color="red.500" fontSize="sm">{fieldState.error.message}</Text>
      )}
    </Form>
  );
};

export function SwitchField(
  props: {
    id?: string;
    label?: ReactNode;
    desc?: ReactNode;
    checked?: boolean;
    onCheckedChange?: (details: { checked: boolean }) => void;
  }
) {
  const { id, label, desc, checked, onCheckedChange, ...rest } = props;

  return (
    <Flex justify="space-between" align="center" borderRadius="16px" gap={6}>
      <Box>
        <Text as="label" fontSize="md" fontWeight="medium" mb={0}>
          {label}
        </Text>
        <Text color="TextSecondary">{desc}</Text>
      </Box>
      <Switch.Root id={id} size="md" checked={checked} onCheckedChange={onCheckedChange} {...rest}>
        <Switch.HiddenInput />
        {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
    </Flex>
  );
}
