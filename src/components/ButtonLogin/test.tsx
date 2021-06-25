import { render, screen } from 'utils/test-utils'

import ButtonLogin from '.'

describe('<ButtonLogin />', () => {
  it('should render the heading', () => {
    const { container } = render(<ButtonLogin />)

    expect(
      screen.getByRole('heading', { name: /ButtonLogin/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
