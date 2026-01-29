import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormModal } from "./FormModal";
import { Button } from "../../../Inputs/Buttons/Button/Button";
import { primary } from "../../../../constants/colors";
import { IconFlask } from "@tabler/icons-react";
import { TextInput } from "../../../Inputs/TextInputs/TextInput/TextInput";
import { Title } from "../../../Typography/Title/Title";

const meta: Meta<typeof FormModal> = {
	title: "Components/Info/Modals/FormModal",
	component: FormModal,
};

export default meta;
type Story = StoryObj<typeof FormModal>;

export const WithoutIcon: Story = {
	render: () => {
		const [opened, setOpened] = useState(false);
		return (
			<>
				<Button onClick={() => setOpened(true)}>Open FormModal</Button>
				<FormModal
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
};

export const WithIcon: Story = {
	render: () => {
		const [opened, setOpened] = useState(false);
		return (
			<>
				<Button onClick={() => setOpened(true)}>Open FormModal</Button>
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
				<Button onClick={() => setOpened(true)}>Open FormModal</Button>
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


