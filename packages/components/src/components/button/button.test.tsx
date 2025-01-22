import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import { Button } from './button'

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDefined()
    expect(button.textContent).toBe('Click me')
  })

  it('should handle click events', async () => {
    const handleClick = vi.fn()
    const { user } = render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole('button')
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should apply variant classes correctly', () => {
    render(<Button variant="default">Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-primary-600')
  })

  it('should apply size classes correctly', () => {
    render(<Button size="sm">Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('h-8')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('disabled')
  })

  it('should merge custom className with default classes', () => {
    render(<Button className="custom-class">Button</Button>)
    const button = screen.getByRole('button')
    expect(button.className).toContain('custom-class')
    expect(button.className).toContain('inline-flex')
  })
})
