import pkg from 'apollo-server-express';
const { ApolloServer } = pkg;
import cors from 'cors'
import express from 'express'
import {resolvers} from './resolvers.js'
import { typeDefs } from './typeDefs.js'
import mongoose from 'mongoose'

const app = express()
app.use(cors())

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    server.applyMiddleware({ app })

    await mongoose.connect("mongodb+srv://2I9dCsfxL8XN:2I9dCsfxL8XN@reviews.0je5j.mongodb.net/reviews_db?retryWrites=true&w=majority", {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

    app.listen({ port: 5000 }, () => 
        console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
    )
}

startServer()
