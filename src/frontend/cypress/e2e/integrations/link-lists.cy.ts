it('sends a POST request with a custom boundary', () => {
  const boundary = '-------CustomBoundary123';

  cy.fixture('file/file_model - file_model.csv', 'utf-8').then((fileContent: string) => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/link-lists/upload',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      body: `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="file/file_model - file_model.csv"\r\nContent-Type: text/csv\r\n\r\n${fileContent}\r\n--${boundary}--\r\n`,
    }).then((response) => {
      expect(response.status).to.equal(201);
    });
  });
});
