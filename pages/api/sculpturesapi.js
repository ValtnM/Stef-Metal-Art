import fs from "fs";
import path from 'path';

export default function handler(req, res) {
  if(req.method === "GET") {
    const filePath = path.join(process.cwd(), 'data', 'sculptures.json')

    const fileData = fs.readFileSync(filePath);

    const data = JSON.parse(fileData.toString())

    res.status(200).json(data)
  }
}
