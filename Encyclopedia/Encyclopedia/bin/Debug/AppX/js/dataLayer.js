//here we have all requests to db
(function () {
    //this must be in separeted class
    //var downloadRequest = function () {
    //    //TODO
    //    //in response 1 page (30)
    //    //return jsonObjec with name discription and image url.It may contains something else
    //    return [{ name: "testName", discription: "tessssssssssssssst", imageURL: "" }];
        
    //};
    var downloaded = APIRequests.queryForFishesSearch(1);
    var allFishes = [];

    var generateModels = function () {
        var downloadedPageAsJSON = downloadRequest();

        for (var i = 0; i < downloadedPageAsJSON.length; i++) {
            allFishes.push(new Models.FishModel(downloadedPageAsJSON.name,
                downloadedPageAsJSON.discription, downloadedPageAsJSON.imageURL));
        }
    }

    var getFishes = function () {
        return allFishes;
    }
    
    //var addFish = function (computerModel) {
    //    computers.push(computerModel);
    //}
    //we cam add voltes
    WinJS.Namespace.define("Data", {
        getFishes: getFishes,
    });
}());