import {
  Center,
  Flex,
  Input,
  InputAddon,
  Popover,
  Portal,
  SimpleGrid,
  Text,
  Group,
  Box,
} from '@chakra-ui/react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { ColorPickerBaseProps } from 'react-colorful/dist/types';
import { FormCard } from './Form';
import { convertHexToRGBA } from '@/utils/common';
import { useController } from 'react-hook-form';
import { ControlledInput } from './types';

export type ColorPickerFormProps = Omit<ColorPickerProps, 'value' | 'onChange'>;

export const SmallColorPickerForm: ControlledInput<
  ColorPickerFormProps,
  ColorPickerProps['value']
> = ({ control, controller, ...props }) => {
  const { field, fieldState } = useController(controller);
  const { value } = field;

  return (
    <FormCard {...control} error={fieldState.error?.message}>
      <Popover.Root>
        {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
        <Popover.Trigger asChild>
          <Box>
            <Group attached>
              <InputAddon bg={value} rounded="xl" h="full" />
              <Input
                autoComplete="off"
                placeholder={value ?? 'Select a color'}
                {...field}
                value={field.value ?? ''}
              />
            </Group>
          </Box>
        </Popover.Trigger>
        <Portal>
          {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
          <Popover.Positioner>
            {/* @ts-expect-error Chakra v3 types don't include children on compound components */}
            <Popover.Content>
              <Popover.Body>
                <ColorPicker value={value} onChange={field.onChange} {...props} />
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </FormCard>
  );
};

export const ColorPickerForm: ControlledInput<ColorPickerFormProps, ColorPickerProps['value']> = ({
  control,
  controller,
  ...props
}) => {
  const { field, fieldState } = useController(controller);
  const { value } = field;

  return (
    <FormCard {...control} error={fieldState.error?.message}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
        <Flex direction="column" gap={3}>
          <Center
            display={{ base: 'none', md: 'flex' }}
            minH="150px"
            rounded="xl"
            border="1px solid"
            borderColor="InputBorder"
            bgColor={value == null ? 'InputBackground' : convertHexToRGBA(value)}
            flex={1}
          >
            {value == null && (
              <Text fontSize="sm" color="TextSecondary">
                No Color
              </Text>
            )}
          </Center>
          <Input
            placeholder={value ?? 'Select a color'}
            autoComplete="off"
            {...field}
            value={field.value ?? ''}
          />
        </Flex>
        <ColorPicker value={field.value} onChange={field.onChange} {...props} />
      </SimpleGrid>
    </FormCard>
  );
};

export type ColorPickerProps = {
  value?: string | null;
  onChange?: (color: string) => void;
  supportAlpha?: boolean;
};

export function ColorPicker({ value, onChange, supportAlpha, ...rest }: ColorPickerProps) {
  const props: Partial<ColorPickerBaseProps<string>> = {
    color: value ?? undefined,
    onChange,
    style: {
      width: '100%',
    },
    ...rest,
  };

  return supportAlpha ? <HexAlphaColorPicker {...props} /> : <HexColorPicker {...props} />;
}
