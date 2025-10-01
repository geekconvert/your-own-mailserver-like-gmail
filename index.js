const { SMTPServer } = require("smtp-server");
const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect: (session, callback) => {
    console.log(`onConnect: ${session.id}`);
    callback();
  },
  onMailFrom: (address, session, callback) => {
    console.log(`onMailFrom: ${address.address} ${session.id}`);
    callback();
  },
  onRcptTo: (address, session, callback) => {
    console.log(`onRcptTo: ${address.address} ${session.id}`);
    callback();
  },
  onData: (stream, session, callback) => {
    console.log(`onData: ${session.id}`);
    stream.on("data", (chunk) => {
      console.log(`Data chunk: ${chunk.length} bytes`);
    });
    stream.on("end", () => {
      console.log("End of data");
      callback();
    });
  },
});

server.listen(25, () => console.log("SMTP server is running on port 25"));
