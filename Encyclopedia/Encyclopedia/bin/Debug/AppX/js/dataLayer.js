//here we have all requests to db
(function () {

    var allFishes = [];
    var _homePage = 1;

    var generateModels = function (pageNumber) {
        //download page
        var downloadedPageAsJSON = APIRequests.getTest(pageNumber);
        //the new one
        allFishes = [];
        for (var i = 0; i < downloadedPageAsJSON.length; i++) {
            allFishes.push(new Models.FishModel(downloadedPageAsJSON[i].name,
                downloadedPageAsJSON[i].discription, downloadedPageAsJSON[i].imageURL));
        }
    }

    var getFishes = function (pageNumber) {
        generateModels(pageNumber);
        return allFishes;
    }

    //var addFish = function (computerModel) {
    //    computers.push(computerModel);
    //}
    //we can add voltes
    WinJS.Namespace.define("Data", {
        getFishes: getFishes,
    });

}());