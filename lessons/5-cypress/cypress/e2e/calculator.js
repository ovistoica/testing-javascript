describe('anonymous calculator', () => {
  it('can make calculations', () => {
    const user = cy
    user.visit('/')
    user.findByText(/^1$/).click()
    user.findByText(/^\+$/).click()
    user.findByText(/^2$/).click()
    user.findByText(/^=$/).click()
    user.findByTestId('total').should('have.text', '3')
  })
})
