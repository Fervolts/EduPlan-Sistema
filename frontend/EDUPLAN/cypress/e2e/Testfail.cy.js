describe('Pruebas de inicio de sesión con errores', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login'); // Ajusta la URL según tu aplicación
    });
  
    it('Debe mostrar un mensaje de error al ingresar credenciales incorrectas', () => {
      // Ingresamos credenciales incorrectas
      cy.get('[data-testid=input-usuario]').type('usuarioIncorrecto');
      cy.get('[data-testid=input-contrasena]').type('contrasenaIncorrecta');
      cy.get('[data-testid=submit-button]').click();
  
      // Verificamos que se muestre un mensaje de error
      cy.contains('Error al iniciar sesión. Por favor, intenta nuevamente.').should('be.visible');
    });
  
    it('Debe mostrar un mensaje de error al dejar campos vacíos', () => {
      // Dejamos los campos vacíos
      cy.get('[data-testid=submit-button]').click();
  
      // Verificamos que se muestre un mensaje de error
      cy.contains('El campo usuario es obligatorio').should('be.visible');
      cy.contains('El campo contraseña es obligatorio').should('be.visible');
    });
  });