import dbConnect from '../../lib/dbConnector';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  try {
    // 假設 MongoDB 裡面有一筆 User 文件，其 slug 欄位的值是 'pheno-author'
    const user = await User.findOne({ slug: 'john-huang' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
