import { Story, Meta } from '@storybook/react/types-6-0'
import Login from '.'

export default {
  title: 'Login',
  component: Login
} as Meta

const Template = (args: any) => <Login {...args}></Login>

export const Default: Story<any> = Template.bind({})
Default.args = {}
