// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;
   
    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
            } else {
                var selectedItems = WinJS.Application.sessionState["selectedFiles"];
                if (selectedItems) {

                    var allSelections = [];
                    for (var i = 0; i < selectedItems.length; i++) {
                        allSelections.push(JSON.parse(selectedItems[i]));
                    }
                    Session.setAfterTerminationObject(allSelections);
                }
            }

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }

            args.setPromise(WinJS.UI.processAll().then(function () {
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    });

    WinJS.Application.onsettings = function (e) {
        e.detail.applicationcommands = {
            "privacyPolicy": {
                title: "Privacy Policy",
                href: "/pages/settings/privacyPolicy.html"
            }
        };

        WinJS.UI.SettingsFlyout.populateSettings(e);
    };

    app.oncheckpoint = function (args) {      
        app.sessionState.history = nav.history;
    };

    app.start();
})();
