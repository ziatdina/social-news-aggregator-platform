import { render, screen, fireEvent } from '@testing-library/react'

import { Button } from './Button'

describe('Компонент Button', () => {
  test('отображает кнопку с переданным текстом', () => {
    render(<Button>Кнопка</Button>)
    const button = screen.getByRole('button', { name: /кнопка/i })

    expect(button).toBeInTheDocument()
  })

  test('применяет правильные классы для разных вариантов кнопки', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)

    expect(screen.getByRole('button')).toHaveClass('primary')

    rerender(<Button variant="secondary">ВSecondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('secondary')

    rerender(<Button variant="danger">Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('danger')
  })

  test('применяет правильные классы для разных размеров кнопки', () => {
    const { rerender } = render(<Button size="small">Small</Button>)

    expect(screen.getByRole('button')).toHaveClass('small')

    rerender(<Button size="medium">Medium</Button>)
    expect(screen.getByRole('button')).toHaveClass('medium')

    rerender(<Button size="large">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('large')
  })

  test('устанавливает правильный атрибут type', () => {
    render(<Button type="submit">Отправить</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  test('использует значения по умолчанию когда props не переданы', () => {
    render(<Button>Кнопка</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toHaveAttribute('type', 'button') 
    expect(button).toHaveClass('primary') 
    expect(button).toHaveClass('medium') 
    expect(button).not.toBeDisabled() 
  })

  test('отображает заблокированную кнопку когда disabled = true', () => {
    render(<Button disabled>Заблокирована</Button>)
    const button = screen.getByRole('button')
    
    expect(button).toBeDisabled() 
    expect(button).toHaveAttribute('disabled') 
  })

  test('вызывает обработчик onClick при клике', () => {
    const handleClick = jest.fn() // создаем mock-функцию

    render(<Button onClick={handleClick}>Нажми на кнопку</Button>)
    
    const button = screen.getByRole('button')

    fireEvent.click(button) // имитируем клик пользователя
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('не вызывает onClick когда кнопка заблокирована', () => {
    const handleClick = jest.fn()

    render(
      <Button onClick={handleClick} disabled>
        Заблокирована
      </Button>
    )
    
    const button = screen.getByRole('button')

    fireEvent.click(button)
    
    expect(handleClick).not.toHaveBeenCalled() // проверяем что функция не вызвана
  })

  test('отображает сложное содержимое с React элементами', () => {
    render(
      <Button>
        <span>🎯</span> Текст с иконкой
      </Button>
    )
    
    const button = screen.getByRole('button')

    expect(button).toHaveTextContent('🎯 Текст с иконкой') 
    expect(button.querySelector('span')).toBeInTheDocument() 
  })

  test('корректно обрабатывает комбинацию всех props', () => {
    const handleClick = jest.fn()
    
    render(
      <Button
        type="submit"
        variant="danger"
        size="large"
        disabled
        onClick={handleClick}
      >
        Опасная кнопка
      </Button>
    )
    
    const button = screen.getByRole('button')
    
    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toHaveClass('danger')
    expect(button).toHaveClass('large')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Опасная кнопка')
    
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
})