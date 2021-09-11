require('datejs')
const NodeCache = require('node-cache');
var stepData;

/**
 * 
 * @param {String} dateString - Day -1, Day +10, Year +5 etc
 * @returns returns the requested date as dd/MM/yyyy
 */
function getDate(dateString) {
    const dateValues = dateString.split(' ');
    switch (dateValues[0]) {
        case 'Day':
            return Date.today().addDays(dateValues[1]).toString("dd/MM/yyyy");
        case 'Month':
            return Date.today().addMonths(dateValues[1]).toString("dd/MM/yyyy");
        case 'Year':
            return Date.today().addYears(dateValues[1]).toString("dd/MM/yyyy");
        default:
            return dateValues.today().toString("dd/MM/yyyy");
    }
}

function getStepData() {
    return stepData;
}

/**
 * 
 * @param {String} key - key index for the Object
 * @param {Object} object - Object containing the DataType
 */
function setStepData(key, object) {
    if (getStepData() == undefined || getStepData() == null) {
        stepData = new NodeCache();
        stepData.set(key, object);
    } else {
        if (getStepData().has(key)) {
            stepData.del(key)
        }
        stepData.set(key, object);
    }
}

module.exports = {
    getStepData,
    setStepData,
    getDate,
}