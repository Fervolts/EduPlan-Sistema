describe('Registro Estudiante Form', () => {
  beforeEach(() => {
    // Visita la página de inicio de sesión
    cy.visit('http://localhost:5173/login');
    
    // Llena los campos de inicio de sesión y envía el formulario
    cy.get('[data-testid=input-usuario]').type('AdolfoAdmin');
    cy.get('[data-testid=input-contrasena]').type('123456');
    cy.get('[data-testid=submit-button]').click();
    
    // Espera a que la redirección ocurra
    cy.url().should('include', '/dashboard'); // Suponiendo que la redirección es a la página principal

    // Luego visita la página de registro de estudiantes
    cy.visit('http://localhost:5173/registroEstudiante');
  });

  it('Debe mostrar errores de validación para los campos obligatorios vacíos', () => {
    // Intenta enviar el formulario vacío
    cy.get('button[type=submit]').click();

  // Desplazarse hasta los elementos antes de verificar
  cy.get('label').contains('El campo nombres es obligatorio').scrollIntoView().should('be.visible');
  cy.get('label').contains('El campo apellidos es obligatorio').scrollIntoView().should('be.visible');
  cy.get('label').contains('El campo correo electrónico es obligatorio').scrollIntoView().should('be.visible');
  });

  it('Debe mostrar un error de validación para el correo electrónico no válido', () => {
    // Llena los campos
    cy.get('input[name=nombres]').type('Juan');
    cy.get('input[name=apellidos]').type('Pérez');
    cy.get('input[name=correo_electronico]').type('juan.perez@invalid');
    cy.get('input[name=documento_identidad]').type('12345678');
    cy.get('input[name=numero_telefono]').type('1234567890');
    cy.get('input[name=usuario]').type('juanperez');
    cy.get('input[name=contrasena]').type('password123');

    // Intenta enviar el formulario
    cy.get('button[type=submit]').click();

    // Verifica que el mensaje de error aparezca
    cy.contains('Correo electrónico inválido').should('be.visible');
  });

  it('Debe enviar el formulario correctamente cuando todos los campos son válidos', () => {
    // Llena los campos
    cy.get('input[name=nombres]').type('Marcos');
    cy.get('input[name=apellidos]').type('Gonzalez');
    cy.get('input[name=correo_electronico]').type('MarcosGonzalez@example.com');
    cy.get('input[name=documento_identidad]').type('28157901');
    cy.get('input[name=numero_telefono]').type('0414124091');
    cy.get('input[name=usuario]').type('MarquitoDest');
    cy.get('input[name=contrasena]').type('marquito123');

    // Intercepta la solicitud de registro para verificar la respuesta
    cy.intercept('POST', 'http://localhost:3000/api/register/estudiante', {
      statusCode: 200,
      body: { message: 'Registro exitoso' },
    }).as('registerRequest');

    // Envía el formulario
    cy.get('button[type=submit]').click();

    // Verifica que la solicitud se haya hecho correctamente
    cy.wait('@registerRequest').its('response.statusCode').should('eq', 200);

    // Verifica el mensaje de éxito
    cy.contains('Formulario enviado correctamente!').should('be.visible');
  });
});
