const express = require("express");
const uuid = require("uuid");
require("dotenv").config();
const { OpenAI } = require("openai");
const Interview = require("../model/interview");
const apiKey = process.env.APIKEY;

const openai = new OpenAI({ apiKey: apiKey });
const startingPrompt = {
    MERN: `
      Hi there! Welcome to the MERN stack interview. I'm excited to learn more about your skills. Let's take it one step at a time. I'll ask you a question related to MERN (MongoDB, Express, React, Node). Take your time to respond, and we'll discuss your answer afterward.
  
      Feel free to ask for clarification if needed. Ready? Let's get started!
    `,
    JAVA: `
      Hello! Ready to dive into the Java interview? I'm looking forward to hearing about your Java, Spring Boot, and Hibernate expertise. Remember, it's a friendly conversation. I'll ask you a question, and you can share your thoughts. After your response, we'll discuss it together.
  
      If you're unsure about anything, don't hesitate to ask for clarification. Let's begin!
    `,
  };

  
const UpdateInterviewPrompt = `Give me a question according to MERN. Provide one question at a time. If the user responds, go to the next question.`;
const endInterviewPrompt = `Stop the interview.Give the feedback  base on my answer and do not give single line or single word feedback only give feedback sentance  base on the feefback Schema :{
  improvementAreas:[{type:String}],
  overallScore:[{type:Number}]
}`;

//Token

const generateSessionToken = () => {
  return uuid.v4();
};




const startInterview = async (req, res, next) => {
    const { type } = req.body;
    const sessionToken = generateSessionToken();
  
    try {
      const conversation = [{ role: "user", content: startingPrompt[type] }];
      // console.log(conversation);
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversation,
      });
  
      const question = response.choices[0].message.content;
      const newinterview = new Interview({
        sessionToken,
        type: type,
        conversation: [...conversation, { role: "assistant", content: question }],
        feedback: null,
      });
      await newinterview.save();
      // console.log(question);
      console.log(response.choices, "object1");
      console.log(question, "object2");
      // console.log(newinterview, "object3");
      res
        .status(200)
        .json({ msg: "Interview Is Started Now", question, newinterview });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };
  
  
  const UpdateInterview = async (req, res, next) => {
    const { sessionToken, conversation, type } = req.body;
  
    console.log(sessionToken, conversation);
    try {
      
      const userResponse = conversation[conversation.length - 1].content;
  
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          ...conversation,
          { role: "user", content: UpdateInterviewPrompt },
        ],
      });
      console.log(response.choices, "bb");
      const nextQuestion = response.choices[0].message.content;
      console.log(nextQuestion, "cc");
      const updatedInterview = await Interview.findOneAndUpdate(
        { sessionToken },
        { $push: { conversation: { role: "assistant", content: nextQuestion } } },
        { new: true }
      );
  
      res.status(200).json({
        msg: "Next question retrieved",
        nextQuestion,
        UpdateInterviewPrompt,
        updatedInterview,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports = {
    endInterviewPrompt,
    startingPrompt,
    startInterview,
    UpdateInterview,
  };