define([
"esri/config",
    "dojo/_base/declare",
    "dojo/_base/lang",
	"esri/urlUtils", "esri/arcgis/utils", "esri/geometry/Geometry", "esri/geometry/webMercatorUtils", "esri/geometry/Point", "esri/SpatialReference", 
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/on",
	"dojo/query",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/dom-class",
    "application/TableOfContents",
    "application/ShareDialog",
    "application/Drawer",
    "application/DrawerMenu",
    "esri/dijit/HomeButton",
    "esri/dijit/LocateButton",
    "esri/dijit/BasemapToggle",
    "esri/dijit/Geocoder",
    "esri/dijit/Popup",
    "esri/dijit/Legend",
    "application/About",
    "application/SocialLayers",
    "esri/dijit/OverviewMap",
    "dijit/registry",
    "dojo/_base/array",
    "esri/lang",
	"esri/dijit/Print",
	"esri/tasks/PrintTemplate",
	
		//for measure
        "esri/sniff",
        "esri/map",
        "esri/SnappingManager",
        "esri/dijit/Measurement",
        "esri/layers/FeatureLayer",
		"esri/layers/LabelLayer", "esri/renderers/SimpleRenderer", "esri/symbols/TextSymbol", //labels
        "esri/renderers/SimpleRenderer",
        "esri/tasks/GeometryService",
		  "esri/Color",
		  "esri/tasks/locator",

        "esri/symbols/PictureMarkerSymbol",   //geocoder symbol
	
	
	
	
	//for drawing
	"esri/toolbars/draw",
        "esri/graphic",

        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol",
		"dojo/parser"


	
],
function(
esriConfig,
    declare,
    lang,
     urlUtils, arcgisUtils, Geometry, webMercatorUtils, Point, SpatialReference,
    domConstruct,
    dom,
    on,
	query,
    domStyle,
    domAttr,
    domClass,
    TableOfContents, ShareDialog, Drawer, DrawerMenu,
    HomeButton, LocateButton, BasemapToggle,
    Geocoder,
    Popup,
    Legend,
    About,
    SocialLayers,
    OverviewMap,
    registry,
    array,
    esriLang,
	Print,
	PrintTemplate,
	
		//measure
 has, Map, SnappingManager, Measurement, FeatureLayer, LabelLayer, SimpleRenderer, TextSymbol,//labels
 SimpleRenderer, GeometryService, Color, Locator,
	
	  PictureMarkerSymbol, //geocoder symbol
	
	//draw
	Draw, Graphic,
        SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
        parser
) {

    esri.config.defaults.map.logoLink = "http://www.mdp.state.md.us/OurProducts/PropertyMapProducts/FinderOnlineProduct.shtml"    //how to change logo link


    return declare("", [About, SocialLayers], {
        config: {},
        constructor: function(){
            // css classes
            this.css = {
                mobileSearchDisplay: "mobile-locate-box-display",
                toggleBlue: 'toggle-grey',
                toggleBlueOn: 'toggle-grey-on',
                panelPadding: "panel-padding",
                panelContainer: "panel-container",
                panelHeader: "panel-header",
                panelSection: "panel-section",
                panelSummary: "panel-summary",
                panelDescription: "panel-description",
                panelModified: "panel-modified-date",
                panelViews: "panel-views-count",
                panelMoreInfo: "panel-more-info",
                pointerEvents: "pointer-events",
                iconRight: "icon-right",
                iconList: "icon-list",
                iconLayers: "icon-layers",
                iconAbout: "icon-info-circled-1",
                iconText: "icon-text",
                locateButtonTheme: "LocateButtonCalcite",
                homebuttonTheme: "HomeButtonCalcite",
                desktopGeocoderTheme: "geocoder-desktop",
                mobileGeocoderTheme: "geocoder-mobile",
                appLoading: "app-loading",
                appError: "app-error"
            };
            // pointer event support
            if(this._pointerEventsSupport()){
                domClass.add(document.documentElement, this.css.pointerEvents);
            }
            // mobile size switch domClass
            this._showDrawerSize = 850;
        },
        startup: function (config) {
            // config will contain application and user defined info for the template such as i18n strings, the web map id
            // and application id
            // any url parameters and any application specific configuration information.
            if (config) {
                //config will contain application and user defined info for the template such as i18n strings, the web map id
                // and application id
                // any url parameters and any application specific configuration information.
                this.config = config;
                // drawer
                this._drawer = new Drawer({
                    showDrawerSize: this._showDrawerSize,
                    borderContainer: 'bc_outer',
                    contentPaneCenter: 'cp_outer_center',
                    contentPaneSide: 'cp_outer_left',
                    toggleButton: 'hamburger_button'
                });
                // drawer resize event
                on(this._drawer, 'resize', lang.hitch(this, function () {
                    // check mobile button status
                    this._checkMobileGeocoderVisibility();
                }));
                // startup drawer
                this._drawer.startup();
                //supply either the webmap id or, if available, the item info 
                var itemInfo = this.config.itemInfo || this.config.webmap;
                this._createWebMap(itemInfo);
            } else {
                var error = new Error("Main:: Config is not defined");
                this.reportError(error);
            }
        },
        reportError: function (error) {
            // remove spinner
            this._hideLoadingIndicator();
            // add app error
            domClass.add(document.body, this.css.appError);
            // set message
            var node = dom.byId('error_message');
            if(node){
                if (this.config && this.config.i18n) {
                    node.innerHTML = this.config.i18n.map.error + ": " + error.message;
                } else {
                    node.innerHTML = "Unable to create map: " + error.message;
                }
            }
        },
        // if pointer events are supported
        _pointerEventsSupport: function(){
            var element = document.createElement('x');
            element.style.cssText = 'pointer-events:auto';
            return element.style.pointerEvents === 'auto';   
        },
        _initLegend: function(){
            var legendNode = dom.byId('LegendDiv');
            if(legendNode){
                this._mapLegend = new Legend({
                    map: this.map,
                    layerInfos: this.layerInfos
                }, legendNode);
                this._mapLegend.startup();
            }
        },
        _initTOC: function(){
            // layers
            var tocNode = dom.byId('TableOfContents'), socialTocNode, tocLayers, socialTocLayers, toc, socialToc;
            if (tocNode) {
                tocLayers = this.layers;
                toc = new TableOfContents({
                    map: this.map,
                    layers: tocLayers
                }, tocNode);
                toc.startup();
            }
            // if we have social layers
            if (this.socialLayers && this.socialLayers.length) {
                // add social specific html
                var content = '';
                content += '<div class="' + this.css.panelHeader + '">' + this.config.i18n.social.mediaLayers + '</div>';
                content += '<div class="' + this.css.panelContainer + '">';
                content += '<div class="' + this.css.panelDescription + '">' + this.config.i18n.social.mediaLayersDescription + '</div>';
                content += '<div id="MediaTableOfContents"></div>';
                content += '</div>';
                // get node to insert
                var node = dom.byId('social_media_layers');
                if(node){
                    node.innerHTML = content;
                }
                // get toc node for social layers
                socialTocNode = dom.byId('MediaTableOfContents');
                // if node exists
                if(socialTocNode){
                    socialTocLayers = this.socialLayers;
                    socialToc = new TableOfContents({
                        map: this.map,
                        layers: socialTocLayers
                    }, socialTocNode);
                    socialToc.startup();    
                }
            }
        },
        _init: function () {
            // menu panels
            this.drawerMenus = [];
            var content, menuObj;
            // map panel enabled
            if (this.config.enableAboutPanel) {
                content = '';
                content += '<div class="' + this.css.panelContainer + '">';
                // if summary enabled
                if (this.config.enableSummaryInfo) {
                    content += '<div class="' + this.css.panelHeader + '">' + this.config.title + '</div>';
                    content += '<div class="' + this.css.panelSummary + '" id="summary"></div>';
                    if(this.config.enableModifiedDate){
                        content += '<div class="' + this.css.panelModified + '" id="date_modified"></div>';
                    }
                    if(this.config.enableViewsCount){
                        content += '<div class="' + this.css.panelViews + '" id="views_count"></div>'; 
                    }
                    if(this.config.enableMoreInfo){
                        content += '<div class="' + this.css.panelMoreInfo + '" id="more_info_link"></div>';
                    }
                }
                // show notes layer and has one of required things for getting notes layer
                if(this.config.notesLayer && this.config.notesLayer.id){
                    content += '<div id="map_notes_section">';
                    content += '<div class="' + this.css.panelHeader + '"><span id="map_notes_title">' + this.config.i18n.general.featured + '</span></div>';
                    content += '<div class="' + this.css.panelSection + '" id="map_notes"></div>';
                    content += '</div>';
                }
                // show bookmarks and has bookmarks
                if(this.config.enableBookmarks && this.bookmarks && this.bookmarks.length){
                    content += '<div class="' + this.css.panelHeader + '">' + this.config.i18n.mapNotes.bookmarks + '</div>';
                    content += '<div class="' + this.css.panelSection + '" id="map_bookmarks"></div>';
                }
                content += '</div>';
                // menu info
                menuObj = {
                    title: this.config.i18n.general.about,
                    label: '<div class="' + this.css.iconAbout + '"></div><div class="' + this.css.iconText + '">' + this.config.i18n.general.about + '</div>',
                    content: content
                };
                // map menu
                if(this.config.defaultPanel === 'about'){
                    this.drawerMenus.splice(0,0,menuObj);
                }
                else{
                    this.drawerMenus.push(menuObj);
                }
            }
            if (this.config.enableLegendPanel) {
                content = '';
                content += '<div class="' + this.css.panelHeader + '">' + this.config.i18n.general.legend + '</div>';
                content += '<div class="' + this.css.panelContainer + '">';
                content += '<div class="' + this.css.panelPadding + '">';
                content += '<div id="twitter_legend_auth"></div>';
                content += '<div id="LegendDiv"></div>';
                content += '</div>';
                content += '</div>';
                // menu info
                menuObj = {
                    title: this.config.i18n.general.legend,
                    label: '<div class="' + this.css.iconList + '"></div><div class="' + this.css.iconText + '">' + this.config.i18n.general.legend + '</div>',
                    content: content
                };
                // legend menu
                if(this.config.defaultPanel === 'legend'){
                    this.drawerMenus.splice(0,0,menuObj);
                }
                else{
                    this.drawerMenus.push(menuObj);
                }
            }
            // Layers Panel
            if (this.config.enableLayersPanel) {
                content = '';
                content += '<div class="' + this.css.panelHeader + '">' + this.config.i18n.general.layers + '</div>';
                content += '<div class="' + this.css.panelContainer + '">';
                content += '<div id="TableOfContents"></div>';
                content += '</div>';
                content += '<div id="social_media_layers"></div>';
                // menu info
                menuObj = {
                    title: this.config.i18n.general.layers,
                    label: '<div class="' + this.css.iconLayers + '"></div><div class="' + this.css.iconText + '">' + this.config.i18n.general.layers + '</div>',
                    content: content
                };
                // layers menu
                if(this.config.defaultPanel === 'layers'){
                    this.drawerMenus.splice(0,0,menuObj);
                }
                else{
                    this.drawerMenus.push(menuObj);
                }
            }
            // menus
            this._drawerMenu = new DrawerMenu({
                menus: this.drawerMenus
            }, dom.byId("drawer_menus"));
            this._drawerMenu.startup();
            // locate button
            if (this.config.enableLocateButton) {
                this._LB = new LocateButton({
                    map: this.map,
                    theme: this.css.locateButtonTheme
                }, 'LocateButton');
                this._LB.startup();
            }
            // home button
            if (this.config.enableHomeButton) {
                this._HB = new HomeButton({
                    map: this.map,
                    theme: this.css.homebuttonTheme
                }, 'HomeButton');
                this._HB.startup();
                // clear locate on home button
                on(this._HB, 'home', lang.hitch(this, function(){
                    if(this._LB){
                        this._LB.clear();
                    }
                }));
            }
            // basemap toggle
            if (this.config.enableBasemapToggle) {
                var BT = new BasemapToggle({
                    map: this.map,
                    basemap: this.config.nextBasemap,
                    defaultBasemap: this.config.defaultBasemap
                }, 'BasemapToggle');
                BT.startup();
                /* Start temporary until after JSAPI 4.0 is released */
                var bmLayers = [],
                  mapLayers = this.map.getLayersVisibleAtScale(this.map.getScale());
                if (mapLayers) {
                  for (var i = 0; i < mapLayers.length; i++) {
                    if (mapLayers[i]._basemapGalleryLayerType) {
                      var bmLayer = this.map.getLayer(mapLayers[i].id);
                      if (bmLayer) {
                        bmLayers.push(bmLayer);
                      }
                    }
                  }
                }
                on.once(this.map, 'basemap-change', lang.hitch(this, function () {
                  if (bmLayers && bmLayers.length) {
                    for (var i = 0; i < bmLayers.length; i++) {
                      this.map.removeLayer(bmLayers[i]);
                    }
                  }
                }));
                /* END temporary until after JSAPI 4.0 is released */
            }
			
			
						//for map coordinates
			
			if (this.config.mapcoor)  {
				console.log("in map coordinates config");
				
				//this.map.on("load", function() {
					
					console.log("map loaded");
					
						 function showCoordinates(evt) {     //in firefox the function has to show first....
			 //console.log(evt);
          //the map is in web mercator but display coordinates in geographic (lat, long)
          var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
          //display mouse coordinates
		  console.log(mp.x.toFixed(3) + ", " + mp.y.toFixed(3));
          dom.byId("coor").innerHTML = mp.x.toFixed(3) + ", " + mp.y.toFixed(3);
        }
			;	
				
					
					//map = this.map;
          //after map loads, connect to listen to mouse move & drag events
          this.map.on("mouse-move", showCoordinates);
          this.map.on("mouse-drag", showCoordinates);
    //    });
		
	
			}
			
			
			
			//for PRINTER ***********************
					if (this.config.enablePrintButton) {           //if the printing function is enabled true
					this._printer = new Print({                          //create a new printer widget called this._printer
					map: this.map,     //the map to print
					templates: [{
  label: "Layout",
  format: "PDF",
  layout: "A3 Landscape",
  layoutOptions: {
    titleText: "FINDER Online JS Map",
  }
}],
					url: "http://geodata.md.gov/imap/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"      //the url to export the web map task
					}, dom.byId("printButton"));   //html element where the print widget button/drop down will be rendered
					this._printer.startup();                     //finalize the creation of the widget
					}
			/////////
			
			
			
				//for labels ***********************
					if (this.config.enablelabels) {           //if the labels function is enabled true
					var clabelField = "COUNTY";
					
					// create a renderer for the states layer to override default symbology
        var countyColor = new Color("#666");
        var countyLine = new SimpleLineSymbol("null", countyColor, 0.1);
        var countySymbol = new SimpleFillSymbol("solid", countyLine, null);
        var countyRenderer = new SimpleRenderer(countySymbol);

		 // create a feature layer to show country boundaries
        var countyUrl = "http://geodata.md.gov/imap/rest/services/Boundaries/MD_PoliticalBoundaries/MapServer/1";
        var county = new FeatureLayer(countyUrl, {
          id: "County",
          outFields: [clabelField]
        });
        county.setRenderer(countyRenderer);
		county.opacity = 0.0;
        this.map.addLayer(county);

   // create a text symbol to define the style of labels
        var countyLabel = new TextSymbol().setColor(countyColor);
        countyLabel.font.setSize("12pt");
        countyLabel.font.setFamily("arial");
        var countyLabelRenderer = new SimpleRenderer(countyLabel);
        var labels = new LabelLayer({ id: "labels", mode:"DYNAMIC" }); //dynamic so label will show at all pans; 
		
        // tell the label layer to label the county feature layer 
        // using the field named "county"
        labels.addFeatureLayer(county, countyLabelRenderer, "{" + clabelField + "}");

        // add the label layer to the map
        this.map.addLayer(labels);

					}
					
						if (this.config.enabletaxlabels) {						//if the labels function is enabled true
var menu_butt =  document.querySelector('div.esriGeocoderSearch.esriGeocoderIcon');
//toc-layer toc-visible.toc-title.toc-title-container.
//div.panel-container 
var boo = $('[title="County Boundaries"]');
console.log(boo);
				//if nl{             //if the tax map grid layer is turned on
//console.log("tax map grid label turned on, so turn on label");				
					var tlabelField = "MAPID";
					
					// create a renderer for the tax layer to override default symbology
        var taxColor = new Color("#666");
        var taxLine = new SimpleLineSymbol("null", taxColor, 0.1);
        var taxSymbol = new SimpleFillSymbol("solid", taxLine, null);
        var taxRenderer = new SimpleRenderer(taxSymbol);

		 // create a feature layer to show tax boundaries
        var taxUrl = "http://geodata.md.gov/imap/rest/services/PlanningCadastre/MD_PropertyData/MapServer/2";
        var tax = new FeatureLayer(taxUrl, {
          id: "Tax Map Grids",
          outFields: [tlabelField]
        });
        tax.setRenderer(taxRenderer);
		tax.opacity = 0.0;
        this.map.addLayer(tax);

   // create a text symbol to define the style of labels
        var taxLabel = new TextSymbol().setColor(taxColor);
        taxLabel.font.setSize("9pt");
        taxLabel.font.setFamily("arial");
        var taxLabelRenderer = new SimpleRenderer(taxLabel);
        var labels = new LabelLayer({ id: "labels1", mode:"DYNAMIC" }); //dynamic so label will show at all pans; 
		labels.minScale = 144448 //If the map is zoomed out beyond this scale, the layer will not be visible. 
		
        // tell the label layer to label the county feature layer 
        // using the field named "county"
        labels.addFeatureLayer(tax, taxLabelRenderer, "{" + tlabelField + "}");

        // add the label layer to the map
        this.map.addLayer(labels);
//}
					}
			
			
			
			
			
			
			//for MEASURE ****** ******************************
			esriConfig.defaults.geometryService = new GeometryService("http://geodata.md.gov/imap/rest/services/Utilities/Geometry/GeometryServer");
			/*var sfs = new SimpleFillSymbol(
          "solid",
          new SimpleLineSymbol("solid", new Color([195, 176, 23]), 2), 
          null
        );   */
           if (this.config.enableMeasure){
			var measurement = new Measurement({
          map: this.map
        }, dom.byId("measureButton"));
		measurement.hideTool("location");
        measurement.startup();
		
		//turn off popups when measurement button is turned on
		//will have to use lang.hitch to retain the scope and keep map defined; 
		
		  query(".esriMeasurementButtonPane .esriButton").on("click", lang.hitch (this, function(c){
          var tool = measurement.getTool();
		  var map = this.map;
		  console.log(map); 
          if(tool){
            //deactivate the popup window
            map.setInfoWindowOnClick(false);
          }else{
            //activate the popup window
            map.setInfoWindowOnClick(true);
          }
		  })); 
		   }
		
			
			//for Drawing******
			
			
			//
			
			
            // share dialog
            if (this.config.enableShareDialog) {
                this._ShareDialog = new ShareDialog({
                    theme: this.css.iconRight,
                    bitlyLogin: this.config.bitlyLogin,
                    bitlyKey: this.config.bitlyKey,
                    map: this.map,
                    image: this.config.sharinghost + '/sharing/rest/content/items/' + this.item.id + '/info/' + this.item.thumbnail,
                    title: this.config.title,
                    summary: this.item.snippet,
                    hashtags: 'esriPIM'
                }, 'ShareDialog');
                this._ShareDialog.startup();
            }
            // i18n overview placement
            var overviewPlacement = 'left';
            if(this.config.i18n.direction === 'rtl'){
                overviewPlacement = 'right';
            }
            // Overview Map
            if(this.config.enableOverviewMap){
                var size = this._getOverviewMapSize();
                this._overviewMap = new OverviewMap({
                    attachTo: "bottom-" + overviewPlacement,
                    width: size,
                    height: size,
                    visible: this.config.openOverviewMap,
                    map: this.map
                });
                this._overviewMap.startup();
                // responsive overview size
                on(this.map, 'resize', lang.hitch(this, function(){
                    this._resizeOverviewMap();
                }));
            }
            // geocoders
            this._createGeocoders();
            // startup social
            this.initSocial();
            // startup map panel
            this.initAboutPanel();
            // startup legend
            this._initLegend();
            // startup toc
            this._initTOC();
            // set social dialogs
            this.configureSocial();
            // on body click containing underlay class
            on(document.body, '.dijitDialogUnderlay:click', function(){
                // get all dialogs
                var filtered = array.filter(registry.toArray(), function(w){ 
                    return w && w.declaredClass == "dijit.Dialog";
                });
                // hide all dialogs
                array.forEach(filtered, function(w){ 
                    w.hide(); 
                });
            });
            // hide loading div
            this._hideLoadingIndicator();

            // dialog modal
            if(this.config.enableDialogModal){
                require(["dijit/Dialog"], lang.hitch(this, function(Dialog){
                    var dialogContent = this.config.dialogModalContent;
                    var dialogModal = new Dialog({
                        title: this.config.dialogModalTitle || "Access and Use Constraints",
                        content: dialogContent,
                        style: "width: 375px"
                    });
                    dialogModal.show();
                }));    
            }

            // swipe layer
            if(this.config.swipeLayer && this.config.swipeLayer.id){
                // get swipe tool
                require(["esri/dijit/LayerSwipe"], lang.hitch(this, function(LayerSwipe){
                    // get layer
                    var layer = this.map.getLayer(this.config.swipeLayer.id);
                    if(layer){
                        // create swipe
                        var layerSwipe = new LayerSwipe({
                            type: this.config.swipeType,
                            theme: "PIMSwipe",
                            invertPlacement: this.config.swipeInvertPlacement,
                            map: this.map,
                            layers: [ layer ]
                        }, "swipeDiv");
                        layerSwipe.startup();
                        on(layer, 'visibility-change', lang.hitch(this, function(evt){
                            if(evt.visible){
                                layerSwipe.set("enabled", true);
                            }
                            else{
                                layerSwipe.set("enabled", false);
                            }
                        }));
                    }
                }));  
            }
            // drawer size check
            this._drawer.resize();
			
			
			
				//url parameters try 
						var params = urlUtils.urlToObject(document.location.href);  
			  if (params.query && params.query.address) {  
			    var zoomlevel = 19;
				var address = params.query.address;  
				// You could also set the value of the geocoder input box  
				// or just set the value, your preference  
				//this._geocoder.inputNode.value = address;  
				this._geocoder.value = address;  
				this._geocoder.find().then(lang.hitch(this, function(response) {  
				  if (response.results.length) {  
					this._geocoder.select(response.results[0]);  
				  }  
				}));
  
			  }



	//url parameters try  04090919000840
						var params = urlUtils.urlToObject(document.location.href);  
			  if (params.query && params.query.id) {  
			  
			  console.log("Geocoder value BEFORE activegeocoder change");
			  console.log(this._geocoder);
			  console.log(this._geocoder.activeGeocoder);   //address locator
			  console.log(this._geocoder.activeGeocoderIndex);  //0
			  console.log(this._geocoder.geocoders); //address locator and parcel locator
			  
			  //select the elements and store them in a variable
			 var add_geo =  document.querySelector('li.esriGeocoderResult.esriGeocoderResultOdd.esriGeocoderSelected.esriGeocoderResultFirst');
			 console.log(add_geo); 
			 
			 var par_geo =  document.querySelector('li.esriGeocoderResult.esriGeocoderResultEven.esriGeocoderResultLast');
			  console.log(par_geo); 
			  
			  	 var menu_butt =  document.querySelector('div.esriGeocoderSearch.esriGeocoderIcon');
			  console.log(menu_butt); 
			  
			  var search_in = document.getElementById('geocoderSearch_input');
			  console.log(search_in); 
			 
			 //change the values of the class attribute
			 add_geo.className ='esriGeocoderResult esriGeocoderResultOdd esriGeocoderResultFirst'; 
			 par_geo.className ='esriGeocoderResult esriGeocoderResultEven esriGeocoderSelected esriGeocoderResultLast'; 
			 
			 //change value of title attribute in menu_butt
			 menu_butt.title = 'Find Parcel ACCT ID'; 
			  
				
			//change value of placeholder attribute in search in	
			search_in.setAttribute('placeholder', 'Find Parcel ACCT ID');
				
			  console.log("query selector done. Results below:");
			   console.log(add_geo); 
			   console.log(par_geo); 
			    console.log(menu_butt); 
				console.log(search_in); 
			
			var id = params.query.id;  
				this._geocoder.value = id;  
				
				console.log("Geocoder value");
				console.log(this._geocoder.value);
				
				this._geocoder.activeGeocoder = {
				esri:false,
				name:"Parcel ACCT Locator",
				outFields:"SingleKey",
				placefinding:true,
				placeholder: "Find Parcel ACCT ID",
				singleLineFieldName:"Single Line Input",
				url:"http://geodata.md.gov/imap/rest/services/GeocodeServices/MD_ParcelAccountNumberLocator/GeocodeServer"
				
				}
				
				this._geocoder.activeGeocoderIndex = 1; 
				
				//need to set this._geocoder to something...to equal Parcel Point Locator since it was equaling Address Locator
				this._geocoder._task.url ="http://geodata.md.gov/imap/rest/services/GeocodeServices/MD_ParcelAccountNumberLocator/GeocodeServer"; 
				this._geocoder._task._url.path ="http://geodata.md.gov/imap/rest/services/GeocodeServices/MD_ParcelAccountNumberLocator/GeocodeServer"; 

				
				console.log("Geocoder task values");
				console.log(this._geocoder._task.url);
				console.log(this._geocoder._task._url.path);
				
				console.log("Geocoder value after activegeocoder change");
				console.log(this._geocoder);
				console.log(this._geocoder.activeGeocoder);
				console.log(this._geocoder.activeGeocoderIndex);
				
				
				
				
				this._geocoder.find().then(lang.hitch(this, function(response) {  
				console.log("begin geocoder find function");
				console.log(this._geocoder);
				console.log(this._geocoder.find()); 
				console.log(this._geocoder.activeGeocoder);
				console.log(this._geocoder.activeGeocoderIndex);
				console.log(this._geocoder.geocoders);
				console.log(this._geocoder.geocoderMenu);
				
				
				
				  if (response.results.length) {  
					this._geocoder.select(response.results[0]);  
					console.log("done geocoder find function");
				  }  
				})); 
			
  
			  }  
			 
			//url parameters try DONE
						  
			
			
        },
        _getOverviewMapSize: function(){
            var breakPoint = 500;
            var size = 150;
            if(this.map.width < breakPoint || this.map.height < breakPoint){
                size = 75;
            }
            return size;
        },
        _resizeOverviewMap: function(){
            if(this._overviewMap){
                var size = this._getOverviewMapSize();
                if(this._overviewMap.hasOwnProperty('resize')){
                    this._overviewMap.resize({ w:size, h:size });    
                }                
            }
        },
        _checkMobileGeocoderVisibility: function () {
            if(this._mobileGeocoderIconNode && this._mobileSearchNode){
                // check if mobile icon needs to be selected
                if (domClass.contains(this._mobileGeocoderIconNode, this.css.toggleBlueOn)) {
                    domClass.add(this._mobileSearchNode, this.css.mobileSearchDisplay);
                }
            }
        },
        _showMobileGeocoder: function () {
            if(this._mobileSearchNode && this._mobileGeocoderIconContainerNode){
                domClass.add(this._mobileSearchNode, this.css.mobileSearchDisplay);
                domClass.replace(this._mobileGeocoderIconContainerNode, this.css.toggleBlueOn, this.css.toggleBlue);
            }
        },
        _hideMobileGeocoder: function () {
            if(this._mobileSearchNode && this._mobileGeocoderIconContainerNode){
                domClass.remove(this._mobileSearchNode, this.css.mobileSearchDisplay);
                domStyle.set(this._mobileSearchNode, "display", "none");
                domClass.replace(this._mobileGeocoderIconContainerNode, this.css.toggleBlue, this.css.toggleBlueOn);
            }
        },
        _setTitle: function(title){
            // set config title
            this.config.title = title;
            // window title
            window.document.title = title;  
        },
        _setTitleBar: function () {
            // map title node
            var node = dom.byId('title');
            if (node) {
                // set title
                node.innerHTML = this.config.title;
                // title attribute
                domAttr.set(node, "title", this.config.title);
            }
        },
        _setDialogModalContent: function(content) {
            // set dialog modal content
            this.config.dialogModalContent = content;
        },
        _createGeocoderOptions: function() {
            var hasEsri = false, esriIdx, geocoders = lang.clone(this.config.helperServices.geocode);
            // default options
            var options = {
                map: this.map,
                autoNavigate: true,
                autoComplete: true,
                arcgisGeocoder: false,//{
                    //placeholder: this.config.i18n.general.find
                //},
                geocoders: null
            };
            //only use geocoders with a url defined
            geocoders = array.filter(geocoders, function (geocoder) {
                if (geocoder.url) {
                    return true;
                }
                else{
                    return false;
                }
            });
            // at least 1 geocoder defined
            if(geocoders.length){
                // each geocoder
                array.forEach(geocoders, lang.hitch(this, function(geocoder) {
                    // if esri geocoder
                   /* if (geocoder.url && geocoder.url.indexOf(".arcgis.com/arcgis/rest/services/World/GeocodeServer") > -1) {
                        hasEsri = true;
                        geocoder.name = "Esri World Geocoder";
                        geocoder.outFields = "Match_addr, stAddr, City";
                        geocoder.singleLineFieldName = "SingleLine";
                        geocoder.esri = true;
                        geocoder.placefinding = true;
                        geocoder.placeholder = this.config.i18n.general.find;
                    }    */
					
						//if not esri geocoder
					   if (geocoder.url && geocoder.url.indexOf("http://geodata.md.gov/imap/rest/services/GeocodeServices/MD_CompositeLocator/GeocodeServer") > -2) {
                        hasEsri = false;
                        geocoder.name = "Address Locator";
                        geocoder.outFields = "Street, City, State, ZIP";
                        geocoder.singleLineFieldName = "SingleLine";
                        geocoder.esri = false;
                        geocoder.placefinding = true;
                        geocoder.placeholder = "Find a Place";
						
                    }	
					
					//if not esri geocoder
					   if (geocoder.url && geocoder.url.indexOf("http://geodata.md.gov/imap/rest/services/GeocodeServices/MD_ParcelAccountNumberLocator/GeocodeServer") > -1) {
                        hasEsri = false;
                        geocoder.name = "Parcel ACCT Locator";
                        geocoder.outFields = "SingleKey";
                        geocoder.singleLineFieldName = "Single Line Input";
                        geocoder.esri = false;
                        geocoder.placefinding = true;
                        geocoder.placeholder = "Find Parcel ACCT ID";
						
                    }	
					
					
                }));
                //only use geocoders with a singleLineFieldName that allow placefinding unless its custom
                geocoders = array.filter(geocoders, function (geocoder) {
                    if (geocoder.name && geocoder.name === "Custom") {
                        return (esriLang.isDefined(geocoder.singleLineFieldName));
                    } else {
                        return (esriLang.isDefined(geocoder.singleLineFieldName) && esriLang.isDefined(geocoder.placefinding) && geocoder.placefinding);
                    }
                });
                // if we have an esri geocoder
                if (hasEsri) {
                    for (var i = 0; i < geocoders.length; i++) {
                        if (esriLang.isDefined(geocoders[i].esri) && geocoders[i].esri === true) {
                            esriIdx = i;
                            break;
                        }
                    }
                }
                // set autoComplete
                options.autoComplete = hasEsri;
                // set esri options
                if (hasEsri) {
                    options.minCharacters = 0;
                    options.maxLocations = 5;
                    options.searchDelay = 100;
                }
                //If the World geocoder is primary enable auto complete 
                if (hasEsri && esriIdx === 0) {
                    options.arcgisGeocoder = geocoders.splice(0, 1)[0]; //geocoders[0];
                    if (geocoders.length > 0) {
                        options.geocoders = geocoders;
                    }
                } else {
                    options.arcgisGeocoder = false;
                    options.geocoders = geocoders;
                }
            }
            return options;
        },
        // create geocoder widgets
        _createGeocoders: function () {
		   //add geocoder result layer
            var resultsLayer = new esri.layers.GraphicsLayer({ id: "resultsLayer" });   //geocoder symbol code
            this.map.addLayer(resultsLayer);
			
            // get options
            var createdOptions = this._createGeocoderOptions();
            // desktop geocoder options
            var desktopOptions = lang.mixin({}, createdOptions, {
                theme: this.css.desktopGeocoderTheme
            });
            // mobile geocoder options
            var mobileOptions = lang.mixin({}, createdOptions, {
                theme: this.css.mobileGeocoderTheme
            });
            // desktop size geocoder
            this._geocoder = new Geocoder(desktopOptions, dom.byId("geocoderSearch"));
            this._geocoder.startup();
			
					  //add feature to map                                          //geocoder symbol
            function addFeatureToMap(geometry) {
                resultsLayer.clear();
                var pictureMarkerSymbol = new PictureMarkerSymbol({ "angle": 0, "xoffset": 2, "yoffset": 8, "type": "esriPMS", "url": "http://static.arcgis.com/images/Symbols/Basic/RedStickpin.png", "contentType": "image/png", "width": 24, "height": 24 });
                resultsLayer.add(new Graphic(geometry, pictureMarkerSymbol));
            }
			
			
            // geocoder results
            on(this._geocoder, 'find-results', lang.hitch(this, function (response) {
                if (!response.results || !response.results.results || !response.results.results.length) {
                    alert(this.config.i18n.general.noSearchResult);
                }else {                                                //geocoder symbol results
                    addFeatureToMap(response.results.results[0].feature.geometry);
					this.map.setZoom(19); 
					if (history.pushState) {
							//browser supported.
								//refresh the URL with the geocoder result
								  console.log("Push state is supported. Geocoder result: ");
						console.log(this._geocoder.value);
						
						
							//only add the ?address= if using address locator
							if (this._geocoder.activeGeocoderIndex == 0) {
							//browser supported. 
								//refresh the URL with the geocoder result
								  console.log("Push state is supported. Address Geocoder result: ");
						console.log(this._geocoder.value);
						window.history.pushState(null,null,"?address=" + this._geocoder.value);
						
						}
						
						//add push state for parcel locator too here. don't forget the mobile   04090919000840
						if (this._geocoder.activeGeocoderIndex == 1) {
							//browser supported.
								//refresh the URL with the geocoder result
								  console.log("Push state is supported. Parcel Geocoder result: ");
						console.log(this._geocoder.value);
						window.history.pushState(null,null,"?id=" + this._geocoder.value);
						
						}    
						
						
						
						
							} 
						
						
                }
            }));
			
            // mobile sized geocoder
            this._mobileGeocoder = new Geocoder(mobileOptions, dom.byId("geocoderMobile"));
            this._mobileGeocoder.startup();
            // geocoder results
            on(this._mobileGeocoder, 'find-results', lang.hitch(this, function (response) {
                if (!response.results || !response.results.results || !response.results.results.length) {
                    alert(this.config.i18n.general.noSearchResult);
				}	else {    //geocoder symbol results and all below until keep geocoder values in sync
                    addFeatureToMap(response.results.results[0].feature.geometry);
							//refresh the URL with the geocoder result
						if (history.pushState) {
							//browser supported.
								//refresh the URL with the geocoder result
								  console.log("Push state is supported. Geocoder result: ");
						console.log(this._geocoder.value);
						
							//only add the ?address= if using address locator
							if (this._geocoder.activeGeocoderIndex == 0) {
							//browser supported. 
								//refresh the URL with the geocoder result
								  console.log("Push state is supported. Address Geocoder result: ");
						console.log(this._geocoder.value);
						window.history.pushState(null,null,"?address=" + this._geocoder.value);
						
						}
						
						//add push state for parcel locator too here. don't forget the mobile   04090919000840
						if (this._geocoder.activeGeocoderIndex == 1) {
							//browser supported.
								//refresh the URL with the geocoder result
								  console.log("Push state is supported. Parcel Geocoder result: ");
						console.log(this._geocoder.value);
						window.history.pushState(null,null,"?id=" + this._geocoder.value);
						
						}    
						
						
						
						
						
						
							}
                }
                this._hideMobileGeocoder();
            }));
			
			 on(this._geocoder, 'clear', lang.hitch(this, function () {
                resultsLayer.clear();
            }));                                               //rest of geocoder symbol result

            on(this._mobileGeocoder, 'clear', lang.hitch(this, function () {
                resultsLayer.clear();
            }));                                                //rest of geocoder symbol result
			
			
			
            // keep geocoder values in sync
            this._geocoder.watch("value", lang.hitch(this, function () {
                var value = arguments[2];
                this._mobileGeocoder.set("value", value);
            }));
            // keep geocoder values in sync
            this._mobileGeocoder.watch("value", lang.hitch(this, function () {
                var value = arguments[2];
                this._geocoder.set("value", value);
            }));
            // geocoder nodes
            this._mobileGeocoderIconNode = dom.byId("mobileGeocoderIcon");
            this._mobileSearchNode = dom.byId("mobileSearch");
            this._mobileGeocoderIconContainerNode = dom.byId("mobileGeocoderIconContainer");
            // mobile geocoder toggle 
            if (this._mobileGeocoderIconNode) {
                on(this._mobileGeocoderIconNode, "click", lang.hitch(this, function () {
                    if (domStyle.get(this._mobileSearchNode, "display") === "none") {
                        this._showMobileGeocoder();
                    } else {
                        this._hideMobileGeocoder();
                    }
                }));
            }
            var closeMobileGeocoderNode = dom.byId("btnCloseGeocoder");
            if(closeMobileGeocoderNode){
                // cancel mobile geocoder
                on(closeMobileGeocoderNode, "click", lang.hitch(this, function () {
                    this._hideMobileGeocoder();
                }));
            }
        },
        // hide map loading spinner
        _hideLoadingIndicator: function () {
            // add loaded class
            domClass.remove(document.body, this.css.appLoading);
        },
		
			//get url parameters from Jessie's code *********************
		
		_createUrlParamsObject: function (items) {
            var urlObject, obj = {}, i;

            // retrieve url parameters. Templates all use url parameters to determine which arcgis.com
            // resource to work with.
            // Map templates use the webmap param to define the webmap to display
            // Group templates use the group param to provide the id of the group to display.
            // appid is the id of the application based on the template. We use this
            // id to retrieve application specific configuration information. The configuration
            // information will contain the values the  user selected on the template configuration
            // panel.
            urlObject = urlUtils.urlToObject(document.location.href);
            urlObject.query = urlObject.query || {};
            if (urlObject.query && items && items.length) {
                for (i = 0; i < items.length; i++) {
                    if (urlObject.query[items[i]]) {
                        obj[items[i]] = urlObject.query[items[i]];
                    }
                }
            }
            return obj;
        },
		
		
        //create a map based on the input web map id
        _createWebMap: function (itemInfo) {
            // popup dijit
            var customPopup = new Popup({}, domConstruct.create("div"));
            // add popup theme
            domClass.add(customPopup.domNode, "calcite");
            // set extent from URL Param
            if(this.config.extent){
                var e = this.config.extent.split(',');
                if(e.length === 4){
                    itemInfo.item.extent = [
                        [
                            parseFloat(e[0]),
                            parseFloat(e[1])
                        ],
                        [
                            parseFloat(e[2]),
                            parseFloat(e[3])
                        ]
                    ];
                }
            }
			
				//MIO center and zoom code; it only uses this if specified in URL, if not default center/zoom shown
			if (this.config.center) {
                var c = this.config.center.split(',');
				var lon;
				var lat;
				var point;
				   urlObject = urlUtils.urlToObject(document.location.href);
				var zoomlevel = parseInt(urlObject.query.zoom);
				
                if (c.length === 2) {
                    itemInfo.item.center = [
                           lon = parseFloat(c[0]),
                            lat = parseFloat(c[1])
                    ];
					//console.log("Longitude: " + lon, "Latitude: " + lat)
					
		point = new Point(lon,lat,  new SpatialReference({ wkid:102100}));  
  
   

                }

            }
			
			//for address zoom
			
			    if(this.config.address){
				
				var zoomlevel;
				
				zoomlevel = 18; 
            
            }
			
				if(this.config.id){
				
				var zoomlevel;
				
				zoomlevel = 18; 
            
            }
			
			
			
            //can be defined for the popup like modifying the highlight symbol, margin etc.
            arcgisUtils.createMap(itemInfo, "mapDiv", {
                mapOptions: {
                    infoWindow: customPopup,
					center: point,
					zoom: zoomlevel
                    //Optionally define additional map config here for example you can
                    //turn the slider off, display info windows, disable wraparound 180, slider position and more.
                },
                editable: false,
                usePopupManager: true,
                bingMapsKey: this.config.bingmapskey
            }).then(lang.hitch(this, function (response) {
                //Once the map is created we get access to the response which provides important info
                //such as the map, operational layers, popup info and more. This object will also contain
                //any custom options you defined for the template. In this example that is the 'theme' property.
                //Here' we'll use it to update the application to match the specified color theme.
                this.map = response.map;
                this.layers = response.itemInfo.itemData.operationalLayers;
                this.item = response.itemInfo.item;
                this.bookmarks = response.itemInfo.itemData.bookmarks;
                this.layerInfos = arcgisUtils.getLegendLayers(response);
                // window title and config title
                this._setTitle(this.config.title || response.itemInfo.item.title);
                // title bar title
                this._setTitleBar();
                // dialog modal content
                this._setDialogModalContent(this.config.dialogModalContent || response.itemInfo.item.licenseInfo);
                // map loaded
                if (this.map.loaded) {
                    this._init();
                } else {
                    on.once(this.map, 'load', lang.hitch(this, function () {
                        this._init();
                    }));
                }
            }), this.reportError);
        }
    });
});
