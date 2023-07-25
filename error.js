/**
 * 
 * @param {Number} line 
 * @param {String} message 
 */
function error (line, message) {
  report(line, '', message);
}

/**
 * 
 * @param {Number} line 
 * @param {String} where 
 * @param {String} message 
 */
function report (line, where, message) {
  if (where === '') {
    console.error(`[line ${line}] Error: ${message}`);
  } else {
    console.error(`[line ${line}] Error ${where}: ${message}`);
  }
}

export { error, report };