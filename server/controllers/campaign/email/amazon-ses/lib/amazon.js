/**
 * @description Create an Amazon email based on the SES spec
 * @param {object} task - The email to create
 * @param {object} campaignInfo - Information about this campaign
 * @return {object} Formatted email object
 */

var converter = require('html-to-text');


module.exports = (task, campaignInfo) => {

  // Ref https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property
  const email = {
    Source: `"${campaignInfo.fromName}" <${campaignInfo.fromEmail}>`, // From email
    Destination: { // To email
      ToAddresses: [`<${task.email}>`] // Set name as follows https://docs.aws.amazon.com/ses/latest/DeveloperGuide/email-format.html
    },
    Message: {
      Body: {},
      Subject: { // Subject
        Data: campaignInfo.emailSubject
      }
    }
  };

  if (campaignInfo.type === 'Plaintext') { // Send as plaintext if plaintext, else send as HTML (no other format concerns us)
    Object.assign(email.Message.Body, { Text: { Data: campaignInfo.emailBody } });
  } else {
    let text = "";
    try {
      text = converter.fromString(campaignInfo.emailBody, this._options);
      text = text.replace(/(\n)\[cid:.*?\] |\[cid:.*?\]/g, '$1');
    } catch (E) {
      console.log('Error while html to text')
    }

    Object.assign(email.Message.Body, { Text: { Data: text }, Html: { Data: campaignInfo.emailBody } });
  }

  return { email, task };
};
