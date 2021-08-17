const normalizeBody = (body) => body.replace("\n", "\\n").replace("'", "\\'");

class RubyVCR {
  generate(context, requests, options) {
    const generated = [
      "---",
      "http_interactions:"
    ];
    requests.forEach(req => {
      generated.push(
        "- request:",
        `    method: ${req.method.toLowerCase()}`,
        `    uri: ${req.url}`,
        "    body: ",
        "      encoding: ASCII-8BIT",
        `      string: '${normalizeBody(req.body)}'`,
        "    headers:"
      );

      Object.keys(req.headers).forEach(headerName => {
        generated.push(
          `      ${headerName}:`,
          `      - ${req.headers[headerName]}`
        );
      });

      const response = req.getLastExchange();
      generated.push(
        "  response:",
        "    status:",
        `      code: ${response.responseStatusCode}`,
        `      message: ${response.responseStatusString}`,
        "    headers:"
      );

      Object.keys(response.responseHeaders).forEach(headerName => {
        generated.push(
          `      ${headerName}:`,
          `      - ${response.responseHeaders[headerName]}`,
        );
      });

      generated.push(
        "    body:",
        "      encoding: ASCII-8BIT",
        `      string: '${response.responseBody}'`,
        `  recorded_at: ${response.date}`,
      );
    })
    generated.push(`recorded_with: Paw`);
    return generated.join("\n");
  }
}

RubyVCR.identifier = "io.vito.PawExtensions.ruby-vcr";
RubyVCR.title = "Ruby VCR";
RubyVCR.fileExtension = "yml";
RubyVCR.languageHighlighter = "yaml";
registerCodeGenerator(RubyVCR);
