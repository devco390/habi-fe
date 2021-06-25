import { render, screen } from 'utils/test-utils'

import Loader from '.'

describe('<Loader />', () => {
  it('If loading is true then it should not show the component', () => {
    render(<Loader loading={true} />)

    const wrapperLoader = screen.queryByTestId('loader-wrapper')
    expect(wrapperLoader).toBeInTheDocument()
  })
})
