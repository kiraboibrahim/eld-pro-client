import { NextApiRequest, NextApiResponse } from 'next';
import { DUMMY_ROUTE_DATA } from '@/constants';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(DUMMY_ROUTE_DATA);
}
