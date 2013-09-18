(function () {
    var allPagesDynamicList = new WinJS.Binding.List([]);

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

    var loadDetails = function (description) {
        return new WinJS.Promise(function (succsec) {
            var staticHTML = toStaticHTML(description.description);
            var article = { "description": staticHTML, "imageURL": description.imageURL };
            var detail = WinJS.Binding.as(article);
            succsec(detail);
        });
    }

    var getFavorite = function () {
        return new WinJS.Promise(function (success) {
            var observableFiles = new WinJS.Binding.List([]);

            Data.getFavoriteModels().then(function (models) {
                for (var i = 0; i < models.length; i++) {
                    observableFiles.push({
                        "title": models[i].Title,
                        "description": models[i].Description,
                        "imageURL": models[i].ImageURL,
                    });
                }

                success(observableFiles);
            });
        });
    }

    var searchQuery = WinJS.Binding.as({ queryText: "" });
    var fishList = new WinJS.Binding.List([]);

    var searchList = new WinJS.Binding.List([]);

    var searchForFishes = function (queryText) {
        Data.search(queryText).then(function (searchedFishes) {
            searchList.splice(0, fishList.length);

            for (var i = 0; i < searchedFishes.length; i++) {
                searchList.push(searchedFishes[i]);
            }
        });
    };

    var submitSearchText = function (text) {
        searchQueryText.queryText = text;
        fishList.notifyReload();
    }

    WinJS.Namespace.define("ViewModels", {
        allPagesDynamicList: allPagesDynamicList,
        loadPart: loadPart,
        loadDetails: loadDetails,
        getFavorite: getFavorite,

        submitSearchText: submitSearchText,
        searchList: searchList,
        searchQuery: searchQuery,
        searchForFishes: searchForFishes
    });
})();
