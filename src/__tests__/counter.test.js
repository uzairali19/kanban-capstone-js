/**
 * @jest-environment jsdom
 */
 import numberOfReservations from '../__mocks__/counter.js';

 test('test Number of elements returned by counter', () => {
   const counter = [1, 2, 3];
   expect(numberOfReservations(counter)).toEqual(3);
 });