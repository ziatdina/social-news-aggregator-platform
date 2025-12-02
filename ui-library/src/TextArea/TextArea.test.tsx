import { render, screen, fireEvent } from '@testing-library/react'

import { TextArea } from './TextArea'

describe('Компонент TextArea', () => {
  test('отображает textarea элемент на странице', () => {
    render(<TextArea />)
    const textarea = screen.getByRole('textbox')

    expect(textarea).toBeInTheDocument()
  })

  test('отображает переданный placeholder', () => {
    render(<TextArea placeholder="Введите ваш текст" />)
    const textarea = screen.getByPlaceholderText('Введите ваш текст')

    expect(textarea).toBeInTheDocument()
  })

  test('отображает переданное значение value', () => {
    const handleChange = jest.fn()

    render(<TextArea value="Пример текста" onChange={handleChange} />)
    const textarea = screen.getByDisplayValue('Пример текста')

    expect(textarea).toBeInTheDocument()
  })

  test('использует значения по умолчанию', () => {
    render(<TextArea />)
    const textarea = screen.getByRole('textbox')
    
    expect(textarea).toHaveValue('')
    expect(textarea).not.toBeDisabled()
    expect(textarea).toHaveAttribute('rows', '2')
  })

  test('применяет переданное количество rows', () => {
    render(<TextArea rows={5} />)
    const textarea = screen.getByRole('textbox')

    expect(textarea).toHaveAttribute('rows', '5')
  })

  test('отображает заблокированный textarea когда disabled=true', () => {
    render(<TextArea disabled />)
    const textarea = screen.getByRole('textbox')

    expect(textarea).toBeDisabled()
  })

  test('вызывает обработчик onChange при вводе текста', () => {
    const handleChange = jest.fn()

    render(<TextArea onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')

    fireEvent.change(textarea, { target: { value: 'Новый текст' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  test('применяет правильный CSS класс', () => {
    render(<TextArea />)
    const textarea = screen.getByRole('textbox')

    expect(textarea).toHaveClass('textarea')
  })

  test('корректно обрабатывает комбинацию всех props', () => {
    const handleChange = jest.fn()
    
    render(
      <TextArea
        placeholder="Оставьте комментарий"
        value="Текущий комментарий"
        rows={4}
        disabled
        onChange={handleChange}
      />
    )
    
    const textarea = screen.getByPlaceholderText('Оставьте комментарий')
    
    expect(textarea).toHaveAttribute('placeholder', 'Оставьте комментарий')
    expect(textarea).toHaveValue('Текущий комментарий')
    expect(textarea).toHaveAttribute('rows', '4')
    expect(textarea).toBeDisabled()
    expect(textarea).toHaveClass('textarea')
    
    fireEvent.change(textarea, { target: { value: 'Новый комментарий' } })
  })

  test('работает без placeholder', () => {
    render(<TextArea />)
    const textarea = screen.getByRole('textbox')

    expect(textarea).toBeInTheDocument()
  })

  test('позволяет вводить текст когда не заблокирован', () => {
    const handleChange = jest.fn()
    
    render(<TextArea onChange={handleChange} />)
    
    const textarea = screen.getByRole('textbox')

    fireEvent.change(textarea, { target: { value: 'Введенный текст' } })
    
    expect(handleChange).toHaveBeenCalled()
  })

  test('сохраняет пустое значение по умолчанию', () => {
    render(<TextArea />)
    const textarea = screen.getByRole('textbox')

    expect(textarea).toHaveValue('')
  })
})