const {ApolloServer, gql} = require("apollo-server")

const port = process.env.PORT || 8000;

const books =[
{   title:"Harry Potter",
    author:"Djayy",
    ISBN:"123-456-8",
},
{   title:"Angels&Demons",
    author:"Djayy",
    ISBN:"123-456-8",
},
]

const schemas = gql`
type Book {
    title:String!
    author:String!
    ISBN:String,
}
type Query {
    books:[Book]
    book(title: String!): Book
}
type Mutation{
    createBook(title:String!, author:String!, ISBN:String):Book
}`


const booksResolvers = {
    Query: {
        books: () => books,
        book:(parent,args) => books.find(book => book.title == args.title)
    },

    Mutation: {
        createBook: (parent, args) => {
            const {title, author, ISBN} = args;
            const book = {title, author, ISBN};
            books.push(book);
            return book;
        }
    },
}

const server = new ApolloServer({typeDefs: schemas, resolvers:booksResolvers})
server.listen(port).then(({url, port}) => {console.log(`Server ready at ${url} and ready to be used`);}).catch (err => console.log(err.message))