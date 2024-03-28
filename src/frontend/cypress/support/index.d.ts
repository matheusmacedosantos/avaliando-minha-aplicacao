/// <reference types="cypress" />
import 'cypress-file-upload';

declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to attach a file
       * @example cy.attachFile('path/to/file')
       */
      attachFile(filePath: string): Chainable;
    }
  }