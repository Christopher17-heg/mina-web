import { Calendar, CalendarProps } from 'react-calendar';
import { FormCard } from './Form';
import { ControlledInput } from './types';
import { Icon, Input, InputElement, Group, Popover } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Text } from '@chakra-ui/layout';
import { AiTwotoneCalendar as CalendarIcon } from 'react-icons/ai';
import { useController } from 'react-hook-form';

export function DatePicker(props: CalendarProps) {
  return (
    <Calendar
      view={'month'}
      tileContent={<Text color="brand.500" />}
      prevLabel={
        <Icon w="24px" h="24px" mt="4px">
          <MdChevronLeft />
        </Icon>
      }
      nextLabel={
        <Icon w="24px" h="24px" mt="4px">
          <MdChevronRight />
        </Icon>
      }
      {...props}
      value={props.value ?? null}
    />
  );
}

export type DatePickerFormProps = Omit<CalendarProps, 'value' | 'onChange'>;

export const DatePickerForm: ControlledInput<DatePickerFormProps, CalendarProps['value']> = ({
  control,
  controller,
  ...props
}) => {
  const {
    field: { ref, ...field },
    fieldState,
  } = useController(controller);

  return (
    <FormCard {...control} error={fieldState.error?.message}>
      <DatePicker inputRef={ref} {...field} {...props} />
    </FormCard>
  );
};

export const SmallDatePickerForm: ControlledInput<DatePickerFormProps, CalendarProps['value']> = ({
  control,
  controller,
  ...props
}) => {
  const {
    field: { ref, ...field },
    fieldState,
  } = useController(controller);

  const text = field.value?.toLocaleString(undefined, {
    dateStyle: 'short',
  });

  return (
    <FormCard {...control} error={fieldState.error?.message}>
      <Popover.Root>
        {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
        <Popover.Trigger asChild>
          <Group attached w="full">
            <Input value={text ?? ''} placeholder="Select a Date" readOnly flex={1} />
            <InputElement pointerEvents="none">
              <CalendarIcon />
            </InputElement>
          </Group>
        </Popover.Trigger>
        {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
        <Popover.Content>
          <Popover.Body>
            <DatePicker inputRef={ref} {...field} {...props} />
          </Popover.Body>
        </Popover.Content>
      </Popover.Root>
    </FormCard>
  );
};
