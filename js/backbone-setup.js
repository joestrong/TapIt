var gameon = true;

var Counter = Backbone.Model.extend({
    defaults: {
        total: 0
    },
    initialize: function(){
        this.set('color', this.randomColor());
    },
    randomColor: function(){
        var number = function(){
            return Math.round(Math.random() * 255);
        };
        return 'rgb(' + number() + ',' + number() + ',' + number() + ')' ;
    },
    increment: function() {
        if(gameon === true){
            var total = this.get('total');
            total += 1;
            this.set('total', total);
            this.checkTotal();
        }
    },
    checkTotal: function(){
        var total = this.get('total');
        if(total >= 100){
            this.finish();
        }
    },
    finish: function(){
        this.collection.finish(this);
    }
});

var Counters = Backbone.Collection.extend({
    model: Counter
});

var CountersView = Backbone.View.extend({

    el: ".counters",

    initialize: function() {
        var that = this;
        this.collection.on("add", this.addItem, this);
        this.collection.finish = function(model){
            gameon = false;
            that.finish(model);
        };
        this.render();
    },

    render: function() {
        var that = this;
        this.$el.empty();
        _.each(this.collection.models, function(item){
            var counterview = new CounterView({ model: item });
            that.$el.append(counterview.el);
        });
    },

    addItem: function(item){
        var counterview = new CounterView({ model: item });
        this.$el.append(counterview.el);
    },

    finish: function(model){
        this.$el.empty();
        this.$el.html('<p class="finish">' + model.get('name') + ' WON!</p>')
    }

});

var CounterView = Backbone.View.extend({

    tagName: "div",

    className: "counter",

    initialize: function() {
        this.listenTo(this.model, "change", this.animate);
        this.render();
    },

    render: function() {
        this.$el.empty();
        var barcontainer = $('<div/>', { class: 'barcontainer' });
        var bar = $('<div/>', { class: 'bar' });
        bar.css('background', this.model.get('color'));
        barcontainer.append(bar);
        this.$el.append('<div class="name">' + this.model.get('name') +'</div>');
        this.$el.append(barcontainer);
        return this;
    },

    animate: function(){
        var bar = this.$el.find('.bar');
        bar.css('height', this.model.get('total') + '%');
    }

});