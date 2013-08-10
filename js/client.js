var protocol = 'http://',
    host = protocol + window.location.host,
    socket = io.connect(host);

var player = {};

var btnJoin = document.querySelector('#join'),
    txtName = document.querySelector('#name'),
    join = document.querySelector('.join'),
    game = document.querySelector('.game');

btnJoin.onclick = function(){
    if(txtName != ''){
        player.name = txtName.value;
        join.style.display = 'none';
        game.style.display = 'block';
    }
};

game.onclick = function(){
    if(player.name){
        socket.emit('tap', { name: player.name });
    }
};