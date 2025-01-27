'use strict';
import * as vscode from 'vscode';
import changeColors from './changeColors';
import getMapping from './getMapping';
import * as azdata from 'azdata';
import resetColors from './resetColors';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 50;

// This method is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {

    // When opening a new query, it can take a few milliseconds for the connection to be established, therefore retry here
    async function getConnectionWithRetry(retries = 0): Promise<azdata.connection.ConnectionProfile | undefined> {
        try {
            const connection = await azdata.connection.getCurrentConnection();
            if (connection) {
                return connection;
            } else {
                if (retries < MAX_RETRIES) {
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS)); // Wait before retrying
                    return getConnectionWithRetry(retries + 1); // Recursive call for retry
                } else {
                    return undefined; // Return undefined after max retries
                }
            }
        } catch (error) {
            if (retries < MAX_RETRIES) {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                return getConnectionWithRetry(retries + 1);
            } else {
                return undefined; // Return undefined after max retries
            }
        }
    }

    // Trigger color change when the active tab changes
    const disposable = vscode.window.onDidChangeActiveTextEditor(async (e: vscode.TextEditor | undefined) => {

        if (!e) {
            return null;
        }

        const connection = await getConnectionWithRetry();
        if (!connection) {
            // If there is no connection, change the colors to default
            await Promise.all([
                resetColors(),
            ]);
        }
        else {
            const mapping = getMapping(connection.serverName);
            try {
                await Promise.all([
                    changeColors(mapping && mapping.color),
                ]);
            } catch (error) {
                console.log("ERROR", error);
            }
        }
    });
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
    changeColors();
}