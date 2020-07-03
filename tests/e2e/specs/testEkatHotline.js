describe('Ekat Hotline Test', function() {
    it('Fills and sends Ekat Hotline', function() {
        cy.visit('http://localhost:8080/ekathotline')

        cy.get('[name=first_last_name]')
            .type('Мартынова Надежда')

        cy.get('[name=email]')
            .type('n.martynova@rocketguys.com')

        cy.get('[name=phone]')
            .type('+9636225881')

        let aboutText = 'Сопроводительные письма очень важны, потому что работа в чате напрямую связана с письменным выражением своих мыслей. Если письмо шаблонное или состоит из двух предложений (250 символов) — считаем, что его нет 🙂Сопроводительные письма очень важны, потому что работа в чате напрямую связана с письменным выражением своих мыслей. Если письмо шаблонное или состоит из двух предложений (250 символов) — считаем, что его нет 🙂'
    
        cy.get('[name=about]')
            .invoke('val', aboutText).trigger('change')
            
        cy.get('.question-wrapper input').first().check('Реклама в соцсетях')

        cy.get('button[type=submit]').click()

        cy.get('.start-test').click()

        cy.get('.gap-wrapper').each(function($item) {
            let correct = $item[0].__vue__.correct
            cy.wrap($item).click().find(`[data-name='${correct}']`).click()
        })

        cy.get('.button').click()

        // https://docs.google.com/spreadsheets/d/1TFaoMVuRaPXfWAXAThU_0GOukz28uQv_zhvMk06lkdM/edit#gid=0
    })
})