import axios from 'axios';
import { toUint8Array, fromUint8Array, toBase64, fromBase64 } from 'js-base64';
import mermaid from 'mermaid';
import { deflate, inflate } from 'pako';
// import mermaidAPI from 'mermaid/dist/mermaidAPI';
import * as vscode from 'vscode';

const makeMermaidPayload = (diagram: string) => ({
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

function getMakeGraphWebViewContent() {
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
            <input type="text" id="inputField" placeholder="Type here...">
            <button onclick="sendText()">Submit</button>
            <div id="displayText"></div>
            <div id="dropZone">Drag and drop an image here</div>

            <script>
                const vscode = acquireVsCodeApi();
                
                function sendText() {
                    const input = document.getElementById('inputField').value;
                    document.getElementById('displayText').innerText = input;
                }

                const dropZone = document.getElementById('dropZone');
                dropZone.addEventListener('dragover', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'copy';
                    dropZone.classList.add('dragover');
                });

                dropZone.addEventListener('dragleave', (event) => {
                    dropZone.classList.remove('dragover');
                });

                dropZone.addEventListener('drop', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    dropZone.classList.remove('dragover');
                    const files = event.dataTransfer.files;
                    if (files.length > 0) {
                        const file = files[0];
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                const img = document.createElement('img');
                                img.src = e.target.result;
                                img.style.width = '100%';
                                img.style.height = 'auto';
                                dropZone.innerHTML = '';
                                dropZone.appendChild(img);
                            };
                            reader.readAsDataURL(file);
                        } else {
                            dropZone.innerText = 'Please drop an image file.';
                        }
                    }
                });
            </script>
        </body>
        </html>
    `;
}


function getQueryWebViewContent() {
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

async function copyTextToClipboard() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const text = editor.document.getText(editor.selection);
        try {
            await vscode.env.clipboard.writeText(text);
            vscode.window.showInformationMessage('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }
}
const serialize = (state: string): string => {
    const finalState = JSON.stringify(makeMermaidPayload(state));
    const data = new TextEncoder().encode(finalState);
    const compressed = deflate(data, { level: 9 });
    return fromUint8Array(compressed, true);
};


const showGraphHandler = (previewPanel: vscode.WebviewPanel | undefined) => {
    return async () => {
        // Copy selected text to clipboard before showing the graph
        await copyTextToClipboard();

        if (!previewPanel) {
            previewPanel = vscode.window.createWebviewPanel(
                'showGraph',
                'Show Graph',
                vscode.ViewColumn.Two,
                {}
            );

            previewPanel.onDidDispose(() => {
                previewPanel = undefined;
            }, null);
        } else {
            previewPanel.reveal(vscode.ViewColumn.Two);
        }

        // Assuming getQueryWebViewContent() returns the content for the webview
        previewPanel.webview.html = getQueryWebViewContent();

        // Read the clipboard content
        const clipboardContent = await vscode.env.clipboard.readText();

        // Set the clipboard content as the value of the textarea
        previewPanel.webview.postMessage({ type: 'setTextareaValue', value: clipboardContent });
    };
};

const makeGraphHandler = (previewPanel: vscode.WebviewPanel | undefined) => {
    return async () => {
        if (previewPanel) {
            // Bring the panel to the foreground if it's already created
            previewPanel.reveal(vscode.ViewColumn.Two);
        } else {
            // Create a new webview panel
            previewPanel = vscode.window.createWebviewPanel(
                'makeWebview',
                'Make Webview',
                vscode.ViewColumn.Two,
                {
                    // enableScripts: true
                }
            );

            // Set the HTML content for the webview
            previewPanel.webview.html = getMakeGraphWebViewContent();

            // Clean up the panel on dispose
            previewPanel.onDidDispose(() => {
                previewPanel = undefined;
                // previewPanel = null;
            }, null);
        }

        // Read the clipboard content
        const clipboardContent = await vscode.env.clipboard.readText();

        // Set the clipboard content as the value of the textarea
        previewPanel.webview.postMessage({ type: 'setTextareaValue', value: clipboardContent });
    };
};


export function activate(context: vscode.ExtensionContext) {
    let previewPanel: vscode.WebviewPanel;
    const appLog = vscode.window.createOutputChannel("Contrail");

    const makeGraphHandler = () => {
        if (!previewPanel) {
            previewPanel = vscode.window.createWebviewPanel(
                'showGraph',
                'Show Graph',
                vscode.ViewColumn.Two,
                {}
            );
    
            previewPanel.webview.options = {
                enableScripts: true,
            };
    
            previewPanel.webview.html = getWebviewContent();
        }
    }

    const mermaidToSVG = async (mermaid: string) => {
        appLog.appendLine(mermaid);
        const serialized = serialize(mermaid);
        const endpoint = `https://mermaid.ink/svg/pako:${serialized}`;
        appLog.appendLine(endpoint);
        const res = await axios.get(endpoint, {
            headers: {
              "Accept-Encoding": "gzip, deflate",  // Note the missing Brotli here (br)
            },
            responseType: 'document'
        });

        appLog.appendLine(res.data);
        return res.data;
    };

    // mermaid.initialize({
    // theme: 'default',
    // logLevel: 3,
    // securityLevel: 'strict',
    // startOnLoad: true,
    // arrowMarkerAbsolute: false,
    // });
    
    const diagram = `flowchart TD
        A[Christmas] -->|Get money| B(Go shopping)
        B --> C{Let me think}
        C -->|One| D[Laptop]
        C -->|Two| E[iPhone]
        C -->|Three| F[fa:fa-car Car]
    `;

    const fetchSVG = async () => {
        try {
            const svg = await mermaidToSVG(diagram);
            appLog.appendLine(`SVG: ${svg}`);
            previewPanel?.webview.postMessage({ generated: svg });
            previewPanel.webview.html = getWebviewContent(svg);
        }
        catch (error) {
            appLog.appendLine("Error fetching SVG from Mermaid code");
            appLog.appendLine(error as string);
        }
    }

    fetchSVG();

    // mermaid.render('graph-container', diagram)
    //     .then(x => {
    //         window.postMessage({ generated: x });
    //         alert(x);
    //     })


    context.subscriptions.push(
        // vscode.commands.registerCommand('contrail.showGraph', showGraphHandler(previewPanel)),
        vscode.commands.registerCommand('contrail.showGraph', makeGraphHandler)
    );
}

function getWebviewContent(svg?: string) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Contrail</title>
            </head>
            <body>
                <div id="graphDiv">${svg || "Loading..."}</div>
            </body>
        </html>
    `;
}

export function deactivate() {}