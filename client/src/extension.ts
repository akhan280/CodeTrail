import axios from 'axios';
import { fromUint8Array } from 'js-base64';
import { deflate } from 'pako';
import * as vscode from 'vscode';
import * as path from 'path';
import * as payload from '../../data/granular/payload.json';

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

    const openFileAndHighlight = (payload: any, symbol: string) => {
        appLog.appendLine(`openFileAndHighlight`);
        // Find the corresponding symbol in the payload
        const entry = payload.symbols.find((s: any) => s.symbol === symbol);
        appLog.appendLine(`entry: ${JSON.stringify(entry)}`);
    
        if (entry) {
            const { filename, start, end } = entry;
    
            // Resolve filename relative to the workspace root
            const workspaceRoot = vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri.fsPath;
            const fullPath = path.join(workspaceRoot, filename);
    
            // Open the file directly
            vscode.workspace.openTextDocument(fullPath)
                .then(document => vscode.window.showTextDocument(document, { viewColumn: vscode.ViewColumn.One }))
                .then(editor => {
                    if (editor) {
                        // Create a new selection from start to end
                        const startPosition = new vscode.Position(start - 1, 0);
                        const endPosition = new vscode.Position(end - 1, 0);
                        const range = new vscode.Range(startPosition, endPosition);
                        editor.selection = new vscode.Selection(range.start, range.end);
                        editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
                    }
                })
        }
    };
    

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

            previewPanel.webview.onDidReceiveMessage(
                (message: any) => {
                    appLog.appendLine(`received message ${JSON.stringify(message)}`)
                    // vscode.window.showInformationMessage('hooray!!', JSON.stringify(message));
                    openFileAndHighlight(payload, message.symbol);
                }
            )
    
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

    const fetchSVG = async () => {
        try {
            appLog.appendLine(payload.graph);
            const svg = await mermaidToSVG(payload.graph);
            appLog.appendLine(`SVG: ${svg}`);
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

    const scriptContent = `
        const vscode = acquireVsCodeApi();

        document.querySelectorAll('[data-id]').forEach(element => {
            element.addEventListener('click', function() {
                const nodeId = this.getAttribute('data-id');
                if(nodeId) {
                    onNodeClickHandler(nodeId);
                }
            });
        });

        function onNodeClickHandler(nodeId) {
            console.log('Node clicked:', nodeId);
            alert('clicked!')
            vscode.postMessage({
                command: 'alert',
                text: 'hi',
                symbol: nodeId,
            })
        }
    `;

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
                <script>(() => { ${scriptContent} })()</script>
            </body>
        </html>
    `;
}

export function deactivate() {}