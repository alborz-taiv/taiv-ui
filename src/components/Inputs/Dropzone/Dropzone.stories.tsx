import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconCloudUpload, IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE, PDF_MIME_TYPE } from './Dropzone';
import { Group } from '../../Layout/Group/Group';
import { Stack } from '../../Layout/Stack/Stack';
import { Text } from '../../Typography/Text/Text';
import { Title } from '../../Typography/Title/Title';
import { error, neutral, primary } from '../../../constants/colors';
import { spacing } from '../../../constants/spacing';

const meta: Meta<typeof Dropzone> = {
  title: 'Components/Inputs/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '[View Mantine Docs](https://v6.mantine.dev/others/dropzone/)\n\nDropzone captures files via click or drag-and-drop. It extends Mantine v6\'s `Dropzone` with Taiv styling: Poppins font, dashed neutral border, `primary[25]` fill on accept, `error[25]` fill on reject.\n\nUse `Dropzone.Accept`, `Dropzone.Reject`, and `Dropzone.Idle` inside children to show different content per state.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '520px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onDrop: {
      action: 'files dropped',
      description: 'Called with valid files',
      table: { type: { summary: '(files: FileWithPath[]) => void' } },
    },
    onReject: {
      action: 'files rejected',
      description: 'Called with rejected files (wrong type, too large, etc.)',
      table: { type: { summary: '(rejections: FileRejection[]) => void' } },
    },
    accept: {
      control: false,
      description: 'File MIME types to accept. Use the exported `IMAGE_MIME_TYPE`, `PDF_MIME_TYPE`, etc.',
      table: { type: { summary: 'Accept | string[]' } },
    },
    maxSize: {
      control: { type: 'number' },
      description: 'Maximum file size in bytes',
      table: { type: { summary: 'number' } },
    },
    maxFiles: {
      control: { type: 'number' },
      description: 'Max number of files',
      table: { type: { summary: 'number' } },
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Allow selecting multiple files',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Display a loading overlay',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the dropzone',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const StateContent = () => (
  <Group position='center' spacing={spacing.xl} style={{ minHeight: 120, pointerEvents: 'none' }}>
    <Dropzone.Accept>
      <IconUpload size={48} color={primary[200]} />
    </Dropzone.Accept>
    <Dropzone.Reject>
      <IconX size={48} color={error[200]} />
    </Dropzone.Reject>
    <Dropzone.Idle>
      <IconCloudUpload size={48} color={neutral[200]} />
    </Dropzone.Idle>
    <Stack spacing={spacing.xxs}>
      <Title variant='cardHeader'>Drop files here or click to browse</Title>
      <Text variant='subtle'>Attach as many files as you like, each up to 5 MB</Text>
    </Stack>
  </Group>
);

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    maxSize: 5 * 1024 ** 2,
    onDrop: (files) => console.log('dropped', files),
    onReject: (rejections) => console.log('rejected', rejections),
  },
  render: (args) => (
    <Dropzone {...args}>
      <StateContent />
    </Dropzone>
  ),
};

// ─── Image uploads only ──────────────────────────────────────────────────────

export const ImagesOnly: Story = {
  render: () => (
    <Dropzone accept={IMAGE_MIME_TYPE} maxSize={5 * 1024 ** 2} onDrop={() => {}}>
      <Group position='center' spacing={spacing.xl} style={{ minHeight: 120, pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload size={48} color={primary[200]} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX size={48} color={error[200]} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto size={48} color={neutral[200]} />
        </Dropzone.Idle>
        <Stack spacing={spacing.xxs}>
          <Title variant='cardHeader'>Upload images</Title>
          <Text variant='subtle'>PNG, JPG, GIF, WEBP — up to 5 MB each</Text>
        </Stack>
      </Group>
    </Dropzone>
  ),
  parameters: {
    docs: {
      description: { story: 'Restrict accepted files with `accept={IMAGE_MIME_TYPE}`. MIME-type presets are re-exported from `@taiv/ui`.' },
    },
  },
};

// ─── PDFs only ───────────────────────────────────────────────────────────────

export const PdfsOnly: Story = {
  render: () => (
    <Dropzone accept={PDF_MIME_TYPE} maxFiles={1} onDrop={() => {}}>
      <StateContent />
    </Dropzone>
  ),
};

// ─── Loading state ───────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true, onDrop: () => {} },
  render: (args) => (
    <Dropzone {...args}>
      <StateContent />
    </Dropzone>
  ),
};

// ─── Disabled state ──────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true, onDrop: () => {} },
  render: (args) => (
    <Dropzone {...args}>
      <StateContent />
    </Dropzone>
  ),
};

// ─── With captured file list ─────────────────────────────────────────────────

export const WithFileList: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <Stack spacing={spacing.md}>
        <Dropzone onDrop={setFiles} maxSize={5 * 1024 ** 2}>
          <StateContent />
        </Dropzone>
        {files.length > 0 && (
          <Stack spacing={spacing.xxs}>
            <Text variant='label'>{files.length} file(s) selected</Text>
            {files.map((f, i) => (
              <Text key={i} variant='subtle'>
                {f.name} — {(f.size / 1024).toFixed(1)} KB
              </Text>
            ))}
          </Stack>
        )}
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: { story: 'Typical usage pattern — hold dropped files in local state and render them below.' },
      source: { code: false },
    },
  },
};
