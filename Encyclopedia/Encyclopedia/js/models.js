(function () {

    var FishModel =
        WinJS.Class.define(function (name, discription, imageURL) {
            this.name = name;
            this.discription = discription;
            this.imageURL = imageURL;
        }, {
            name: "",
            discription: "",
            imageURL: "",
        })

    WinJS.Namespace.define("Models", {
        FishModel: FishModel,
    })
})();