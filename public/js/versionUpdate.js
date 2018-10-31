const fs = require("fs");
let file = readFile();

function readFile() {
  try {
    let data = fs.readFileSync("./public/js/version.js", "utf8");
    data = data.replace("const data = ", "");
    return data
      ? JSON.parse(data)
      : {
          version: "2.0.0",
          build: "Development"
        };
  } catch (error) {
    console.log("Error at read file: ", error);
    return;
  }
}

function writeFile(file) {
  try {
    let data = "const data = " + JSON.stringify(file);
    fs.writeFile("./public/js/version.js", data);
    return console.log("Version Update Successfully")
  } catch (error) {
    console.log("Error at write file: ", error);
    return;
  }
}

if (!file) return console.log("Verion Update Failure");

let version = file.version.split(".");
version[version.length - 1] = parseInt(version[version.length - 1]) + 1;
version = version.join(".");
file.version = version;
file.build = new Date().toISOString();

writeFile(file);
return;