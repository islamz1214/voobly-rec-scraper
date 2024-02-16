const t = require('tap');
const util = require('../lib/util');

t.test('getMonthNumber', async function() {
    
    t.equal(util.getMonthNumber('January'), '01');
    t.equal(util.getMonthNumber('February'), '02');
    t.equal(util.getMonthNumber('March'), '03');
    t.equal(util.getMonthNumber('April'), '04');
    t.equal(util.getMonthNumber('May'), '05');
    t.equal(util.getMonthNumber('June'), '06');
    t.equal(util.getMonthNumber('July'), '07');
    t.equal(util.getMonthNumber('August'), '08');
    t.equal(util.getMonthNumber('September'), '09');
    t.equal(util.getMonthNumber('October'), 10);
    t.equal(util.getMonthNumber('November'), 11);
    t.equal(util.getMonthNumber('December'), 12);
    t.equal(util.getMonthNumber('Blah'), 'invalidMonth');
})

t.test('pickGod', async function() {

    t.equal(util.pickGod('0'), 'Zeus');
    t.equal(util.pickGod('1'), 'Poseidon');
    t.equal(util.pickGod('2'), 'Hades');
    t.equal(util.pickGod('3'), 'Isis');
    t.equal(util.pickGod('4'), 'Ra');
    t.equal(util.pickGod('5'), 'Set');
    t.equal(util.pickGod('6'), 'Odin');
    t.equal(util.pickGod('7'), 'Thor');
    t.equal(util.pickGod('8'), 'Loki');
    t.equal(util.pickGod('9'), 'Kronos');
    t.equal(util.pickGod('10'), 'Oranos');
    t.equal(util.pickGod('11'), 'Gaia');
    t.equal(util.pickGod('999'), 'pickGodError');
})

