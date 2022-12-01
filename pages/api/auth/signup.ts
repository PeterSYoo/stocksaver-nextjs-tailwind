import { NextApiRequest, NextApiResponse } from 'next';
import usersConnect from '../../../database/usersConnect';
import Users from '../../../models/Users';
import { hash } from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  usersConnect().catch((error) => res.json({ error: 'Connection Failed...!' }));

  // only post method is accepted
  if (req.method === 'POST') {
    if (!req.body)
      return res
        .status(404)
        .json({ error: `Don't have form DataTransfer...!` });
    const { username, email, password } = req.body;

    // check duplicate users
    const checkexisiting = await Users.findOne({ email });
    if (checkexisiting)
      return res.status(422).json({ message: 'User Already Exists...!' });

    // hash password
    Users.create(
      {
        username,
        email,
        password: await hash(password, 12),
      },
      function (err: any, data: any) {
        if (err) return res.status(404).json({ err });
        res.status(201).json({ status: true, user: data });
      }
    );
  } else {
    // error status 500
    res
      .status(500)
      .json({ message: 'HTTP method not valid only POST Accepted' });
  }
}
