
export const initialState = {
    isSaving: false,
    logHistory: [],
    categories: []
};

export const messageStates = [
    {message: 'SP 500', typeMessage: 'finance', channel: 'sms', user: '666d203e3819c898f4f2a43e', creationDate: new Date('2024-10-13 20:00:00'), _id: '1'},
    {message: 'SP 500', typeMessage: 'finance', channel: 'push notification', user: '666d203e3819c898f4f2a43e', creationDate: new Date('2024-10-13 20:00:00'), _id: '2'}, 
    {message: 'SP 500', typeMessage: 'finance', channel: 'push notification', user: '666f5feb6fa876beb65dd001', creationDate: new Date('2024-10-13 20:00:00'), _id: '3'}, 
    {message: 'SP 500', typeMessage: 'finance', channel: 'email', user: '666f5feb6fa876beb65dd001', creationDate: new Date('2024-10-13 20:00:00'), _id: '4'},
];

export const notificationWithLog = {
    isSaving: false,
    logHistory: [
        {message: 'SP 500', typeMessage: 'finance', channel: 'sms', user: '666d203e3819c898f4f2a43e', creationDate: new Date('2024-10-13 20:00:00'), _id: '1'},
    ],
    categories: []
}

export const categoriesState = [
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

export const sendMessageState = { category: 'sports', message: 'AC Milan won the derby!' };