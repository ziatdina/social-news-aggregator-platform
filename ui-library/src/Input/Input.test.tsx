import { render, screen, fireEvent } from '@testing-library/react'

import { Input } from './Input'

describe('Компонент Input', () => {
  test('отображает input элемент на странице', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })

  test('корректно применяет разные типы input', () => {
    const { rerender } = render(<Input type="text" />)
    const textInput = screen.getByRole('textbox')

    expect(textInput).toHaveAttribute('type', 'text')

    rerender(<Input type="email" />)
    const emailInput = screen.getByRole('textbox')

    expect(emailInput).toHaveAttribute('type', 'email')

    // Тестируем password input - ищем по атрибуту type
    rerender(<Input type="password" />)
    const passwordInput = document.querySelector('input[type="password"]')

    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('отображает переданный placeholder', () => {
    render(<Input placeholder="Введите текст" />)
    const input = screen.getByPlaceholderText('Введите текст')

    expect(input).toBeInTheDocument()
  })

  test('отображает переданное значение value с onChange', () => {
    const handleChange = jest.fn()

    render(<Input value="тестовое значение" onChange={handleChange} />)
    const input = screen.getByDisplayValue('тестовое значение')

    expect(input).toBeInTheDocument()
  })

  test('использует значения по умолчанию когда props не переданы', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    
    expect(input).toHaveAttribute('type', 'text')
    expect(input).not.toBeDisabled()
    expect(input).toHaveValue('')
  })

  test('отображает заблокированный input когда disabled=true', () => {
    render(<Input disabled />)
    const input = screen.getByRole('textbox')
    
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute('disabled')
  })

  test('вызывает обработчик onChange при вводе текста', () => {
    const handleChange = jest.fn()

    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'новый текст' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('применяет правильный CSS класс к input', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveClass('input')
  })

  test('корректно обрабатывает комбинацию всех props', () => {
    const handleChange = jest.fn()
    
    render(
      <Input
        type="email"
        placeholder="Введите email"
        value="test@example.com"
        disabled
        onChange={handleChange}
      />
    )
    
    const input = screen.getByPlaceholderText('Введите email')
    
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('placeholder', 'Введите email')
    expect(input).toHaveValue('test@example.com')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('input')
    
    fireEvent.change(input, { target: { value: 'new@example.com' } })
  })

  test('работает без placeholder', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })

  test('позволяет вводить текст когда не заблокирован', () => {
    const handleChange = jest.fn()
    
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'тестовый ввод' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  test('отображает input с пустым значением по умолчанию', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveValue('')
  })
})