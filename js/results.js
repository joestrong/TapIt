var counters = new Counters();
var countersview = new CountersView({ collection: counters });

var protocol = 'http://',
    host = protocol + window.location.host,
    socket = io.connect(host);

socket.on('tap', function (data) {
    var name = data.name,
        counter = counters.get(name);
    if(counter){
        counter.increment();
    }else{
        counters.add({ id: name, name: name });
    }
});