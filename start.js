module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          'lms server stop',
          'lms server start --cors',
          '{{which("lms")}} unload --all',
          '{{which("lms")}} get lex-au/Orpheus-3b-FT-Q8_0.gguf -y',
          '{{which("lms")}} load lex-au/Orpheus-3b-FT-Q8_0.gguf -y'
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",                // Edit this to customize the venv folder path
        env: { },                   // Edit this to customize environment variables (see documentation)
        path: "app",                // Edit this to customize the path to start the shell from
        message: [
          "python app.py",
        ],
        on: [{
          // "event": "/http:\/\/\\S+/",   
          // "event": "/http:\/\/[0-9.:]+/",
          "event": "/Web UI available at (http:\/\/localhost:[0-9]+)/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        temp_url: "{{input.event[1]}}"
      }
    },
    {
      method: "process.wait",
      params: {
        uri: "{{local.temp_url}}"
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{local.temp_url}}"
      }
    },
  ]
}
