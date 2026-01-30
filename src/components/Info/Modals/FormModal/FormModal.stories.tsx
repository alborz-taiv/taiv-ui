import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormModal } from "./FormModal";
import { Button } from "../../../Inputs/Buttons/Button/Button";
import { primary } from "../../../../constants/colors";
import {
	IconFlask,
	IconCircleCheck,
	IconCircleX,
	IconAlertTriangle,
	IconTrash,
	IconInfoCircle,
	IconQuestionMark,
} from "@tabler/icons-react";
import { TextInput } from "../../../Inputs/TextInputs/TextInput/TextInput";
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
				"Optional custom icon shown above the content. When provided, the icon block is displayed.",
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
		width: {
			control: { type: "text" },
			description: "Modal width (CSS value or number in px).",
			table: {
				type: { summary: "string | number" },
				defaultValue: { summary: "'40rem'" },
			},
		},
		modalVariant: {
			control: { type: "select" },
			options: Object.keys(modalVariants) as (keyof typeof modalVariants)[],
			description:
				"Visual variant (icon background colors, button style, default labels).",
			table: {
				type: {
					summary:
						"'confirm' | 'info' | 'success' | 'error' | 'warning' | 'cancel'",
				},
				defaultValue: { summary: "'info'" },
			},
		},
		handleCancel: {
			control: false,
			description: "Handler for the cancel button click.",
			table: {
				type: { summary: "() => void" },
			},
		},
		handleConfirm: {
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
		width: "40rem",
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
					handleCancel={() => setOpened(false)}
					handleConfirm={() => setOpened(false)}
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
      handleCancel={() => setOpened(false)}
      handleConfirm={() => setOpened(false)}
	  modalVariant={'info'}
	  width={'40rem'}
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

export const WithIcon: Story = {
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
					handleCancel={() => setOpened(false)}
					handleConfirm={() => setOpened(false)}
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
					handleCancel={() => setOpened(false)}
					handleConfirm={() => setOpened(false)}
				/>
			</>
		);
	},
};

export const Variants: Story = {
	render: () => {
		const [opened, setOpened] = useState(false);
		const [variant, setVariant] = useState<keyof typeof modalVariants>("info");

		const variantIcons: Record<keyof typeof modalVariants, React.ReactNode> = {
			confirm: <IconQuestionMark color={modalVariants.confirm.iconColor} />,
			info: <IconInfoCircle color={modalVariants.info.iconColor} />,
			success: <IconCircleCheck color={modalVariants.success.iconColor} />,
			error: <IconCircleX color={modalVariants.error.iconColor} />,
			warning: <IconAlertTriangle color={modalVariants.warning.iconColor} />,
			cancel: <IconTrash color={modalVariants.cancel.iconColor} />,
		};

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
					handleCancel={() => setOpened(false)}
					handleConfirm={() => setOpened(false)}
					modalVariant={variant}
					icon={variantIcons[variant]}
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

export const Widths: Story = {
	render: () => {
		const [opened, setOpened] = useState(false);
		const [width, setWidth] = useState<string>("40rem");
		const widths = [
			{ label: "Narrow (30rem)", value: "30rem" },
			{ label: "Default (40rem)", value: "40rem" },
			{ label: "Wide (60rem)", value: "60rem" },
		];
		return (
			<>
				<Center>
					<Group gap="1rem">
						{widths.map(({ label, value }) => (
							<Button
								key={value}
								onClick={() => {
									setWidth(value);
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
					handleCancel={() => setOpened(false)}
					handleConfirm={() => setOpened(false)}
					width={width}
					children={
						<Title variant="cardSubheader" align="center">
							Modal width: {width}
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
					handleCancel={() => setOpened(false)}
					handleConfirm={() => setOpened(false)}
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
