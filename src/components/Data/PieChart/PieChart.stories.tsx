import type { Meta, StoryObj } from "@storybook/react-vite";
import { numberFormats } from "../../../constants/data";
import { primary, success, warning } from "../../../constants/colors";
import { spacing } from '../../../constants/spacing';
import type { PieDataPoint } from "../../../types/types";
import { Box } from "../../Layout/Box/Box";
import { Group } from "../../Layout/Group/Group";
import type { PieChartProps } from "./PieChart";
import { PieChart } from "./PieChart";

const samplePieData: PieDataPoint[] = [
	{ key: "Product A", value: 45, color: primary[200] },
	{ key: "Product B", value: 30, color: success[200] },
	{ key: "Product C", value: 25, color: warning[200] },
];

const meta: Meta<PieChartProps> = {
	title: "Components/Data/PieChart",
	component: PieChart,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A pie / donut chart built on Recharts. Slice values are formatted with `getChartFormatter` via the `format` prop (key of `numberFormats`). Optional `centerContent` renders a label in the donut hole. `paddingAngle` defaults to `0` (no gap between slices); increase it for separation. Use a parent with a definite height when `height` is `'100%'` (see stories).",
			},
		},
	},
	argTypes: {
		data: {
			control: { type: "object" },
			description: "PieDataPoint[] — key, value, optional color per slice",
			table: { type: { summary: "PieDataPoint[]" } },
		},
		format: {
			control: { type: "select" },
			options: Object.keys(numberFormats) as (keyof typeof numberFormats)[],
			description: "Format key for tooltip and optional center value",
			table: {
				type: { summary: "keyof typeof numberFormats" },
				defaultValue: { summary: "'percentage'" },
			},
		},
		height: {
			control: { type: "text" },
			description: "Chart height (CSS length or number); loading and empty states match this height",
			table: {
				type: { summary: "string | number" },
				defaultValue: { summary: "'100%'" },
			},
		},
		showLegend: {
			control: { type: "boolean" },
			description: "Show Recharts legend below the chart",
			table: { defaultValue: { summary: "true" } },
		},
		loading: {
			control: { type: "boolean" },
			description: "Placeholder state while data is loading",
			table: { defaultValue: { summary: "false" } },
		},
		innerRadius: {
			control: { type: "number" },
			description: "Inner radius in px (larger = more donut, 0 = pie)",
			table: { defaultValue: { summary: "80" } },
		},
		outerRadius: {
			control: { type: "number" },
			description: "Outer radius in px",
			table: { defaultValue: { summary: "100" } },
		},
		paddingAngle: {
			control: { type: "number" },
			description:
				"Angular gap between slices in degrees (Recharts `Pie` `paddingAngle`). Default **0** — slices touch; increase for visible separation.",
			table: { defaultValue: { summary: "0" } },
		},
		centerContent: {
			control: { type: "object" },
			description: "Optional center: title, subtitle, value",
			table: { type: { summary: "PieCardCenterContentProps" } },
		},
	},
};

export default meta;
type Story = StoryObj<PieChartProps>;

export const Default: Story = {
	args: {
		data: samplePieData,
		format: "percentage",
		height: "100%",
		showLegend: true,
		loading: false,
	},
	render: (args) => (
		<Box w="100%" maw={480} h={360}>
			<PieChart {...args} />
		</Box>
	),
};

export const Formats: Story = {
	render: () => (
		<Group
			align="flex-start"
			gap={spacing.lg}
			styles={{ root: { flexWrap: "wrap" } }}
		>
			{(
				["integer", "decimal", "currency", "percentage", "multiple"] as const
			).map((fmt) => (
				<Box key={fmt} w={400} h={400}>
					<PieChart
						data={samplePieData}
						format={fmt}
						height="100%"
						showLegend={false}
					/>
				</Box>
			))}
		</Group>
	),
};

export const WithCenterContent: Story = {
	render: () => (
		<Box w="100%" maw={480} h={360}>
			<PieChart
				data={samplePieData}
				format="percentage"
				height="100%"
				centerContent={{
					value: 100,
					title: "Share",
					subtitle: "Q1 2026",
				}}
			/>
		</Box>
	),
};

export const DonutGeometry: Story = {
	render: () => (
		<Group
			align="flex-start"
			gap={spacing.lg}
			styles={{ root: { flexWrap: "wrap" } }}
		>
			<Box w={400} h={400}>
				<PieChart
					data={samplePieData}
					format="percentage"
					height="100%"
					innerRadius={0}
					outerRadius={100}
					showLegend={false}
				/>
			</Box>
			<Box w={400} h={400}>
				<PieChart
					data={samplePieData}
					format="percentage"
					height="100%"
					innerRadius={80}
					outerRadius={100}
					showLegend={false}
				/>
			</Box>
		</Group>
	),
};

export const PaddingAngle: Story = {
	name: "Slice gaps (paddingAngle)",
	parameters: {
		docs: {
			description: {
				story:
					"The component defaults **`paddingAngle` to `0`**, so slices meet with no gap. Pass a positive value (degrees) when you want separation between segments—the background shows through in those gaps.",
			},
		},
	},
	render: () => (
		<Group
			align="flex-start"
			gap={spacing.lg}
			styles={{ root: { flexWrap: "wrap" } }}
		>
			<Box w={400} h={400}>
				<PieChart
					data={samplePieData}
					format="percentage"
					height="100%"
					paddingAngle={0}
					showLegend={false}
				/>
			</Box>
			<Box w={400} h={400}>
				<PieChart
					data={samplePieData}
					format="percentage"
					height="100%"
					paddingAngle={8}
					showLegend={false}
				/>
			</Box>
		</Group>
	),
};

export const WithoutLegend: Story = {
	render: () => (
		<Box w="100%" h={320}>
			<PieChart
				data={samplePieData}
				format="percentage"
				height="100%"
				showLegend={false}
			/>
		</Box>
	),
};

export const Loading: Story = {
	render: () => (
		<Box w="100%" h={300}>
			<PieChart data={samplePieData} format="percentage" height="100%" loading />
		</Box>
	),
};

export const Empty: Story = {
	render: () => (
		<Box w="100%" h={300}>
			<PieChart data={[]} format="percentage" height="100%" />
		</Box>
	),
};
