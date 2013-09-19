// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/favoriteList/favoriteList.html", {
        ready: function (element, options) {
            ViewModels.getFavorite().done(function (bindingList) {
                var listv = document.getElementById("listView").winControl;
                listv.itemDataSource = bindingList.dataSource;
            }, function (error) {
                var msg = new Windows.UI.Popups.MessageDialog("An error has occurred. Pleace try again later.");
                msg.showAsync();
            });
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
