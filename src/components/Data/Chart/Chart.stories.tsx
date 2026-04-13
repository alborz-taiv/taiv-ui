import type { Meta, StoryObj } from "@storybook/react-vite";
import { formats } from "../../../constants/data";
import { primary, success, warning } from "../../../constants/colors";
import { spacing } from '../../../constants/spacing';
import type { ChartSeries } from "../../../types/types";
import { Box } from "../../Layout/Box/Box";
import { Group } from "../../Layout/Group/Group";
import { Stack } from "../../Layout/Stack/Stack";
import type { ChartProps } from "./Chart";
import { Chart } from "./Chart";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const sampleLineSeries: ChartSeries[] = [
	{
		name: "Units sold",
		type: "line",
		data: months.map((m, i) => ({ key: m, value: 100 + i * 25 })),
		color: primary[200],
	},
];

const sampleAreaSeries: ChartSeries[] = [
	{
		name: "Revenue",
		type: "area",
		data: months.map((m, i) => ({ key: m, value: 1200 + i * 180 })),
		color: primary[200],
	},
];

const sampleBarSeries: ChartSeries[] = [
	{
		name: "Orders",
		type: "bar",
		data: months.map((m, i) => ({ key: m, value: 42 + i * 8 })),
		color: success[200],
	},
];

const sampleMultiSeries: ChartSeries[] = [
	{
		name: "Product A",
		type: "line",
		data: months.map((m, i) => ({ key: m, value: 120 + i * 20 })),
		color: primary[200],
	},
	{
		name: "Product B",
		type: "line",
		data: months.map((m, i) => ({ key: m, value: 80 + i * 15 })),
		color: success[200],
	},
];

const sampleMixedSeries: ChartSeries[] = [
	{
		name: "Actuals",
		type: "bar",
		data: months.map((m, i) => ({ key: m, value: 55 + i * 6 })),
		color: primary[200],
	},
	{
		name: "Target",
		type: "line",
		data: months.map((m, i) => ({ key: m, value: 50 + i * 7 })),
		color: warning[200],
	},
];

