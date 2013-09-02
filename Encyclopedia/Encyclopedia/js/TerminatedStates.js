(function () {
    var _sessionObjects = [];
    var _afterTermination = [];

    setSessionObject = function (object) {
        sessionObjects = object;
    };

    getSessionObject = function () {
        return _sessionObjects;
    };

    getAfterTerminationObject = function () {
        return _afterTermination;
    };

    setAfterTerminationObject = function (object) {
        _afterTermination = object;
    };

    WinJS.Namespace.define("Session", {
        setSessionObject: setSessionObject,
        getSessionObject: getSessionObject,
        getAfterTerminationObject: getAfterTerminationObject,
        setAfterTerminationObject: setAfterTerminationObject,
    });

}());