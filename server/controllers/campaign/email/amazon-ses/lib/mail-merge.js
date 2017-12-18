/**
 * @description Converts {{variables}} in the email body to their equivalent in the db
 * @param {object} task - The email to create
 * @param {object} campaignInfo - Information about this campaign
 * @return {string} HTML with {{variables}} replaced by what they represent. E.g., {{cat}} may become 'Garfield'
 */

const Handlebars = require('handlebars');
const fs = require('fs');
const bodyTemplate = Handlebars.compile(fs.readFileSync('JR.hbs').toString());

module.exports = (task, campaignInfo, jobsMap, date) => {
  const applicant = task.additionalData;

  let data = {
    date,
    applicant,
  };

  data.email = task.email;

  data["Jr_Job_Id1"] = jobsMap[applicant.Jr_Job_Id1];
  data["Jr_Job_Id2"] = jobsMap[applicant.Jr_Job_Id2];
  data["Jr_Job_Id3"] = jobsMap[applicant.Jr_Job_Id3];
  data["Jr_Job_Id4"] = jobsMap[applicant.Jr_Job_Id4];
  data["Jr_Job_Id5"] = jobsMap[applicant.Jr_Job_Id5];
  data["Jr_Job_Id6"] = jobsMap[applicant.Jr_Job_Id6];
  data["Jr_Job_Id7"] = jobsMap[applicant.Jr_Job_Id7];
  data["Jr_Job_Id8"] = jobsMap[applicant.Jr_Job_Id8];
  data["Jr_Job_Id9"] = jobsMap[applicant.Jr_Job_Id9];
  data["Jr_Job_Id10"] = jobsMap[applicant.Jr_Job_Id10];

  return bodyTemplate(data)
};
