(function () {
    var selectedFiles = [];
    var addSelectionToFavorite = function (event) {
        var triggeringListView = this.winControl;

        triggeringListView.selection.getItems().then(function (items) {
            console.log("Selected Items: ");
            items.forEach(function (item) {
                selectedFiles.push(JSON.stringify(item.data));
                //TODO
                //sessionstate
            });
        })
    };

    var favoriteFileSaver = function (event) {
        var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
        var lastFavoriteList = roamingSettings.values['favoriteList'];
        if (lastFavoriteList === undefined) {
            lastFavoriteList = [];
        } else {
            lastFavoriteList = JSON.parse(lastFavoriteList);
        }

        for (var i = 0; i < selectedFiles.length; i++) {
            lastFavoriteList.push(selectedFiles[i]);
        }

        selectedFiles = [];

        roamingSettings.values['favoriteList'] = JSON.stringify(lastFavoriteList);

        lView = document.getElementById("listView").winControl;
        lView.selection.clear();
    };

    var showFavorite = function (event) {

        WinJS.Navigation.navigate("/pages/favoriteList/favoriteList.html", {
        });

    };

    document.getElementById("showFavorite").addEventListener("click", showFavorite);
    document.getElementById("cmdAdd").addEventListener("click", favoriteFileSaver);

    WinJS.Utilities.markSupportedForProcessing(addSelectionToFavorite);
    WinJS.Utilities.markSupportedForProcessing(showFavorite);

    WinJS.Namespace.define("FavoriteSelection", {
        addSelectionToFavorite: addSelectionToFavorite,
    })
})();