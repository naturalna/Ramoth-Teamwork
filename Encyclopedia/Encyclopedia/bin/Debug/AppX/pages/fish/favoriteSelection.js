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

    var genrateWord = function (event) {

        var savePicker = new Windows.Storage.Pickers.FileSavePicker();
        savePicker.defaultFileExtension = ".html"
        savePicker.fileTypeChoices.insert("Plain Text", [".html"])

        savePicker.suggestedFileName = "New Document";

        savePicker.pickSaveFileAsync().then(function (file) {
            
            
            for (var i = 0; i < selectedFiles.length; i++) {
                var objectSelect = JSON.parse(selectedFiles[i]);
                ViewModels.loadDetails(objectSelect.id).then(function (data) {
                    Windows.Storage.FileIO.writeTextAsync(file, data.discription);
                });

            }
            selectedFiles = [];
            lView = document.getElementById("listView").winControl;
            lView.selection.clear();

        })
    };

    document.getElementById("cmdAdd").addEventListener("click", favoriteFileSaver);
    document.getElementById("saveAsHTML").addEventListener("click", genrateWord);

    WinJS.Utilities.markSupportedForProcessing(addSelectionToFavorite);

    WinJS.Namespace.define("FavoriteSelection", {
        addSelectionToFavorite: addSelectionToFavorite,
        genrateWord: genrateWord,
    })
})();