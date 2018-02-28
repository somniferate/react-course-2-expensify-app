const book = {
    name: "LOTR",
    author: "JRR Tolkein",
    publisher: {
        year: "1993"
    }
}

const {name: publisherName = "Self Published"} = book.publisher;

console.log(publisherName);