const meta: Meta<ChartProps> = {
	title: "Components/Data/Chart",
	component: Chart,
	parameters: {
		layout: "padded",
		docs: {
			description: {
				component:
					"A composed chart (line, area, bar) built on Recharts with shared X/Y axes, tooltips, and optional legend. `yAxisFormat` and `xAxisFormat` accept either a `formats` key string (e.g. `'currency'`) or `{ format, options? }` for `decimalPlaces` / `truncateAt`; the chart normalizes both via an internal `parseFormat` before calling `getChartFormatter`.",
			},
		},
	},
	argTypes: {
		series: {
			control: { type: "object" },
			description:
				"ChartSeries[] — each series: name, data (DataPoint[]), optional color and type (line | area | bar)",
			table: { type: { summary: "ChartSeries[]" } },
		},
		yAxisFormat: {
			control: { type: "select" },
			options: Object.keys(formats) as (keyof typeof formats)[],
			description:
				"Format key string (default formatting) or pass `{ format, options }` in code for `decimalPlaces` / `truncateAt`. Tooltip values use the Y formatter.",
			table: {
				type: { summary: "ChartFormat | AxisFormat" },
				defaultValue: { summary: "'decimal'" },
			},
		},
		xAxisFormat: {
			control: { type: "select" },
			options: Object.keys(formats) as (keyof typeof formats)[],
			description:
				"Format key string or `{ format, options }`. Use `string` for categorical X keys; numeric `formats` when keys parse as numbers.",
			table: {
				type: { summary: "ChartFormat | AxisFormat" },
				defaultValue: { summary: "'string'" },
			},
		},
		height: {
			control: { type: "text" },
			description: "Chart height (CSS length or number)",
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
	},
};

export default meta;
type Story = StoryObj<ChartProps>;

export const Default: Story = {
	args: {
		series: sampleLineSeries,
		yAxisFormat: "decimal",
		xAxisFormat: "string",
		height: "100%",
		showLegend: true,
		loading: false,
	},
	render: (args) => (
		<Box w="100%" maw={720} h={360}>
			<Chart {...args} />
		</Box>
	),
};

export const SeriesTypes: Story = {
	render: () => (
		<Stack gap={spacing.xl}>
			<Box w="100%" h={280}>
				<Chart series={sampleLineSeries} height="100%" yAxisFormat="integer" />
			</Box>
			<Box w="100%" h={280}>
				<Chart series={sampleAreaSeries} height="100%" yAxisFormat="currency" />
			</Box>
			<Box w="100%" h={280}>
				<Chart series={sampleBarSeries} height="100%" yAxisFormat="integer" />
			</Box>
		</Stack>
	),
};

export const MultiSeries: Story = {
	render: () => (
		<Box w="100%" h={320}>
			<Chart series={sampleMultiSeries} height="100%" yAxisFormat="decimal" />
		</Box>
	),
};

export const MixedBarAndLine: Story = {
	render: () => (
		<Box w="100%" h={320}>
			<Chart series={sampleMixedSeries} height="100%" yAxisFormat="integer" />
		</Box>
	),
};

export const YAxisFormats: Story = {
	render: () => (
		<Group
			align="flex-start"
			gap={spacing.lg}
			styles={{ root: { flexWrap: "wrap" } }}
		>
			{(
				["integer", "decimal", "currency", "percentage", "multiple"] as const
			).map((fmt) => (
				<Box key={fmt} w={280} h={220}>
					<Chart
						series={sampleLineSeries}
						height="100%"
						yAxisFormat={fmt}
						showLegend={false}
					/>
				</Box>
			))}
		</Group>
	),
};

export const YAxisDecimalPlaces: Story = {
	render: () => (
		<Group
			align="flex-start"
			gap={spacing.lg}
			styles={{ root: { flexWrap: "wrap" } }}
		>
			{([1, 2, 3] as const).map((dp) => (
				<Box key={dp} w={280} h={220}>
					<Chart
						series={sampleLineSeries}
						height="100%"
						yAxisFormat={{ format: "decimal", options: { decimalPlaces: dp } }}
						showLegend={false}
					/>
				</Box>
			))}
		</Group>
	),
};

const largeValueSeries: ChartSeries[] = [
	{
		name: "Volume",
		type: "line",
		data: [
			{ key: "Q1", value: 850 },
			{ key: "Q2", value: 4200 },
			{ key: "Q3", value: 1550000 },
			{ key: "Q4", value: 2100000 },
		],
		color: primary[200],
	},
];

export const YAxisTruncation: Story = {
	render: () => (
		<Group
			align="flex-start"
			gap={spacing.lg}
			styles={{ root: { flexWrap: "wrap" } }}
		>
			<Box w={280} h={220}>
				<Chart
					series={largeValueSeries}
					height="100%"
					yAxisFormat={{
						format: "decimal",
						options: { truncateAt: "thousand" },
					}}
					showLegend={false}
				/>
			</Box>
			<Box w={280} h={220}>
				<Chart
					series={largeValueSeries}
					height="100%"
					yAxisFormat={{
						format: "decimal",
						options: { truncateAt: "million" },
					}}
					showLegend={false}
				/>
			</Box>
		</Group>
	),
};

const numericKeySeries: ChartSeries[] = [
	{
		name: "Score",
		type: "bar",
		data: [
			{ key: "1000", value: 12 },
			{ key: "2500", value: 24 },
			{ key: "5000", value: 18 },
			{ key: "10000", value: 30 },
		],
		color: success[200],
	},
];

export const XAxisNumericFormats: Story = {
	render: () => (
		<Group
			align="flex-start"
			gap={spacing.lg}
			styles={{ root: { flexWrap: "wrap" } }}
		>
			<Box w={280} h={220}>
				<Chart
					series={numericKeySeries}
					height="100%"
					xAxisFormat="integer"
					yAxisFormat="integer"
					showLegend={false}
				/>
			</Box>
			<Box w={280} h={220}>
				<Chart
					series={numericKeySeries}
					height="100%"
					xAxisFormat={{ format: "currency", options: { decimalPlaces: 0 } }}
					yAxisFormat="integer"
					showLegend={false}
				/>
			</Box>
			<Box w={280} h={220}>
				<Chart
					series={numericKeySeries}
					height="100%"
					xAxisFormat={{
						format: "decimal",
						options: { truncateAt: "thousand" },
					}}
					yAxisFormat="integer"
					showLegend={false}
				/>
			</Box>
		</Group>
	),
};

export const WithoutLegend: Story = {
	render: () => (
		<Box w="100%" h={300}>
			<Chart series={sampleMultiSeries} height="100%" showLegend={false} />
		</Box>
	),
};

export const Loading: Story = {
	render: () => (
		<Box w="100%" h={300}>
			<Chart series={sampleLineSeries} height="100%" loading />
		</Box>
	),
};

export const Empty: Story = {
	render: () => (
		<Box w="100%" h={300}>
			<Chart
				series={[{ name: "Empty", data: [], color: primary[200] }]}
				height="100%"
			/>
		</Box>
	),
};
