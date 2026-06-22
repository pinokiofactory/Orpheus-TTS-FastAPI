module.exports = {
  requires: {
    bundle: "ai",
  },
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
          '{{which("lms")}} get https://huggingface.co/lex-au/Orpheus-3b-FT-Q8_0.gguf/resolve/main/Orpheus-3b-FT-Q8_0.gguf -y',
          '{{which("lms")}} load orpheus-3b-ft.gguf -y'
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: { },
        path: "app",
        message: [
          "python app.py",
        ],
        on: [{
          // "event": "/http:\/\/\\S+/",   
          // "event": "/http:\/\/[0-9.:]+/",
          "event": "/Application startup complete/",
          "done": true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "http://localhost:5005"
      }
    }
  ]
}
