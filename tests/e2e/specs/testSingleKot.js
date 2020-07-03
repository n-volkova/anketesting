describe('Single Kot Test', function() {
    it('Fills and sends Single Kot', function() {
        cy.visit('http://localhost:8080/kot')

        cy.get('[name=first_last_name]')
            .type('Мартынова Надежда')

        cy.get('.start-test').click()

        cy.get('.question-wrapper').each(function($item) {
            let correct = $item[0].__vue__.correct

            cy.wrap($item).find('input')
                .then(($input) => {
                    if ($input[0].getAttribute('type') === 'text') {
                        cy.wrap($input).type(correct[0] || correct)

                    } else if ($input[0].getAttribute('type') === 'radio' || $input[0].getAttribute('type') === 'checkbox') {
                        cy.wrap($input).check(correct)
                    }
                })
        })

        cy.get('#saveKot').click()

        // https://docs.google.com/spreadsheets/d/16YXpDycXEtzxPP8_jqA4JnKq8VZHYaBKLTxpGNA5reQ/edit#gid=0'
    })
})