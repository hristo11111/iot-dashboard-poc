const http = require('http');
const parquet = require('parquetjs-lite');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
  if (req.url != '/favicon.ico') {
    let reader = await parquet.ParquetReader.openFile('./fruits1.parquet');

    // create a new cursor
    let cursor = reader.getCursor();

    // read all records from the file and print them
    let record = null;
    while (record = await cursor.next()) {
      console.log(record);
    }

    await reader.close();
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
