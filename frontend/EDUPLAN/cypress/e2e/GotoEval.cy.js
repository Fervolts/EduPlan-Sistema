describe('Flujo de inicio de sesión, navegación y verificación de evaluaciones', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login');
    });
  
    it('Inicio de sesión exitoso y navegación a evaluaciones', () => {
      // ==================== Inicio de sesión ====================
      cy.get('[data-testid=input-usuario]').type('AdolfoAdmin');
      cy.get('[data-testid=input-contrasena]').type('123456');
  
      cy.intercept('POST', 'http://localhost:3000/api/login/administrador', {
        statusCode: 200,
        body: { token: 'fake-token', userId: '1' },
      }).as('loginRequest');
  
      cy.get('[data-testid=submit-button]').click();
  
      // ==================== Navegación del dashboard ====================
      cy.url().should('include', '/dashboard');
  
      // Encontrar el elemento de evaluaciones y verificar el hover
      cy.get('.dashboard-box')
        .contains('Evaluaciones')
      // Hacer clic en el elemento de evaluaciones
      cy.get('.dashboard-box').contains('Evaluaciones').click();
  
      // ==================== Llegada a Evaluaciones ====================
      cy.url().should('include', '/evaluaciones');
  
      // Realizar una solicitud a la API para obtener las evaluaciones
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/evaluaciones',
       
      }).then((response) => {
        const evaluaciones = response.body;
  
        // Verificar que se hayan obtenido las evaluaciones
        expect(evaluaciones).to.have.length.greaterThan(0);
  
        // Verificar que los datos de las evaluaciones sean correctos
        evaluaciones.forEach((evaluacion) => {
          expect(evaluacion.descripcion).to.exist;
          expect(evaluacion.fecha_limite).to.exist;
          // ... otras aserciones
        });
      });
    });
  });