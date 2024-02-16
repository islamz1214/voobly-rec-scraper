const t = require('tap');
const assert = require('assert');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { scrape } = require("../lib/Scrape.js");

let document;
async function regularDocument() {
    const dom = await JSDOM.fromFile(process.cwd() + '/test/data/match.html');
    return document = scrape(dom.window.document);
}

async function noRecsFoundDocument() {
    const dom = await JSDOM.fromFile(process.cwd() + '/test/data/no_recs_found.html');
    return document = scrape(dom.window.document);
}

async function noPatchDocument() {
    const dom = await JSDOM.fromFile(process.cwd() + '/test/data/no_patch.html');
    return document = scrape(dom.window.document);
}

async function noMapDocument() {
    const dom = await JSDOM.fromFile(process.cwd() + '/test/data/no_patch.html');
    return document = scrape(dom.window.document);
}

async function matchTodayDocument() {
    const dom = await JSDOM.fromFile(process.cwd() + '/test/data/match_today.html');
    return document = scrape(dom.window.document);
}

async function matchOldDocument() {
    const dom = await JSDOM.fromFile(process.cwd() + '/test/data/match_old.html');
    return document = scrape(dom.window.document);
}

t.test('scrape', async function() {

    const doc = await regularDocument();
    const noRecsFoundDoc = await noRecsFoundDocument();
    const noPatchDoc = await noPatchDocument();
    const noMapDoc = await noMapDocument();
    const matchTodayDoc = await matchTodayDocument();
    const matchOldDoc = await matchOldDocument();

    t.equal(doc.getPlayerOneName(), '__Kimo');
    t.equal(doc.getPlayerTwoName(), 'IamJoe__', );
    t.equal(doc.getPlayerOneGod(), 'Ra');
    t.equal(doc.getPlayerTwoGod(), 'Ra');
    t.equal(doc.getPatch(), 'Voobly Balance Patch 4.0 Blind');
    t.equal(noPatchDoc.getPatch(), 'none');
    t.equal(doc.getMap(), 'Savannah');
    t.equal(noMapDoc.getMap(), 'n_a');
    t.ok(doc.getDate());
    t.ok(matchTodayDoc.getDate());
    t.ok(matchOldDoc.getDate());
    t.ok(doc.getFilename()),
    t.equal(doc.getRcxFileUrl(),
    'file:///files/view/66923796/so58zbjkvgc8g75f0dpuiueddpmhgfay');
    t.equal(noRecsFoundDoc.getRcxFileUrl(), false);

})

