export const makeMermaidPayload = (diagram: string) => ({
    "code": diagram,
    "mermaid": "{\n  \"theme\": \"dark\"\n}",
    "autoSync": true,
    "updateDiagram": true,
    "panZoom": true,
    "pan": {
      "x": 0,
      "y": 0
    },
    "zoom": 1
});

export function getMakeGraphWebViewContent() {
    const scriptContent = `
        const vscode = acquireVsCodeApi();
        function submitHandler = () => {
            vscode.postMessage({ command: 'submit' });
        }
    `;

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Text Input</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: 20px;
                }
                input[type="text"] {
                    width: 300px; /* Wider input box */
                    padding: 8px;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                button {
                    padding: 8px 16px;
                    font-size: 16px;
                    cursor: pointer;
                    background-color: #0078d4;
                    color: white;
                    border: none;
                    border-radius: 5px;
                }
                #dropZone {
                    width: 300px;
                    height: 200px;
                    border: 2px dashed #0078d4;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: 20px;
                    color: #555;
                }
                #dropZone.dragover {
                    background-color: #f0f0f0;
                }
            </style>
        </head>
        <body>
            <input type="text" id="inputField" placeholder="Your algorithm here...">
            <input type="text" id="inputField" placeholder="Image URL">
            <button onclick="() => {  }">Submit</button>
            <script>(() => { ${} })()</script>
        </body>
        </html>
    `;
}


export function getQueryWebViewContent() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Code Input</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: 20px;
                }
                #loadingIndicator {
                    font-size: 24px;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <h2>Processing code...</h2>
            <div id="loadingIndicator">Loading...</div>
            <div id="responseContainer"></div>

            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <script>
                const vscode = acquireVsCodeApi();

                // Listen for messages from the extension
                window.addEventListener('message', event => {
                    const message = event.data;
                    if (message.type === 'processCode') {
                        processCode(message.value);
                    }
                });

                function processCode(code) {
                    // Make an Axios API call
                    axios.post('https://http://0.0.0.0:8000/api/graph/generate', {
                        code: code
                    })
                    .then(function (response) {
                        // Handle the response
                        const responseData = response.data;
                        document.getElementById('responseContainer').innerText = JSON.stringify(responseData);
                    })
                    .catch(function (error) {
                        // Handle any errors
                        console.error(error);
                    })
                    .finally(function () {
                        // Hide the loading indicator
                        document.getElementById('loadingIndicator').style.display = 'none';
                    });
                }
            </script>
        </body>
        </html>
    `;
}