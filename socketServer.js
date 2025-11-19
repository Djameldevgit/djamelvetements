const User = require('./models/userModel'); // 🔹 Agregar import
let users = []

const EditData = (data, id, call) => {
    const newData = data.map(item => 
        item.id === id ? {...item, call} : item
    )
    return newData;
}

const SocketServer = (socket) => {
    // Connect - Disconnect
    socket.on('joinUser', async (user) => { // 🔹 Hacer async
        users.push({id: user._id, socketId: socket.id, followers: user.followers})
        
        // 🔹 ACTUALIZAR BASE DE DATOS - Usuario online
        try {
            await User.findByIdAndUpdate(user._id, {
                isOnline: true,
                lastConnectedAt: new Date(),
                lastOnline: new Date(),
                socketId: socket.id
            });
            
            // 🔹 NOTIFICAR a todos que este usuario está online
            socket.broadcast.emit('userOnline', { 
                userId: user._id,
                lastOnline: new Date()
            });
            
        } catch (err) {
            console.error('Error en joinUser:', err);
        }
    })

    socket.on('disconnect', async () => {
        const data = users.find(user => user.socketId === socket.id)
        if(data){
            // ... código existente ...
    
            // 🔹 VERIFICAR: ¿Se está ejecutando esta actualización?
            try {
                await User.findByIdAndUpdate(data.id, {
                    isOnline: false,
                    lastDisconnectedAt: new Date(),
                    lastOnline: new Date() // 🔹 Esto es importante
                });
                
               
                socket.broadcast.emit('userOffline', { 
                    userId: data.id,
                    lastOnline: new Date(),
                    lastDisconnectedAt: new Date()
                });
                
            } catch (err) {
                console.error('❌ Error en disconnect DB update:', err);
            }
    
            // ... resto del código ...
        }
    })

    // 🔹 AGREGAR evento de actividad
    socket.on('userActivity', async (userId) => {
        try {
            await User.findByIdAndUpdate(userId, {
                lastActivity: new Date(),
                lastOnline: new Date()
            });
        } catch (err) {
            console.error('Error en userActivity:', err);
        }
    })

    // TYPING - Funciones existentes
    socket.on('typing-start', (data) => {
        const user = users.find(user => user.id === data.recipient)
        user && socket.to(`${user.socketId}`).emit('typing-start-to-client', {
            sender: data.sender,
            chatId: data.chatId
        })
    })

    socket.on('typing-stop', (data) => {
        const user = users.find(user => user.id === data.recipient)
        user && socket.to(`${user.socketId}`).emit('typing-stop-to-client', {
            sender: data.sender,
            chatId: data.chatId
        })
    })

    // Likes - Funciones existentes
    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
        }
    })

    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
            })
        }
    })

    // Comments - Funciones existentes
    socket.on('createComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
            })
        }
    })

    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
            })
        }
    })

    // Follow - Funciones existentes
    socket.on('follow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
    })

    socket.on('unFollow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser)
    })

    // Notification - Funciones existentes
    socket.on('createNotify', msg => {
        const client = users.find(user => msg.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
    })

    socket.on('removeNotify', msg => {
        const client = users.find(user => msg.recipients.includes(user.id))
        client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)
    })

    // Message - Funciones existentes
    socket.on('addMessage', msg => {
        const user = users.find(user => user.id === msg.recipient)
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
    })

    // Check User Online / Offline - Funciones existentes
    socket.on('checkUserOnline', data => {
        const following = users.filter(user => 
            data.following.find(item => item._id === user.id)
        )
        socket.emit('checkUserOnlineToMe', following)

        const clients = users.filter(user => 
            data.followers.find(item => item._id === user.id)
        )

        if(clients.length > 0){
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', data._id)
            })
        }
    })

    // Call User - Funciones existentes
    socket.on('callUser', data => {
        users = EditData(users, data.sender, data.recipient)
        
        const client = users.find(user => user.id === data.recipient)

        if(client){
            if(client.call){
                socket.emit('userBusy', data)
                users = EditData(users, data.sender, null)
            }else{
                users = EditData(users, data.recipient, data.sender)
                socket.to(`${client.socketId}`).emit('callUserToClient', data)
            }
        }
    })

    socket.on('endCall', data => {
        const client = users.find(user => user.id === data.sender)

        if(client){
            socket.to(`${client.socketId}`).emit('endCallToClient', data)
            users = EditData(users, client.id, null)

            if(client.call){
                const clientCall = users.find(user => user.id === client.call)
                clientCall && socket.to(`${clientCall.socketId}`).emit('endCallToClient', data)

                users = EditData(users, client.call, null)
            }
        }
    })
}

module.exports = SocketServer