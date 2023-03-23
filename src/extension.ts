import * as vscode from 'vscode';

const config = vscode.workspace.getConfiguration();
const excluded = config.get('files.exclude', {} as Record<string, boolean>);

const exclude = (): Thenable<any> => {
	excluded['**/node_modules'] = true;
	excluded['**/es'] = true;
	excluded['**/dist'] = true;
	excluded['**/src/.umi'] = true;
	return config.update('files.exclude', excluded);
};

const include = (): Thenable<any> => {
	excluded['**/node_modules'] = false;
	excluded['**/es'] = false;
	excluded['**/dist'] = false;
	excluded['**/src/.umi'] = false;
	return config.update('files.exclude', excluded);
};

export function activate(context: vscode.ExtensionContext) {
	const command: string = 'node-modules-folder.fold';
	const handler = async (...args: any[]): Promise<any> => {
		await exclude();
		await include();
	};
	context.subscriptions.push(vscode.commands.registerCommand(command, handler));
}

export function deactivate() {
	console.log(`[${new Date().toLocaleString()}]: node-modules-folder插件停用。`);
}
