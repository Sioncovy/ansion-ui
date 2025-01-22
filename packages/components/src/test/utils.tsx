import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'

function customRender(ui: ReactElement, options = {}) {
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: ({ children }) => children,
      ...options
    })
  }
}

export * from '@testing-library/react'
export { customRender as render }
