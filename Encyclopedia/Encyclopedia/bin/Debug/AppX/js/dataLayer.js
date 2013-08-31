//here we have all requests to db
(function () {


    var _homePage = 1;
   // var downloadedPageAsJSON = [];
    var allFishes = new WinJS.Binding.List([]);
    
    var getAll = function (pageNumber) {
        return new WinJS.Promise(function (success) {
            generateModels(pageNumber).then(function (data) {
                success(data);
            });
        });
    }

    var generateModels = function (pageNumber) {
        return new WinJS.Promise(function (succses, error) {
            //------------------------------------------------------
            APIRequests.getFishesByPage().then(function (jsonResult) {
                //item 30
                find(jsonResult, allFishes).then(function (data) {
                    return new WinJS.Promise(function (succ) {
                        
                        for (var i = 0; i < data.length; i++) {
                            allFishes.push(new Models.FishModel(data[i].name,
                                data[i].discription, data[i].imageURL));
                        }

                        succ(allFishes);
                    })
                }).then(function (data) {
                    succses(data);
                });
            })
            //---------------------------------------------
        });
    };

    var find = function (jsonResult, downloadedPageAsJSON) {
        return new WinJS.Promise(function (success, error) {
            for (var i = 0; i < jsonResult.results.length; i++) {

                var item = jsonResult.results[i];

                 APIRequests.getFishData(item.id).then(function (json) {

                    for (var j = 0; j < json.dataObjects.length; j++) {
                        if (json.dataObjects[j].mediaURL !== "undefind") {
                            allFishes.push({
                                "name": json.dataObjects[j].title,
                                "discription": json.dataObjects[j].description,
                                "imageURL": json.dataObjects[j].mediaURL
                            });


                        }

                    }
                    
                })
            }

          
        });
    };


    //we can add voltes
    WinJS.Namespace.define("Data", {
        getFishes: generateModels,
    });

}());