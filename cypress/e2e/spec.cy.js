describe('지뢰찾기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');

    cy.getBySel('name-input').type('의성짱짱맨');
    cy.getBySel('start-button').click();
  });

  it('마우스를 우클릭할 때마다 깃발, 물음표, 빈칸이 차례대로 보여야 한다.', () => {
    cy.get('.relative').rightclick();
    cy.getBySel('flag-button').should('be.visible');

    cy.get('.relative').rightclick();
    cy.getBySel('question-button').should('be.visible');

    cy.get('.relative').rightclick();
    cy.getBySel('covered-button').should('be.visible');
  });
});
