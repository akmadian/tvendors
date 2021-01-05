import pkg from 'apollo-server-express';
const { ApolloServer } = pkg;
import cors from 'cors'
import express from 'express'
import {resolvers} from './resolvers.js'
import { typeDefs } from './typeDefs.js'
import fetch from 'node-fetch'
import pkg1 from 'apollo-link-http'
const { createHttpLink } = pkg1;
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())

const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        link: createHttpLink({ uri: "", fetch: fetch })
    })

    server.applyMiddleware({ app })

    await mongoose.connect(`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@reviews.0je5j.mongodb.net/reviews_db?retryWrites=true&w=majority`, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

    app.listen({ port: 5000 }, () => 
        console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
    )
}

startServer()
