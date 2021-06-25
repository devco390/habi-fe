import { Story, Meta } from '@storybook/react/types-6-0'
import Skeleton, { SkeletonProps, SkeletonTypes } from '.'

export default {
  title: 'Skeleton',
  component: Skeleton
} as Meta

const Template = (args: SkeletonProps) => (
  <div
    style={{
      width: '100%',
      height: '200px',
      minHeight: '400px'
    }}
  >
    <Skeleton {...args}></Skeleton>
  </div>
)

const DefaultArgs = {
  type: 'card' as SkeletonTypes
}

export const Default: Story<SkeletonProps> = Template.bind({})
Default.args = DefaultArgs
