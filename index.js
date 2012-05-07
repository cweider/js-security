var HTML_ENTITY_MAP = {
  '&': '&amp;'
, '<': '&lt;'
, '>': '&gt;'
, '"': '&quot;'
, "'": '&#x27;'
, '/': '&#x2F;'
};

// OSWASP Guidlines: &, <, >, ", ' plus forward slash.
var HTML_CHARACTERS_EXPRESSION = /[&"'<>\/]/gm;
function escapeHTML(text) {
  return text && text.replace(HTML_CHARACTERS_EXPRESSION, function (c) {
    return HTML_ENTITY_MAP[c] || c;
  });
}

// OSWASP Guidlines: escape all non alphanumeric characters in ASCII space.
var HTML_ATTRIBUTE_CHARACTERS_EXPRESSION =
    /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF]/gm;
function escapeHTMLAttribute(text) {
  return text && text.replace(HTML_ATTRIBUTE_CHARACTERS_EXPRESSION, function (c) {
    return "&#x" + ('00' + c.charCodeAt(0).toString(16)).slice(-2) + ";";
  });
};

// OSWASP Guidlines: escape all non alphanumeric characters in ASCII space.
// Also include line breaks (for literal).
var JAVASCRIPT_CHARACTERS_EXPRESSION =
    /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF\u2028\u2029]/gm;
function encodeJavaScriptIdentifier(text) {
  return text && text.replace(JAVASCRIPT_CHARACTERS_EXPRESSION, function (c) {
    return "\\u" + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
  });
}
function encodeJavaScriptString(text) {
  return text && '"' + encodeJavaScriptIdentifier(text) + '"';
}

// This is not great, but it is useful.
var JSON_STRING_LITERAL_EXPRESSION =
    /"(?:\\.|[^"])*"/gm;
function encodeJavaScriptData(object) {
  return JSON.stringify(object).replace(JSON_STRING_LITERAL_EXPRESSION, function (string) {
    return encodeJavaScriptString(JSON.parse(string));
  });
}

exports.escapeHTML = escapeHTML;
exports.escapeHTMLAttribute = escapeHTMLAttribute;

exports.encodeJavaScriptIdentifier = encodeJavaScriptIdentifier;
exports.encodeJavaScriptString = encodeJavaScriptString;
exports.encodeJavaScriptData = encodeJavaScriptData;
