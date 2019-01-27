/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const capitals = new Map([
  ['germany', 'berlin'], 
  ['england', 'london'], 
  ['france', 'paris']
  ]);
;

const CapitalIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CapitalIntent';
  },
  handle(handlerInput) {
    const country = handlerInput.requestEnvelope.request.intent.slots.country.value;
    const speechText = country ? 
                        'the capital of '+ country +' is ' + capitals.get(country) :
                        'i don\'t know the capital of '+ country ;
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const UnhandledHandler = {
  canHandle(handlerInput) {
    return true;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
    .speak('I don\'t no what to do with this')
    .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    CapitalIntentHandler,
    UnhandledHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
