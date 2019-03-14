import { app, Tray, Menu, MenuItemConstructorOptions } from 'electron';
import path from 'path';

app.on('ready', (_: any) => {
    const systemTray = new Tray(path.join('src', 'tray-icon.png'));
    
    const contextSystemTrayMenuTemplate: MenuItemConstructorOptions[] = [
        {
            label: 'Wow',
            click: (): void => console.log('Wow')
        },
        {
            label: 'Awesome',
            click: (): void => console.log('Awesome')
        }
    ];

    const contextSystemTrayMenu: Menu = Menu.buildFromTemplate(contextSystemTrayMenuTemplate);

    systemTray.setContextMenu(contextSystemTrayMenu);
    systemTray.setToolTip('Super power is here');
});