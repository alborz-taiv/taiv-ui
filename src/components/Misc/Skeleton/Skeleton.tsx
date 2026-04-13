import {
	Skeleton as MantineSkeleton,
	type SkeletonProps as MantineSkeletonProps,
} from "@mantine/core";

export interface SkeletonProps extends MantineSkeletonProps {}

export const Skeleton = ({ ...props }: SkeletonProps) => {
	return <MantineSkeleton {...props} />;
};
