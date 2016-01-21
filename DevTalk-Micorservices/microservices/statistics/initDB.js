module.exports = {
  initDB : function(Event){
    var EVENTTYPE = [];
    EVENTTYPE.LOGIN = 'LOGIN';
    EVENTTYPE.REGISTER = 'REGISTER';

    //Initial save some events
    Event.find(function (err, events) {
        if (events.length === 0) {
            var getRandomValue = function(min, max){
              return Math.floor(((Math.random() * (max || 500)) + (min || 1)));
            };
            var error = function(err){if (err) {
                console.log("failed to save event: " + err);
            }};
            var d = new Date();
            d.setDate(1);
            d.setMonth(d.getMonth() - 6);
            var currDate = new Date();
            while(d < currDate){
                for(var index = 0; index <= getRandomValue(2,30); index++){
                  d.setDate(getRandomValue(0,29));
                  var event = new Event({
                      email: "dummy"+index+"@example.com",
                      type: EVENTTYPE.REGISTER,
                      date: (new Date(d.getTime()))
                  });
                  event.save(error);
                }
                for(var index = 0; index <= getRandomValue(2,90); index++){
                  d.setDate(getRandomValue(0,29));
                  var event = new Event({
                      email: "dummy"+index+"@example.com",
                      type: EVENTTYPE.LOGIN,
                      date: (new Date(d.getTime()))
                  });
                  event.save(error);
                }
                d.setMonth(d.getMonth() +1);
            }
            Event.count({},function (err, result) {
              console.log(result + " events saved");
            });
        }
    });
  }
};
