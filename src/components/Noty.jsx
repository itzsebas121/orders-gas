import { useState } from 'react';

export function useNotification() {
    const [permission, setPermission] = useState(Notification.permission);

    const emitirNotificacion = (title, options = {}) => {
        if (permission === 'granted') {
            new Notification(title, options);
        } else if (permission === 'default') {
            Notification.requestPermission().then((newPermission) => {
                setPermission(newPermission);
                if (newPermission === 'granted') {
                    new Notification(title, options);
                } else {
                    alert('No se concedieron permisos de notificación.');
                }
            });
        } else {
            alert('Permisos de notificación denegados.');
        }
    };

    return { emitirNotificacion };
}
