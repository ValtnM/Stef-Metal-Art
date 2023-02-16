import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

type Peinture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photos: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const peintureId = req.query.peinture;

  if (req.method === "GET") {
    const filePath = path.join(process.cwd(), "data", "peintures.json");

    const fileData = fs.readFileSync(filePath);

    const data: Peinture[] = JSON.parse(fileData.toString());

    const peinture = data.find(
      (element) => element.id === parseInt(peintureId as string)
    );
    res.status(200).json(peinture);
  }
}
