
export const initialState = {
        isSaving: false,
        categories: [],
        channels: []
};

export const Categories = [
    {
        "_id": "666fae0e34834339f2a3fe80",
        "messageType": "Sports",
    },
    {
        "_id": "666fae3234834339f2a3fe84",
        "messageType": "Movies",
    },
    {
        "_id": "666fae2b34834339f2a3fe82",
        "messageType": "Finance",
    }
];

export const Channels = [
    {
        "_id": "666faeb3d86a5631f7c4f437",
        "notificationType": "SMS",
    },
    {
        "_id": "666faedad86a5631f7c4f439",
        "notificationType": "Email",
    },
    {
        "_id": "666faee8d86a5631f7c4f43b",
        "notificationType": "Push Notification",
    }
];

export const testUser = {
    name: 'Jose Pablo',
    email: 'jose.pablo@prueba.com',
    phoneNumber: '91905920',
    subscribed: ['sports'],
    channels: ['sms']
};