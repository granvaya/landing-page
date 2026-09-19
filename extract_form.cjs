const fs = require('fs');
const html = fs.readFileSync('form.html', 'utf8');

// Find form action
const actionMatch = html.match(/<form action="(https:\/\/docs\.google\.com\/forms\/[^"]+)"/);
if (actionMatch) {
  console.log("ACTION_URL:", actionMatch[1]);
} else {
  console.log("No form action found. The page might be a redirect.");
}

// Find data script
const dataMatch = html.match(/var FB_PUBLIC_LOAD_DATA_ = (\[.*?\]);/);
if (dataMatch) {
  const data = JSON.parse(dataMatch[1]);
  // Extract fields
  // data[1][1] contains the fields array
  const fields = data[1][1];
  fields.forEach(f => {
    // f[1] is the title
    // f[4] contains the field items, f[4][0][0] is the entry ID
    if (f && f[1] && f[4] && f[4][0]) {
      console.log(`Field: "${f[1]}" -> entry.${f[4][0][0]}`);
    }
  });
} else {
  console.log("No FB_PUBLIC_LOAD_DATA_ found.");
}
