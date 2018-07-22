// *******************************************
// My Awesome Extension
// *******************************************

//<script src="/js/Autodesk.ADN.Viewing.Extension.Color.js"></script>
var _viewer;
var HexDecimal1 = ""
var link = { }
function parseQuery(search) {

    var args = search.substring(1).split('&');

    var argsParsed = {};

    var i, arg, kvp, key, value;

    for (i = 0; i < args.length; i++) {

        arg = args[i];

        if (-1 === arg.indexOf('=')) {

            argsParsed[decodeURIComponent(arg).trim()] = true;
        }
        else {

            kvp = arg.split('=');

            key = decodeURIComponent(kvp[0]).trim();

            value = decodeURIComponent(kvp[1]).trim();

            argsParsed[key] = value;
        }
    }

    return argsParsed;
}


function MyAwesomeExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);
    _viewer = viewer;
}

MyAwesomeExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
MyAwesomeExtension.prototype.constructor = MyAwesomeExtension;

MyAwesomeExtension.prototype.load = function () {
    if (this.viewer.toolbar) {
        // Toolbar is already available, create the UI
        this.createUI();
    } else {
        // Toolbar hasn't been created yet, wait until we get notification of its creation
        this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
        this.viewer.addEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }
    link = parseQuery(document.location.search);
    if (link["colors"] != "") {
        alert("cols="+link.colors);
    }; 


    return true;
};

MyAwesomeExtension.prototype.onToolbarCreated = function () {
    this.viewer.removeEventListener(av.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
};

MyAwesomeExtension.prototype.createUI = function () {
    var _this = this;

 
    
    // prepare to execute the button action
    var myAwesomeToolbarButton = new Autodesk.Viewing.UI.Button('runMyAwesomeCode');
    myAwesomeToolbarButton.onClick = function (e) {

        // **********************
        //

        //mySelection = _viewer.getSelection();
        //var mySelection = [16];
        
        //_viewer.setColorMaterial(mySelection, 0xff0000);
        
        window.open("http://thatcolorapp.apphb.com/testvibrant/index.html");

        //
        //
        // **********************

        

    };
    // myAwesomeToolbarButton CSS class should be defined on your .css file
    // you may include icons, below is a sample class:
    myAwesomeToolbarButton.addClass('myAwesomeToolbarButton');
    myAwesomeToolbarButton.setToolTip('My Awesome extension');

    // SubToolbar
    this.subToolbar = (this.viewer.toolbar.getControl("MyAppToolbar") ?
        this.viewer.toolbar.getControl("MyAppToolbar") :
        new Autodesk.Viewing.UI.ControlGroup('MyAppToolbar'));
    this.subToolbar.addControl(myAwesomeToolbarButton);

    this.viewer.toolbar.addControl(this.subToolbar);
};

MyAwesomeExtension.prototype.unload = function () {
    this.viewer.toolbar.removeControl(this.subToolbar);
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('MyAwesomeExtension', MyAwesomeExtension);

function addMaterial(color) {
    var material = new THREE.MeshPhongMaterial({
        color: color
    });
    //viewer.impl.matman().addMaterial(newGuid(), material);
    viewer.impl.createOverlayScene(overlayName, material, material);
    return material;
}

function getAllDbIds() {
    const { instanceTree } = this.viewer.model.getData()
    const { dbIdToIndex } = instanceTree.nodeAccess
    return Object.keys(dbIdToIndex).map((dbId) => {
        return parseInt(dbId)
    })
}