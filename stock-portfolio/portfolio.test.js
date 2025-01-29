const Portfolio = require('./portfolio');  // Assuming Portfolio is defined in portfolio.js

describe('Stock Portfolio', () => {
   let portfolio;

   beforeEach(() => {
      portfolio = new Portfolio();
   });

   test('should be empty initially', () => {
      expect(portfolio.isEmpty()).toBe(true);
      portfolio.purchase('AAPL', 10);
      expect(portfolio.isEmpty()).toBe(false);
   });

   test('should update portfolio when purchasing stocks', () => {
      portfolio.purchase('AAPL', 10);
      expect(portfolio.shares('AAPL')).toBe(10); // Accessing via `shares()` instead of `stocks['AAPL']`
   });

   test('should update portfolio when selling stocks', () => {
      portfolio.purchase('AAPL', 10);
      portfolio.sale('AAPL', 5);
      expect(portfolio.shares('AAPL')).toBe(5); // Again using `shares()`
   });

   test('should return count of unique ticker symbols', () => {
      portfolio.purchase('AAPL', 10);
      portfolio.purchase('GOOGL', 5);
      expect(portfolio.uniqueSymbolsCount()).toBe(2);
   });

   test('should not keep zero shares for a symbol', () => {
      portfolio.purchase('AAPL', 10);
      portfolio.sale('AAPL', 10);
      expect(portfolio.shares('AAPL')).toBe(0); // Using `shares()` instead of directly checking `stocks['AAPL']`
   });

   test('should return number of shares for a given symbol', () => {
      portfolio.purchase('AAPL', 10);
      portfolio.purchase('GOOGL', 5);
      expect(portfolio.shares('AAPL')).toBe(10);
      expect(portfolio.shares('GOOGL')).toBe(5);
      expect(portfolio.shares('MSFT')).toBe(0); // MSFT is not purchased, so it should return 0
   });

   test('should throw error when selling more shares than owned', () => {
      portfolio.purchase('AAPL', 10);
      expect(() => portfolio.sale('AAPL', 15)).toThrow('Not possible to sell this number of shares.');
   });
});
