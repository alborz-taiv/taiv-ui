import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FourmModal } from "./FourmModal";
import { Button } from "../../../Inputs/Buttons/Button/Button";
import { primary } from "../../../../constants/colors";
import { IconFlask } from "@tabler/icons-react";
import { TextInput } from "../../../Inputs/TextInputs/TextInput/TextInput";

const meta: Meta<typeof FourmModal> = {
	title: "Components/Info/Modals/FourmModal",
	component: FourmModal,
};

export default meta;
type Story = StoryObj<typeof FourmModal>;

export const WithoutIcon: Story = {
	render: () => {
		const [opened, setOpened] = useState(false);
		return (
			<>
				<Button onClick={() => setOpened(true)}>Open FourmModal</Button>
				<FourmModal
					opened={opened}
					onClose={() => setOpened(false)}
					handleCancel={() => setOpened(false)}
					handleConfirm={() => setOpened(false)}
					children={<span>Example Content</span>}
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
				<Button onClick={() => setOpened(true)}>Open FourmModal</Button>
				<FourmModal
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
					icon={<IconFlask color={primary[200]} />}
				/>
			</>
		);
	},
};
