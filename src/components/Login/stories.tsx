import { Story, Meta } from '@storybook/react/types-6-0'
import Login from '.'

export default {
  title: 'Login',
  component: Login
} as Meta

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any) => <Login {...args}></Login>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Default: Story<any> = Template.bind({})
Default.args = {}
