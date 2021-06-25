import { Story, Meta } from '@storybook/react/types-6-0'
import Loader, { LoaderProps } from '.'

export default {
  title: 'Loader',
  component: Loader
} as Meta

const Template = (args: LoaderProps) => <Loader {...args}></Loader>

export const Default: Story<LoaderProps> = Template.bind({})
Default.args = { loading: true }
