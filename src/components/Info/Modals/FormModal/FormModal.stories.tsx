import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormModal } from "./FormModal";
import { Button } from "../../../Inputs/Buttons/Button/Button";
import { primary } from "../../../../constants/colors";
import { IconFlask, IconShoppingCart } from "@tabler/icons-react";
import { TextInput } from "../../../Inputs/TextInputs/TextInput/TextInput";
import { NumberInput } from "../../../Inputs/TextInputs/NumberInput/NumberInput";
import { Stack } from "../../../Layout/Stack/Stack";
import { Title } from "../../../Typography/Title/Title";
import { Group } from "../../../Layout/Group/Group";
import { Center } from "../../../Layout/Center/Center";
import { modalVariants } from "../variants";

const meta: Meta<typeof FormModal> = {
  title: "Components/Info/Modals/FormModal",
  component: FormModal,
  argTypes: {
    opened: {
      control: false,
      description: "Whether the modal is open.",
      table: {
        type: { summary: "boolean" },
      },
    },
    onClose: {
      control: false,
      description:
        "Called when the modal is closed (e.g. overlay click, close button).",
      table: {
        type: { summary: "() => void" },
      },
    },
    icon: {
      control: false,
      description:
        "Custom icon to display above the content. If not provided, the default variant icon is used.",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    children: {
      control: false,
      description: "Modal body content (messages, forms, inputs, etc.).",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    size: {
      control: { type: "text" },
      description: "Modal size (CSS value or number in px).",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "'40rem'" },
      },
    },
    modalVariant: {
      control: { type: "select" },
      options: Object.keys(modalVariants) as (keyof typeof modalVariants)[],
      description:
        "Visual variant (provides default icon, button style, and labels).",
      table: {
        type: {
          summary:
            "'confirm' | 'info' | 'success' | 'error' | 'warning' | 'cancel'",
        },
        defaultValue: { summary: "'info'" },
      },
    },
    onCancel: {
      control: false,
      description: "Handler for the cancel button click.",
      table: {
        type: { summary: "() => void" },
      },
    },
    onConfirm: {
      control: false,
      description: "Handler for the confirm button click.",
      table: {
        type: { summary: "() => void" },
      },
    },
    cancelLabel: {
      control: { type: "text" },
      description: "Override cancel button label. Omit to use variant default.",
      table: { type: { summary: "string" } },
    },
    confirmLabel: {
      control: { type: "text" },
      description:
        "Override confirm button label. Omit to use variant default.",
      table: { type: { summary: "string" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormModal>;

export const Default: Story = {
  args: {
    modalVariant: "info",
    size: "40rem",
    cancelLabel: "",
    confirmLabel: "",
  },
  render: (args) => {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Center>
          <Button onClick={() => setOpened(true)}>Open FormModal</Button>
        </Center>
        <FormModal
          {...args}
          opened={opened}
          onClose={() => setOpened(false)}
          onCancel={() => setOpened(false)}
          onConfirm={() => setOpened(false)}
          children={
            <Title variant="cardSubheader" align="center">
              Example message.
            </Title>
          }
        />
      </>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `const [opened, setOpened] = useState(false);

return (
  <>
    <Center>
      <Button onClick={() => setOpened(true)}>Open FormModal</Button>
    </Center>
    <FormModal
      opened={opened}
      onClose={() => setOpened(false)}
      onCancel={() => setOpened(false)}
      onConfirm={() => setOpened(false)}
      modalVariant={'info'}
      size={'40rem'}
      children={
        <Title variant="cardSubheader" align="center">
          Example message.
        </Title>
      }
    />
  </>
);`,
      },
    },
  },
};

export const WithCustomIcon: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Center>
          <Button onClick={() => setOpened(true)}>Open FormModal</Button>
        </Center>
        <FormModal
          opened={opened}
          onClose={() => setOpened(false)}
          onCancel={() => setOpened(false)}
          onConfirm={() => setOpened(false)}
          icon={<IconFlask color={primary[200]} />}
          children={
            <Title variant="cardSubheader" align="center">
              Example message.
            </Title>
          }
        />
      </>
    );
  },
};

