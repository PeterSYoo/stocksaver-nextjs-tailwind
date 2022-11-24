import { NextApiRequest, NextApiResponse } from 'next';
import Users from '../models/Users';

export const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await Users.find({});

    if (!users) return res.status(404).json({ error: 'Data not Found' });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: 'Error While Fetching Users' });
  }
};
