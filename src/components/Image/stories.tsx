import { Story, Meta } from '@storybook/react/types-6-0'
import Image from '.'

export default {
  title: 'Image',
  component: Image
} as Meta

const imageUrl = '/icons/apple-touch-icon.png'

const Template = () => (
  <div
    style={{
      width: '100%'
    }}
  >
    <Image src={imageUrl} width={192} height={182} quality={25} />
  </div>
)

const defaultArgs = {}

export const Default: Story = Template.bind({})
Default.args = defaultArgs
