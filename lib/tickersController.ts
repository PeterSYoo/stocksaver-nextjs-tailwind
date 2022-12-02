import { NextApiRequest, NextApiResponse } from 'next';
import Tickers from '../models/Tickers';

// GET all tickers
export const getTickers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tickers = await Tickers.find({});

    if (!tickers) return res.status(404).json({ error: 'Tickers not found' });
    res.status(200).json(tickers);
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching tickers' });
  }
};

// Get single tickers
export const getTicker = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { tickersId } = req.query;

    if (tickersId) {
      const user = await Tickers.findById(tickersId);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(404).json({ error: 'Cannot get tickers' });
  }
};

// GET user tickers
export const getUserTickers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { userId } = req.query;
    const user = await Tickers.find({ user: userId });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: 'Error while fetching users ticker' });
  }
};

// POST tickers
export const createTickers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    if (!req.body) {
      res.status(404).json({ error: 'Tickers not found' });
    }

    const tickers = await Tickers.create(req.body);
    res.status(200).json(tickers);
  } catch (error) {
    res.status(404).json({ error: 'Cannot create tickers' });
  }
};

// DELETE tickers
export const deleteTickers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { tickersId } = req.query;

    if (tickersId) {
      const tickers = await Tickers.findByIdAndDelete(tickersId);
      res.status(200).json(tickers);
    }
  } catch (error) {
    res.status(404).json({ error: 'Error while deleting tickers' });
  }
};
