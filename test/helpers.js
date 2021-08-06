const specialChars = [Buffer.from("e2808b", "hex").toString()];

exports.toPrintedString = s => specialChars.reduce((prev, next)=> prev.replace(new RegExp(next, 'g'), ''), s);