import { parse } from "path";

const pdf = require("pdf-parse");

const parsePDF = async (file: Buffer) => {
  //   let dataBuffer = fs.readFileSync("path to PDF file...");
  pdf(file).then(function (data) {
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata);
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text);
  });
};
export async function POST(request: Request) {
  const res = await request.json();
  console.log(res.body);
  parsePDF(res.body);
  return Response.json("Hello World!");
}

export async function GET(request: Request) {
  return Response.json("Hello World!");
}