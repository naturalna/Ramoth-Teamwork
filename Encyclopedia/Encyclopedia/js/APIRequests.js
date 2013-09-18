(function () {
    function getAllFishesMy(page) {
        if (typeof page !== 'number') {
            page = 1;
        }
        var queryUrl =
            "http://fishencyclopedia.apphb.com/api/Page/getbypage?id=" + page;
        return WinJS.xhr({
            type: "GET",
            url: queryUrl,
            responseType: "json",
            headers: { "Content-Type": "application/json" },
        }).then(function (data) {
            var result = getFishes(data);

            return result;
        },function (error) {              
            var msg = new Windows.UI.Popups.MessageDialog("Lost internet connection");
            msg.showAsync();
        });
    };

    function queryForFishesSearch(searchQuery) {
        var queryUrl =
            "http://fishencyclopedia.apphb.com/api/article/?value=" + searchQuery;

        return WinJS.xhr({
                type: "GET",
                url: queryUrl, 
                responseType: "json",
                headers: { "Content-Type": "application/json" }
            }).then(function (data) {
                var result = getFishes(data);

                return result
        });
    };

    var getFishes = function (data) {
        var parsedData = JSON.parse(data.responseText);       
        return parsedData;
    };

    var getFavorite = function (id) {
        var queryUrl =
            "http://fishencyclopedia.apphb.com/api/Article/getbyid?id=" + id;
        return WinJS.xhr({
            type: "GET",
            url: queryUrl,
            responseType: "json",
            headers: { "Content-Type": "application/json" }
        }).then(function (data) {
            var result = getFishes(data);
            return result;
        });
    };

    WinJS.Namespace.define("APIRequests", {
        queryForFishesSearch: queryForFishesSearch,//done
        getAllFishesMy: getAllFishesMy,//new
        getFavorite: getFavorite,
    });
}());