export const WithTextInput: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Center>
          <Button onClick={() => setOpened(true)}>Open FormModal</Button>
        </Center>
        <FormModal
          children={
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              onChange={() => {}}
            />
          }
          opened={opened}
          onClose={() => setOpened(false)}
          onCancel={() => setOpened(false)}
          onConfirm={() => setOpened(false)}
        />
      </>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    const [variant, setVariant] = useState<keyof typeof modalVariants>("info");

    return (
      <>
        <Center>
          <Group gap="1rem">
            {(Object.keys(modalVariants) as (keyof typeof modalVariants)[]).map(
              (v) => (
                <Button
                  key={v}
                  onClick={() => {
                    setVariant(v);
                    setOpened(true);
                  }}
                >
                  {v}
                </Button>
              ),
            )}
          </Group>
        </Center>
        <FormModal
          opened={opened}
          onClose={() => setOpened(false)}
          onCancel={() => setOpened(false)}
          onConfirm={() => setOpened(false)}
          modalVariant={variant}
          children={
            <Title variant="cardSubheader" align="center">
              {modalVariants[variant].message}
            </Title>
          }
        />
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    const [size, setSize] = useState<string>("40rem");
    const sizes = [
      { label: "30rem", value: "30rem" },
      { label: "40rem (Default)", value: "40rem" },
      { label: "60rem", value: "60rem" },
    ];
    return (
      <>
        <Center>
          <Group gap="1rem">
            {sizes.map(({ label, value }) => (
              <Button
                key={value}
                onClick={() => {
                  setSize(value);
                  setOpened(true);
                }}
              >
                {label}
              </Button>
            ))}
          </Group>
        </Center>
        <FormModal
          opened={opened}
          onClose={() => setOpened(false)}
          onCancel={() => setOpened(false)}
          onConfirm={() => setOpened(false)}
          size={size}
          children={
            <Title variant="cardSubheader" align="center">
              Modal size: {size}
            </Title>
          }
        />
      </>
    );
  },
};

export const CustomLabels: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    return (
      <>
        <Center>
          <Button onClick={() => setOpened(true)}>Open FormModal</Button>
        </Center>
        <FormModal
          opened={opened}
          onClose={() => setOpened(false)}
          onCancel={() => setOpened(false)}
          onConfirm={() => setOpened(false)}
          cancelLabel="No, go back"
          confirmLabel="Yes, continue"
          children={
            <Title variant="cardSubheader" align="center">
              Custom cancel and confirm button labels.
            </Title>
          }
        />
      </>
    );
  },
};

export const CompleteExample: Story = {
  render: () => {
    const [opened, setOpened] = useState(false);
    const [quantity, setQuantity] = useState<number | "">(1);
    return (
      <>
        <Center>
          <Button onClick={() => setOpened(true)}>Add to Cart</Button>
        </Center>
        <FormModal
          opened={opened}
          onClose={() => setOpened(false)}
          onCancel={() => setOpened(false)}
          onConfirm={() => setOpened(false)}
          modalVariant="confirm"
          icon={<IconShoppingCart color={primary[200]} />}
          cancelLabel="Cancel"
          confirmLabel="Add to Cart"
          children={
            <Stack gap="1rem" align="center">
              <Title variant="cardHeader" align="center">
                Add Item to Cart
              </Title>
              <Title variant="cardSubheader" align="center">
                Select the quantity you would like to add.
              </Title>
              <NumberInput
                label="Quantity"
                value={quantity}
                onChange={(val) => setQuantity(val ?? 1)}
                min={1}
                max={99}
                step={1}
              />
            </Stack>
          }
        />
      </>
    );
  },
};
