(function () {
    var homeList = new WinJS.Binding.List([]);
    var allPagesDynamicList = new WinJS.Binding.List([]);

    var loadFish = function () {
        Data.getFishes(1).then(
        function (fishDTOs) {

            var currentCount = homeList.dataSource.list.length
            homeList.dataSource.list.splice(0, currentCount);

            for (var i = 0; i < fishDTOs.length; i++) {
                homeList.push(fishDTOs[i]);
            }
            allPagesDynamicList[0] = homeList;
        });

    }

    var loadPart = function (partNumber) {
        return new WinJS.Promise(function (succsec) {
            Data.getFishes(partNumber).then(function (part) {
                var parts = new WinJS.Binding.List([]);

                for (var i = 0; i < part.length; i++) {
                    parts.push(part[i]);
                }

                allPagesDynamicList[partNumber] = parts;
                succsec(parts);
            });
        });      
    }

    var loadDetails = function (id) {
        return new WinJS.Promise(function (succsec) {
            Data.getDetails(id).then(function (article) {
               // var details = new WinJS.Binding.List([]);
                // details.push(article);
                var detail = WinJS.Binding.as(article);
                succsec(detail);
            });
        });
    }

    WinJS.Namespace.define("ViewModels", {
        loadFish: loadFish,
        homeList: homeList,
        allPagesDynamicList: allPagesDynamicList,
        loadPart: loadPart,
        loadDetails: loadDetails,
    });
})();
