import { Story, Meta } from '@storybook/react/types-6-0'
import Dashboard from '.'

export default {
  title: 'Dashboard',
  component: Dashboard
} as Meta

const Template = (args: any) => <Dashboard {...args}></Dashboard>

export const Default: Story<any> = Template.bind({})
Default.args = {}
