var fs = require("fs");

fs.readFile("./build/service-worker.js", "utf-8", function(err, data) {
  if (err) throw err;

  var newValue = data.replace("blacklist: [", "blacklist: [/admin/,");

  fs.writeFile("./build/service-worker.js", newValue, "utf-8", function(
    err,
    data
  ) {
    if (err) throw err;
    console.log("Done!");
  });
});
