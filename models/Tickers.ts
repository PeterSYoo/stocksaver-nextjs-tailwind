import { Schema, model, models, SchemaTypes } from 'mongoose';

const tickerSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
  tickers: String,
});

const Tickers = models.ticker || model('ticker', tickerSchema);

export default Tickers;
