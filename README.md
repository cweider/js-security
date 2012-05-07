# js-security #

Encoding and decoding methods c/o OWASP

## Interface ##
### HTML ###
`escapeHTML`, `escapeHTMLAttribute`

```
// A hyperlink.
markup = '<a href="'+ escapeHTMLAttribute(url) +'"' + '>' + escapeHTML(url) + '</a>'
```

### JAVASCRIPT ###
`encodeJavaScriptIdentifier`, `encodeJavaScriptString`, `encodeJavaScriptData`

```
// A JSON response.
content = encodeJavaScriptIdentifier(req.params[callback]) + '(' + encodeJavaScriptData(req.params) + ')'
```

### CSS ###
`encodeCSSIdentifier`, `encodeCSSString`

```
// A CSS selector
$elements = $('.' + encodeCSSIdentifier(theClass) + [title=' + encodeCSSString(theTitle) + ']')
```

```
// A CSS declaration
$element.css('background-image', 'url(' + encodeCSSString(theUrl) + ')')
```
