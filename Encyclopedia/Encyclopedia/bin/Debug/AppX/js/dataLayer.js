//here we have all requests to db
(function () {
    var allFishes = [];
    var promise = [];
    var article = null;
    var favoritePromise = [];

    var getFishes = function (pageNumber) {
        allFishes = [];
        return new WinJS.Promise(function (succses) {
            promise[0] = new WinJS.Promise(function (succses, error) {
                APIRequests.getAllFishesMy(pageNumber).then(function (jsonResult) {
                    if (jsonResult != undefined && jsonResult.length == 0) {
                        var msg = new Windows.UI.Popups.MessageDialog("Lost database connection");
                        msg.showAsync();
                    }

                    if (jsonResult != undefined && jsonResult.length != 0) {

                        for (var j = 0; j < jsonResult[0].articles.length; j++) {
                            allFishes.push({
                                "name": jsonResult[0].articles[j].Title,
                                "id": jsonResult[0].articles[j].Id,
                                "imageURL": jsonResult[0].articles[j].ImageURL,
                                "description": jsonResult[0].articles[j].Description,
                            });
                        }
                    }
                })
                    .then(function () { succses(); });
            });

            new WinJS.Promise.join(promise).then(function () {
                succses(allFishes);
            });
        });
    };

    var getFavoriteModels = function () {
        var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
        var lastFavoriteList = roamingSettings.values['favoriteList'];
        var result = [];

        if (lastFavoriteList === undefined) {
            lastFavoriteList = [];
        } else {
            var allFiles = JSON.parse(lastFavoriteList);//here are id

            for (var j = 0; j < allFiles.length; j++) {
                favoritePromise.push(APIRequests.getFavorite(allFiles[j]).then(function (article) {
                    result.push(article[0]);
                }));
            }
        }

        return new WinJS.Promise.join(favoritePromise).then(function () {
            return result;
        });
    };


    var search = function (queryText) {
        var x = APIRequests.queryForFishesSearch(queryText)
            .then(function (jsonResult) {
                searchedFishes = [];

                for (var j = 0; j < jsonResult.length; j++) {
                    searchedFishes.push({
                        "name": jsonResult[j].Title,
                        "description": jsonResult[j].Description,
                        "imageURL": jsonResult[j].ImageURL,
                    });
                }
                return searchedFishes;
            })

        return x;
    };

    var foundFishById = [];
    var getFishByID = function (id) {
        var x = APIRequests.getFavorite(id)
            .then(function (jsonResult) {
                foundFishById = [];
                for (var j = 0; j < jsonResult.length; j++) {
                    foundFishById.push({
                        "name": jsonResult[j].Title,
                        "description": jsonResult[j].Description,
                        "imageURL": jsonResult[j].ImageURL,
                    });
                }
                return foundFishById;
            })

        return x;
    }

    WinJS.Namespace.define("Data", {
        getFishes: getFishes,
        allFishes: allFishes,
        article: article,
        getFavoriteModels: getFavoriteModels,
        search: search,
        getFishByID: getFishByID,
    });
}());