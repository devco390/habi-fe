import { Story, Meta } from '@storybook/react/types-6-0'
import ButtonLogin from '.'

export default {
  title: 'ButtonLogin',
  component: ButtonLogin
} as Meta

const Template = (args: any) => <ButtonLogin {...args}></ButtonLogin>

export const Default: Story<any> = Template.bind({})
Default.args = {}
