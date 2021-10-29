const { ApolloServer, gql } = require("apollo-server");


const port = process.env.PORT || 8000;

const blogs = [
  {
    author: "Dominic Joseph Appiah",
    abouttheAuthor: "A young enterpreneur,a computer Science Graduate from University Of Ghana with the passion of writing.",
    title: "The power of God in our lives.",
    description:
      "We all have to do a better job of following through, and a better job of finishing what we start. IF we all do that, the world would be a better place, filled with more Christ like people, and more Christians. So today, I challenge myself and I challenge you to find and fulfill your purpose with purpose, and finish the race strong, so that way we can be ready for more responsibilities that God will hand us!",
    date: "25th November,2030",
  },

  {
    author: "Russel Tinkran Adu-Bawa-Benge",
    abouttheAuthor: "Senior Economist and lecturer at the University of Ghana, Legon Main Campus.",
    title: "Rampaging the goals of success",
    description: "The journey to being successful is not an easy one, but with the claws of consistency in between our fingers, we are fierce.",
    date:"10th January, 2045"
      
  },

  {
    author: "Edward Nii Laryea",
    abouttheAuthor: "Acturist and Audit practitioner",
    title: "",
    description:"The journey to being successful is not an easy one, but with the claws of consistency in between our fingers, we are fierce.",
    date:"15th March, 2045"
  },

  {
    author: "Kelvin Odame",
    abouttheAuthor: "Biologist and NeuroSurgeon",
    title: "Animals and Extraction",
    description:"The journey to being successful is not an easy one, but with the claws of consistency in between our fingers, we are fierce.",
    date:"10th January, 2045"
  },

  {
    author: "Dominic Joseph Appiah",
    abouttheAuthor: "A God fearing  millionaire.",
    title: "Patience Is Key.",
    description:"The journey to being successful is not an easy one, but with the claws of consistency in between our paws makes us fierce.",
    date:"12th October, 2021"
  },

  {
    author: "Andy Enyimah Ackah",
    abouttheAuthor: "A fervernt man of God in Prayer.",
    title: "Best Experiences with Afluent Friends",
    description:
      "Divide and conquer... We hear it all the time, usually in reference on how to work more efficiently to complete a task. There is power in doing so. So, why do we allow Satan to do this very thing to us? We let him divide the kingdom, propping believer against believer, sect against sect, and denomination against denomination. We now HATE others based on what political stance they have, traditions they practice, and what race they we born into. Ironically, each side of the spectrum claims that the other side is the author of these evils, that vandalism only comes from liberals Uneducated and stupid.",
    date: "12th October,2021",
  },

  {
    author: "Cathy Quaye",
    abouttheAuthor: "A passionate reader and writer of developmental issues.",
    title: "Social Ammenities and their growth.",
    description:"The journey to being successful is not an easy one, but with the claws of consistency in between our fingers, we are fierce.",
    date:"10th January, 2045",
  },


  
];

//Creating the Schema
const schemas = gql`
  type Blog {
    author: String!
    abouttheAuthor: String!
    title: String!
    description: String!
    date: String!
  }
  type Query {
    blogs: [Blog]
    blog(title: String!): Blog
  }
  type Mutation {
    createBlog(
      title: String!
      author: String!
      abouttheAuthor: String!
      description: String!
      date: String!
    ): Blog
  }
`;

//Creating the Resolvers
const blogResolvers = {
  Query: {
    blogs: () => blogs,
    blog: (parent, args) => blogs.find((blog) => blog.title === args.title),
  },

  Mutation: {
    createBlog: (parent, args) => {
      const { title, author, abouttheAuthor, description, date } = args;
      const blog = { title, author, abouttheAuthor, description, date };
      blogs.push(blog);
      return blog;
    },
    
    
  },
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers: blogResolvers,
  playground: true,
  introspection: true,
});

server
  .listen(port)
  .then(({ url }) => {
    console.log(`Server ready at ${url} and ready to be used`);
  })
  .catch((err) => console.log(err));