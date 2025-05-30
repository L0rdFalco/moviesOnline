const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app.js");

const port = process.env.PORT || 3000;

async function nodeServerInit() {
  while (true) {
    try {
      await mongoose.connect(process.env.MONGO_CONN_STR);

      app.listen(port, () => {
        console.log(` db listening on port ${port}`);
      });
      break;
    } catch (error) {
      console.log(" db connection error");
    }
  }

}

nodeServerInit();
