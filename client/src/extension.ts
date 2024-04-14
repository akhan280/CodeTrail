import * as path from 'node:path';

import axios from 'axios';
import { fromUint8Array } from 'js-base64';
import { deflate } from 'pako';
import * as vscode from 'vscode';

import { makeMermaidPayload, getMakeGraphWebViewContent, getQueryWebViewContent } from './templates';
import * as granularPayload from '../../data/granular/payload.json';
import * as alligatorPayload from '../../data/alligator/payload.json';

let payload = granularPayload;

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

export function activate(context: vscode.ExtensionContext) {
    let previewPanel: vscode.WebviewPanel;
    let makePreviewPanel: vscode.WebviewPanel;
    const appLog = vscode.window.createOutputChannel("Contrail");

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

    const fetchSVG = async (panel: any) => {
        try {
            appLog.appendLine(payload.graph);
            const svg = await mermaidToSVG(payload.graph);
            appLog.appendLine(`SVG: ${svg}`);
            panel.webview.html = getWebviewContent(svg);
        }
        catch (error) {
            appLog.appendLine("Error fetching SVG from Mermaid code");
            appLog.appendLine(error as string);
        }
    }

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
    
    const showGraphHandler = () => {
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
            fetchSVG(previewPanel);
        }
    }

    const makeGraphHandler = () => {
            if (makePreviewPanel) {
                // Bring the panel to the foreground if it's already created
                makePreviewPanel.reveal(vscode.ViewColumn.Two);
            } else {
                // Create a new webview panel
                makePreviewPanel = vscode.window.createWebviewPanel(
                    'makeWebview',
                    'Make Webview',
                    vscode.ViewColumn.Two,
                    {
                        // enableScripts: true
                    }
                );
    
                // Set the HTML content for the webview
                makePreviewPanel.webview.html = getMakeGraphWebViewContent();

                makePreviewPanel.webview.onDidReceiveMessage(
                    (message: any) => {
                        appLog.appendLine(JSON.stringify(message));
                        if (message.command === 'submit') {
                            payload = alligatorPayload;
                            fetchSVG(makePreviewPanel);
                        }
                        else {
                            vscode.env.clipboard.writeText(message.payload.code).then(() => {
                                vscode.window.showInformationMessage('Code copied to clipboard.');
                                vscode.commands.executeCommand('editor.action.clipboardPasteAction');
                            });
                        }
                    }
                )
    
                // Clean up the panel on dispose
                makePreviewPanel.onDidDispose(() => {
                }, null);
            }
    
            // Read the clipboard content
            vscode.env.clipboard.readText().then(value => {
                makePreviewPanel.webview.postMessage({ type: 'setTextareaValue', value });
            })
    };

    context.subscriptions.push(
        vscode.commands.registerCommand('contrail.showGraph', showGraphHandler),
        vscode.commands.registerCommand('contrail.makeGraph', makeGraphHandler),
    );
}

function getWebviewContent(svg?: string) {

    const scriptContent = `
        const vscode = acquireVsCodeApi();

        document.querySelectorAll('[data-id]').forEach(element => {
            element.style.cursor = 'pointer';
            
            element.addEventListener('mouseenter', function() {
                element.style.filter = 'drop-shadow(0 0 10px rgba(255,99,71, 0.5))';
            });
            element.addEventListener('mouseleave', function() {
                element.style.filter = '';
            });
            element.addEventListener('click', function() {
                const nodeId = this.getAttribute('data-id');
                if(nodeId) {
                    onNodeClickHandler(nodeId);
                }
            });
        });

        function onNodeClickHandler(nodeId) {
            console.log('Node clicked:', nodeId);
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