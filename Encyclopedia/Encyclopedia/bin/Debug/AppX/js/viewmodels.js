(function () {
    var fishList = new WinJS.Binding.List([]);

    var loadFish = function () {
        var fishDTOs = Data.getFishes();

        var currentCount = fishList.dataSource.list.length
        fishList.dataSource.list.splice(0, currentCount);

        for (var i = 0; i < fishDTOs.length; i++) {
            fishList.push(fishDTOs[i]);
        }
    }

    WinJS.Namespace.define("ViewModels", {
        loadFish: loadFish,
        fishes: fishList,
        //addFish: function (name, discription, imageURL) {
        //    Data.addFish(new Models.FishModel(name, discription, imageURL));
        //}
    });
})();
