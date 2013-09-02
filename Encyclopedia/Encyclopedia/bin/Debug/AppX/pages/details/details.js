// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/details/details.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            ViewModels.loadDetails(options.articleId).then(
                function (list) {
                    WinJS.UI.processAll().then(function () {

                        var template = new WinJS.Binding.Template(null, {
                            href: "/pages/details/template.html"
                        });
                        var progress = document.getElementById("progress");
                        progress.innerHTML = "";
                        var container = document.getElementById("container");
                        template.render(list, container);
                        var msg = new Windows.UI.Popups.MessageDialog("Pleace try again later.");
                        msg.showAsync();
                    }
                );
                }, function (error) {
                    var msg = new Windows.UI.Popups.MessageDialog("Pleace try again later.");
                    msg.showAsync();
                });
        },

        //unload: function () {
        //    // TODO: Respond to navigations away from this page.
        //},

        //updateLayout: function (element, viewState, lastViewState) {
        //    /// <param name="element" domElement="true" />

        //    // TODO: Respond to changes in viewState.
        //}
    });
})();
