//here we have all requests to db
(function () {

    var _homePage = 1;
    var promiseArray = [];
    var allFishes = [];
    var promise = [];
    var article = null;

    var generateModels = function (pageNumber) {
        allFishes = [];
        return new WinJS.Promise(function (succses) {
            promise[0] = new WinJS.Promise(function (succses, error) {
                APIRequests.getFishesByPage(pageNumber).then(function (jsonResult) {
                    //item 30
                    find(jsonResult, allFishes);
                    return new WinJS.Promise.join(promiseArray).then(
                        function (data) {
                            succses();
                        });
                })
            });

            new WinJS.Promise.join(promise).then(function () {
                succses(allFishes);
            });
        });
    };

    var find = function (jsonResult, downloadedPageAsJSON) {
        return new WinJS.Promise(function (success, error) {
            for (var i = 0; i < jsonResult.results.length; i++) {
                var item = jsonResult.results[i];

                var promise = APIRequests.getFishData(item.id).then(function (json) {

                    for (var j = 0; j < json.dataObjects.length; j++) {
                        if (json.dataObjects[j].eolMediaURL != undefined) {
                            allFishes.push({
                                "name": json.dataObjects[j].title,
                                "discription": json.dataObjects[j].description,
                                "imageURL": json.dataObjects[j].eolMediaURL
                            });
                            success();
                            break;
                        }
                    }
                });
                promiseArray.push(promise);
            }
        });
    };

    var takeModels = function (pageNumber) {
        allFishes = [];
        return new WinJS.Promise(function (succses) {
            promise[0] = new WinJS.Promise(function (succses, error) {
                APIRequests.getFishesByPage(pageNumber).then(function (jsonResult) {

                    for (var j = 0; j < jsonResult.results.length; j++) {
                        allFishes.push({
                            "name": jsonResult.results[j].title,
                             "id": jsonResult.results[j].id,
                        });
                    }
                })
                    .then(function () { succses(); });
            });

            new WinJS.Promise.join(promise).then(function () {
                succses(allFishes);
            });
        });
    };

    var getDetails = function (id) {
        article = null;
        return new WinJS.Promise(function (success, error) {

            var promise = APIRequests.getFishData(id).then(function (json) {

                for (var j = 0; j < json.dataObjects.length; j++) {
                    if (json.dataObjects[j].eolMediaURL != undefined) {
                        article ={
                            "name": json.dataObjects[j].title,
                            "discription": json.dataObjects[j].description,
                            "imageURL": json.dataObjects[j].eolMediaURL
                        };

                        var patt = new RegExp(pattern, "igm");

                        article.discription
                        success(article);
                        break;
                    }
                }
            });
        });
    };

    //we can add voltes
    WinJS.Namespace.define("Data", {
        getFishes: takeModels,
        allFishes: allFishes,
        getDetails: getDetails,
        article: article
    });

}());