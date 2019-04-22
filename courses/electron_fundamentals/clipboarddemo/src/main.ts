import { app, Tray, Menu, MenuItemConstructorOptions, clipboard, Clipboard, globalShortcut, GlobalShortcut } from 'electron';
import path from 'path';

const STACK_SIZE: number = 3;
const ITEM_MAX_LENGTH: number = 20;

function addToStack(item: string, stack: string[]): string[] {
    return [item].concat(stack.length >= STACK_SIZE ? stack.slice(0, -1) : stack);
}

function formatMenuTemplateForStack(clipboard: Clipboard, stack: string[]): MenuItemConstructorOptions[] {
    return stack.map((item: string, i: number) => ({
        label: `Copy: ${formatItem(item)}`,
        click: (_: any) => clipboard.writeText(item),
        accelerator: `CmdOrCtrl+Alt+${i + 1}`
    }));
}

function formatItem(item: string): string {
    return item && item.length > ITEM_MAX_LENGTH
    ? item.substr(0, ITEM_MAX_LENGTH) + '...'
    : item;
}

function clipboardChangeListener(clipboard: Clipboard, onChange: Function): void {
    let cache: string = clipboard.readText();
    let latest: string = '';

    setInterval(_ => {
        latest = clipboard.readText();
        if (latest !== cache) {
            cache = latest;
            onChange(cache);
        }
    }, 1000);
}

function registerGlobalShortcuts(globalShortcut: GlobalShortcut, clipboard: Clipboard, stack: string[]) {
    globalShortcut.unregisterAll();

    stack.forEach((item: string, i: number) => {
        globalShortcut.register(`CmdOrCtrl+Alt+${i + 1}`, (_: any) => {
            clipboard.writeText(item);
        });
    });
}

app.on('ready', (_: any) => {
    let stack: string[] = [];

    const menuTemplate: MenuItemConstructorOptions[] = [
        {label: '<Empty>', enabled: false}
    ];

    const tray: Tray = new Tray(path.join('src', 'trayIcon.png'));
    tray.setContextMenu(Menu.buildFromTemplate(menuTemplate)); 

    clipboardChangeListener(clipboard, (text: string) => {
        stack = addToStack(text, stack);
        tray.setContextMenu(Menu.buildFromTemplate(formatMenuTemplateForStack(clipboard, stack)));
        registerGlobalShortcuts(globalShortcut, clipboard, stack);
    });
});

app.on('will-quit', (_: any) => {
    globalShortcut.unregisterAll();
});