
export const PubSub = (function () {
    const events = {};
    const subscribe = function (event, func) {
        if (!events[event]) {
            events[event] = []
        };
        events[event].push(func);
    };
    const unsubscribe = function (event, func) {
        if (events[event]) {
            events[event].filter((f) => f !== func);
        }
    };
    const publish = function (event, data) {
        if (events[event]) {
            events[event].forEach( (func) => func(data) );
            
        };
    };
    const eventList = () => events;

    return  { subscribe, unsubscribe, publish, eventList };

})();