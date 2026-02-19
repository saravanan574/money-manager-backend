
function communitySocket(io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join_community', (communityId) => {
      socket.join(communityId);
      console.log(`User ${socket.id} joined community ${communityId}`);
    });

    socket.on('leave_community', (communityId) => {
      socket.leave(communityId);
      console.log(`User ${socket.id} left community ${communityId}`);
    });

    socket.on('send_message', (data) => {
      // In a real app, save message to DB here
      io.to(data.communityId).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

module.exports = communitySocket;
