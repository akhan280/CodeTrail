import axios from 'axios';
import { fromUint8Array } from 'js-base64';
import { deflate } from 'pako';
import * as vscode from 'vscode';

import { makeMermaidPayload, getMakeGraphWebViewContent, getQueryWebViewContent } from './templates';
// import mermaidAPI from 'mermaid/dist/mermaidAPI';



async function copyTextToClipboard() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const text = editor.document.getText(editor.selection);
        try {
            await vscode.env.clipboard.writeText(text);
            vscode.window.showInformationMessage('Text copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy text:', error);
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

    context.subscriptions.push(
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