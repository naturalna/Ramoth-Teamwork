﻿(function () {
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

            //sessionState
            var session = Session.getAfterTerminationObject();
            if (session.length > 0) {
                HomeCodeBehind.selectAfterTermination(session);
                Session.setAfterTerminationObject([]);
            }
            //----------------
        },
        function (error) {
            var msg = new Windows.UI.Popups.MessageDialog("Pleace try again later.");
            msg.showAsync();
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

    var getFavorite = function () {
        return new WinJS.Promise(function (success) {
            var models = Data.getFavoriteModels();
            var observableFiles = new WinJS.Binding.List([]);

            for (var i = 0; i < models.length; i++) {
                observableFiles.push(models[i]);
            }

            success(observableFiles);
        });
    }

    // things for the search contract
    var searchQueryText = WinJS.Binding.as({ queryText: "" });
    var fishList = new WinJS.Binding.List([]);

    var searchList = new WinJS.Binding.List([]);

    var searchQuery = function (queryText) {
        Data.search(queryText).then(function (searchedFishes) {
            searchList.splice(0, fishList.length);

            for (var i = 0; i < searchedFishes.length; i++) {
                searchList.push(searchedFishes[i]);
            }
        });
    };

    var changeSearchQuery = function (text) {
        searchQueryText.queryText = text;
        fishList.notifyReload();
    }

    WinJS.Namespace.define("ViewModels", {
        loadFish: loadFish,
        homeList: homeList,
        allPagesDynamicList: allPagesDynamicList,
        loadPart: loadPart,
        loadDetails: loadDetails,
        getFavorite: getFavorite,

        submitSearchText: changeSearchQuery,
        searchList: searchList,
        searchQuery: searchQueryText,
        searchForFishes: searchQuery
    });
})();
