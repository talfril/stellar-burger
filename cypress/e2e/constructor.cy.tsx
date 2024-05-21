describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', () => {
    cy.visit('http://localhost:4000/');
  });
});

describe('Проверка работы функций страницы конструктора', () => {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  describe('Проверка корректной работы ингредиентов в конструкторе', () => {
    describe('Проверка корректной работы модального окна ингредиента', () => {
      it('Открывается модальное окно с подробной информацией об ингредиенте, на который нажали', () => {
        cy.contains('Детали ингредиента').should('not.exist');
        cy.contains('Ингредиент 4').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('#modals').contains('Ингредиент 4').should('exist');
      });
      // it('Модальное окно ингредиента закрывается при нажатии на иконку "крестик"', () => {});
      // it('Модальное окно ингредиента закрывается при нажатии на оверлей', () => {});
      // it('Модальное окно ингредиента закрывается при нажатии на `ESC`', () => {});
    });

    it('Есть возможность добавить в заказ булку', () => {
      cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=constructor-bun-1]')
        .contains('Ингредиент 1')
        .should('exist');
      cy.get('[data-cy=constructor-bun-2]')
        .contains('Ингредиент 1')
        .should('exist');
    });

    it('Есть возможность добавить в заказ ингредиент', () => {
      cy.get('[data-cy=mains-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Ингредиент 2')
        .should('exist');
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
      cy.get('[data-cy=constructor-ingredients]')
        .contains('Ингредиент 4')
        .should('exist');
    });
  });

  // describe('Проверка корректной работы создания заказа', () => {
  //   afterEach(function () {
  //     cy.clearLocalStorage;
  //     cy.clearAllCookies;
  //   });

  //   it('Происходит сборка бургера', () => {});

  //   it('Вызывается клик по кнопке «Оформить заказ»', () => {});

  //   it('Проверяется, что модальное окно открылось и номер заказа верный', () => {});

  //   it('Закрывается модальное окно и проверяется успешность закрытия', () => {});

  //   it('Проверяется, что конструктор пуст', () => {});
  // });
});
