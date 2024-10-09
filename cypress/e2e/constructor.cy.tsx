const testUrl = '/';
const buns = '[data-cy=bun-ingredients]';
const mains = '[data-cy=mains-ingredients]';
const closeButton = '[data-cy=modal-close]';
const constructorIngredients = '[data-cy=constructor-ingredients]';
const topBun = '[data-cy=constructor-bun-1]';
const bottomBun = '[data-cy=constructor-bun-2]';

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', () => {
    cy.visit(testUrl);
  });
});

describe('Проверка работы функций страницы конструктора', () => {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  describe('Проверка корректной работы ингредиентов в конструкторе', () => {
    describe('Проверка корректной работы модального окна ингредиента', () => {
      it('Открывается модальное окно с подробной информацией об ингредиенте, на который нажали', () => {
        cy.contains('Детали ингредиента').should('not.exist');
        cy.contains('Ингредиент 5').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('#modals').contains('Ингредиент 5').should('exist');
      });

      it('Модальное окно ингредиента закрывается при нажатии на иконку "крестик"', () => {
        cy.contains('Ингредиент 3').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get(closeButton).should('exist');
        cy.get(closeButton).click();
        cy.contains('Детали ингредиента').should('not.exist');
      });

      it('Модальное окно ингредиента закрывается при нажатии на оверлей', () => {
        cy.contains('Ингредиент 8').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('[data-cy=modal-overlay]').click({ force: true });
        cy.contains('Детали ингредиента').should('not.exist');
      });

      it('Модальное окно ингредиента закрывается при нажатии на `ESC`', () => {
        cy.contains('Ингредиент 6').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('body').type('{esc}');
        cy.contains('Детали ингредиента').should('not.exist');
      });
    });

    it('Есть возможность добавить в заказ булку', () => {
      cy.get(buns).contains('Добавить').click();
      cy.get(topBun).contains('Ингредиент 1').should('exist');
      cy.get(bottomBun).contains('Ингредиент 1').should('exist');
    });

    it('Есть возможность добавить в заказ ингредиент', () => {
      cy.get(mains).contains('Добавить').click();
      cy.get(constructorIngredients).contains('Ингредиент 2').should('exist');
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();
      cy.get(constructorIngredients).contains('Ингредиент 4').should('exist');
    });
  });

  describe('Проверка корректной работы создания заказа', () => {
    beforeEach(function () {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.intercept('POST', 'api/orders', { fixture: 'new_order.json' }).as(
        'newOrder'
      );

      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('test-refreshToken')
      );
      cy.setCookie('accessToken', 'test-accessToken');
    });

    afterEach(function () {
      cy.clearLocalStorage();
      cy.clearAllCookies();
    });

    it('Проверка отправки заказа и последующего получения модального окна с деталями заказа', () => {
      //Происходит сборка бургера
      cy.get(buns).contains('Добавить').click();
      cy.get(mains).contains('Добавить').click();
      cy.get('[data-cy=sauces-ingredients]').contains('Добавить').click();

      //Происходит отправка заказа
      cy.contains('Оформить заказ').click();
      cy.wait('@newOrder')
        .its('request.body')
        .should('deep.equal', { ingredients: ['1', '2', '4', '1'] });

      //Проверяется, что модальное окно открылось и номер заказа верный
      cy.contains('идентификатор заказа').should('exist');
      cy.get('[data-cy=order-number]').contains('101010').should('exist');

      //Закрывается модальное окно и проверяется успешность закрытия
      cy.get(closeButton).click();
      cy.get('[data-cy=order-number]').should('not.exist');

      //Проверяется, что конструктор пуст
      cy.get(topBun).should('not.exist');
      cy.get(bottomBun).should('not.exist');
      cy.get(constructorIngredients)
        .contains('Ингредиент 2')
        .should('not.exist');
      cy.get(constructorIngredients)
        .contains('Ингредиент 4')
        .should('not.exist');
    });
  });
});
