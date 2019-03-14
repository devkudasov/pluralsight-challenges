import { app, BrowserWindow, Menu, MenuItemConstructorOptions, globalShortcut } from 'electron';
import { QUIT } from './shortcuts';

const appName: string = app.getName();

app.on('ready', (_: any) => {
    new BrowserWindow();

    globalShortcut.register(QUIT, app.quit);

    const menuTemplate: MenuItemConstructorOptions[] = [
        {
            label: appName,
            submenu: [
                {
                    label: `About ${appName}`,
                    click: (): void => {},
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    label:  'Quit',
                    click: app.quit,
                    accelerator: QUIT
                }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});