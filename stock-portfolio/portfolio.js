class Portfolio {
   constructor() {
      this.stocks = {};
   }

   isEmpty() {
      return Object.keys(this.stocks).length === 0;
   }

   purchase(symbol, shares) {
      if (shares <= 0) {
         throw new Error('The number of shares to purchase must be positive.');
      }
      if (this.stocks[symbol] === undefined) {
         this.stocks[symbol] = 0;
      }
      this.stocks[symbol] += shares;
   }

   sale(symbol, shares) {
      if (shares <= 0) {
         throw new Error('The number of shares to sell must be positive.');
      }
      if (!this.hasSufficientShares(symbol, shares)) {
         throw new Error('Not possible to sell this number of shares.');
      }
      this.stocks[symbol] -= shares;
      if (this.stocks[symbol] === 0) {
         delete this.stocks[symbol];
      }
   }

   hasSufficientShares(symbol, shares) {
      return this.stocks[symbol] && this.stocks[symbol] >= shares;
   }

   uniqueSymbolsCount() {
      return Object.keys(this.stocks).length;
   }

   shares(symbol) {
      return this.stocks[symbol] || 0;
   }
}

module.exports = Portfolio;
