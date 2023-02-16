import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Sculpture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photos: string[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sculptureId = req.query.sculpture;
  console.log(sculptureId);

  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "sculptures.json");

    const fileData = fs.readFileSync(filePath);

    const data: Sculpture[] = JSON.parse(fileData.toString());

    const sculpture = data.find(
      (element) => element.id === parseInt(sculptureId as string)
    );
    res.status(200).json(sculpture);
  }
}
