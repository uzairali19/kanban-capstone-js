import { JSDOM } from 'jsdom';
import { counter } from '../counter';

const dom = new JSDOM(`<!DOCTYPE html><body><div id="itemList"></div></body>`); // eslint-disable-line

global.document = dom.window.document;
global.window = dom.window;

const list = document.getElementById('itemList');

test('test count of elements', () => {
  const element = document.createElement('div');
  list.appendChild(element);
  expect(counter(list)).toBe(1);
});
