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
            //check for index
            //home page at index 0
            allPagesDynamicList[0] = homeList;
        });

    }

    var loadPart = function (partNumber) {
        var part = Data.getFishes(partNumber);
        allPagesDynamicList[partNumber] = part;
        last = part;
    }

    WinJS.Namespace.define("ViewModels", {
        loadFish: loadFish,
        homeList: homeList,
        allPagesDynamicList: allPagesDynamicList,
        loadPart: loadPart,
        //addFish: function (name, discription, imageURL) {
        //    Data.addFish(new Models.FishModel(name, discription, imageURL));
        //}
    });
})();
