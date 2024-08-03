describe('Login and Modal Interaction', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login'); // Ajusta la ruta según la configuración de tu proyecto
    });
  
    it('should display validation errors for empty required fields', () => {
      // Intenta enviar el formulario vacío
      cy.get('[data-testid=submit-button]').click();
  
      // Verifica que los mensajes de error aparezcan
      cy.get('[data-testid=error-usuario]').should('be.visible');
      cy.get('[data-testid=error-contrasena]').should('be.visible');
    });
  
    it('should display an error modal for incorrect login credentials', () => {
      // Llena los campos con credenciales incorrectas
      cy.get('[data-testid=input-usuario]').type('PedroGonzalez');
      cy.get('[data-testid=input-contrasena]').type('Pedro123456');
  
      // Intercepta la solicitud de login para simular una respuesta fallida
      cy.intercept('POST', 'http://localhost:3000/api/login/estudiante', {
        statusCode: 401,
        body: { error: 'Invalid credentials' },
      }).as('loginRequest');
  
      // Intenta enviar el formulario
      cy.get('[data-testid=submit-button]').click();
  
      // Verifica que el modal de error aparezca
      cy.contains('Error').should('be.visible');
      cy.contains('Error al iniciar sesión. Por favor, intenta nuevamente.').should('be.visible');
  
    // Cierra el modal 
    cy.get('[data-testid=close-modal]').click();

    // Verifica que el modal se haya cerrado
    cy.get('[data-testid=modal]').should('not.exist');
  });
  
    it('should display a success modal and navigate on successful login', () => {
      // Llena los campos con credenciales correctas
      cy.get('[data-testid=input-usuario]').type('AdolfoAdmin');
      cy.get('[data-testid=input-contrasena]').type('123456');
  
      // Intercepta la solicitud de login para simular una respuesta exitosa
      cy.intercept('POST', 'http://localhost:3000/api/login/administrador', {
        statusCode: 200,
        body: { token: 'fake-token', userId: '1' },
      }).as('loginRequest');
  
      // Intenta enviar el formulario
      cy.get('[data-testid=submit-button]').click();
  
      // // Verifica que el modal de éxito aparezca
      // cy.contains('Inicio de sesión exitoso').should('be.visible');
      // cy.contains('¡Has iniciado sesión exitosamente!').should('be.visible');
  
      // // Verifica que la redirección ocurra después de 2 segundos
      // cy.wait(2000);
      // cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  });
  