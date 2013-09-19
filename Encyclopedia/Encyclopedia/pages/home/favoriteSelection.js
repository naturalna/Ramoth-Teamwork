(function () {
    var selectedFiles = [];
    var addSelectionToFavorite = function () {
        selectedFiles = [];
        var triggeringListView = this.winControl;
        triggeringListView.selection.getItems().then(function (items) {
            items.forEach(function (item) {
                selectedFiles.push(JSON.stringify(item.data.id));
            });

            WinJS.Application.sessionState["selectedFiles"] = selectedFiles;
        })
    };

    var favoriteFileSaver = function () {
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
        WinJS.Application.sessionState["selectedFiles"] = selectedFiles;
    };

    var showFavorite = function () {
        WinJS.Navigation.navigate("/pages/favoriteList/favoriteList.html", {
        });
    };

    var genrateWord = function () {

        var savePicker = new Windows.Storage.Pickers.FileSavePicker();
        savePicker.defaultFileExtension = ".txt"
        savePicker.fileTypeChoices.insert("Plain Text", [".txt"])

        savePicker.suggestedFileName = "New Document";
        if (selectedFiles.length <= 0) {
            var msg = new Windows.UI.Popups.MessageDialog("No file found");
            msg.showAsync();
        } else {
            savePicker.pickSaveFileAsync().then(function (file) {

                for (var i = 0; i < selectedFiles.length; i++) {
                    var objectIndex = JSON.parse(selectedFiles[i]);

                    Data.getFishByID(objectIndex).then(function (objectSelect) {
                        ViewModels.loadDetails(objectSelect[0])
                            .then(function (data) {
                                Windows.Storage.FileIO.writeTextAsync(file, data.description);
                            });
                    }, function (error) {
                        var msg = new Windows.UI.Popups.MessageDialog("An error has occurred. Pleace try again later.");
                        msg.showAsync();
                    });
                }
            }, function (error) {
                var msg = new Windows.UI.Popups.MessageDialog("No file found");
                msg.showAsync();
            }).then(function () {
                selectedFiles = [];
                lView = document.getElementById("listView").winControl;
                lView.selection.clear();
                WinJS.Application.sessionState["selectedFiles"] = selectedFiles;
            }, function (error) {
                var msg = new Windows.UI.Popups.MessageDialog("An error has occurred. Pleace try again later.");
                msg.showAsync();
            });
        }
    };

    document.getElementById("showFavorite").addEventListener("click", showFavorite);
    document.getElementById("cmdAdd").addEventListener("click", favoriteFileSaver);
    document.getElementById("saveAsHTML").addEventListener("click", genrateWord);

    WinJS.Utilities.markSupportedForProcessing(addSelectionToFavorite);
    WinJS.Utilities.markSupportedForProcessing(showFavorite);

    WinJS.Namespace.define("FavoriteSelection", {
        addSelectionToFavorite: addSelectionToFavorite,
    })
})();