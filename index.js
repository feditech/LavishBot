const express = require('express');
const { WebhookClient, Suggestion } = require("dialogflow-fulfillment")
const { Suggestions, LinkOutSuggestion } = require('actions-on-google')
const cors = require("cors");

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
const arr = ['s1', "s2"];
// Setup For Express Server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use('/dialogflow', (req, res) => {

    const agent = new WebhookClient({ request: req, response: res });
    const welcome = agent => {
        agent.add(`Welcome to Home`);
        arr.map(x => agent.add(new Suggestions(x)))
    }
    const fallback = agent => {
        agent.add(`I'm sorry, can you try again?`)
        arr.map(x => agent.add(new Suggestions(x)))
    }
    // const popup = agent => {

    // }
    const BookAppointment = agent => {
        arr.map(x => agent.add(new Suggestions(x)))
    }
    const aboutLavish = agent => {
        // agent.add(`Lavish Men’ Salon team is inspired by a specific vision and they love what they do because of the customer who trust them. 
        // At Lavish Men’ Salon we take our time to groom the best look that attracts their appeal and keep them always willing to groom by Lavish Men’ Salon`)
        // agent.add(new Suggestion({"title":'sug'}))
        agent.add(new Suggestion('sss'))
    }


    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    // intentMap.set('popup', popup);
    intentMap.set('BookAppointment', BookAppointment);
    intentMap.set('aboutLavish', aboutLavish);






    agent.handleRequest(intentMap);
})




app.listen(80, () => console.log('Express server is up and running on port 80'));