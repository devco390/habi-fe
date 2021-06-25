import { Story, Meta } from '@storybook/react/types-6-0'
import Logo from '.'

export default {
  title: 'Logo',
  component: Logo
} as Meta

const Template = (args: any) => <Logo {...args}></Logo>

export const Default: Story<any> = Template.bind({})
Default.args = {}
