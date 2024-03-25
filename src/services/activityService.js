const {
  getAllActivitiesDB,
  getActivityByIdDB,
  createActivityDB,
  updateActivityDB,
  removeActivityDB,
} = require('../repository/activityRepository');
async function getAllActivities() { }
async function getActivityById(id) { }
async function createActivity(data) { }
async function updateActivity(id, data) { }
async function removeActivity(id){}

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  removeActivity
};