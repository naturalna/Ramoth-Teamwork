(function () {

    var goToPage = function (pageIndex) {
        WinJS.Navigation.navigate("/pages/fish/fish.html", {
            pageIndex: pageIndex
        });
    }

    WinJS.Utilities.markSupportedForProcessing(goToPage);

    WinJS.Namespace.define("CodeBehind", {
        //callLoadFishesHomePage: function () {
        //    ViewModels.loadFish();
        //},

        goToPage: goToPage
    })
})();