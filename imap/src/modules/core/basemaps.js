/**
 Creates an ESRI basemaps dijit.
 Also contains a function to recreate an overview map (apparently needed when basemap is switched).
 */
define(["dojo/_base/declare", "dijit/_WidgetBase", "dojo/_base/lang", "dojo/topic", "./utilities/maphandler", "dijit/layout/ContentPane"
    , "dijit/Menu", "esri/dijit/Basemap", "esri/dijit/BasemapLayer", "esri/dijit/BasemapGallery", "dijit/registry", "dojo/aspect" /*, "./custommenu"*/
    , "dijit/form/DropDownButton", "dojo/dom", "dojo/dom-construct"],
    function(declare, WidgetBase, lang, topic, mapHandler, ContentPane, Menu, Basemap, BasemapLayer, BasemapGallery, registry, aspect /*, custommenu*/
        , DropDownButton, dom, domConstruct){
        return declare([WidgetBase, DropDownButton], {
            // The ESRI map object to bind to the TOC. Set in constructor
            map: null,
            //The application configuration properties (originated as configOptions from app.js then overridden by AGO if applicable)
            AppConfig: null,

            //*** Create the basemap gallery
            constructor: function(args) {
                // safeMixin automatically sets the properties above that are passed in from the toolmanager.js
                declare.safeMixin(this,args);
                // mapHandler is a singleton object that you can require above and use to get a reference to the map.
                this.map = mapHandler.map;
            }

            , postCreate: function () {
                this.inherited(arguments);
                /*if (this.AppConfig.embed)
                    this._addBasemapGalleryMenu();
                else*/
                    this._addBasemapGallery();
            }

            //Add the basemap gallery widget to the application.
            , _addBasemapGallery: function () {
                //if a basemap group was specified listen for the callback and modify the query
                var basemapGroup = null;
                if (this.AppConfig.basemapgroup.title && this.AppConfig.basemapgroup.owner) {
                    basemapGroup = {
                        "owner": this.AppConfig.basemapgroup.owner,
                        "title": this.AppConfig.basemapgroup.title
                    }
                }
				
				//var basemaps = [], 
				
				//define basemap layer
				var sixinch = new BasemapLayer({
					url:"http://geodata.md.gov/imap/rest/services/Imagery/MD_SixInchImagery/MapServer"
					});

				var naiplayer = new BasemapLayer({
					url:"http://geodata.md.gov/imap/rest/services/Imagery/MD_NAIPImagery/MapServer"
					});
					
				var graylayer = new BasemapLayer({
					url:"http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer"
					});
					
					
				var basemaps = [];
				
				
				var imagery = new Basemap ({
				//id: 'delorme', //can make up or will be automatically made
				layers: [sixinch],
				thumbnailUrl:"http://www.arcgis.com/sharing/rest/content/items/86de95d4e0244cba80f0fa2c9403a7b2/info/thumbnail/tempimagery.jpg", 
				title: "6 Inch Imagery (2013/2014)"
				}); 
				basemaps.push(imagery); 
				
				
				var naip = new Basemap ({
				//id: 'delorme', //can make up or will be automatically made
				layers: [naiplayer],
				thumbnailUrl:"http://www.arcgis.com/sharing/rest/content/items/86de95d4e0244cba80f0fa2c9403a7b2/info/thumbnail/tempimagery.jpg", 
				title: "NAIP Imagery (2013)"
				}); 
				basemaps.push(naip); 
				
				
				var gray = new Basemap ({
				//id: 'delorme', //can make up or will be automatically made
				layers: [graylayer],
				thumbnailUrl:"http://www.arcgis.com/sharing/rest/content/items/8b3b470883a744aeb60e5fff0a319ce7/info/thumbnail/light_gray_canvas.jpg", 
				title: "Light Gray Canvas"
				}); 
				basemaps.push(gray); 
				
				
                var cp = new ContentPane({
                    id: 'basemapGallery',
                    style: "max-height:448px;width:380px;"
                });

                //if a bing maps key is provided - display bing maps too.
                var basemapGallery = new BasemapGallery({
                    showArcGISBasemaps: false,
					basemaps: basemaps, 
                    basemapsGroup: basemapGroup,
                   // bingMapsKey: this.AppConfig.bingmapskey,
                    map: this.map
                }, domConstruct.create('div'));

                cp.set('content', basemapGallery.domNode);
                //Set this dropdownbutton's drop down content
                this.dropDown = cp;

                aspect.after(basemapGallery, "onSelectionChange", lang.hitch(this, function () {
                    //close the basemap window when an item is selected
                    //destroy and recreate the overview map  - so the basemap layer is modified.
                    topic.publish('basemapchanged');
                    registry.byId('basemapBtn').closeDropDown();
                }));
            }
        });
    });