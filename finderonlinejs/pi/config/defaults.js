define({
    //Default configuration settings for the applciation. This is where you"ll define things like a bing maps key,
    //default web map, default app color theme and more. These values can be overwritten by template configuration settings
    //and url parameters.
    "appid": "",
    "webmap": "de7761f47dde42788f8397909f111930",
    "oauthappid": null,
    //Enter the url to the proxy if needed by the applcation. See the "Using the proxy page" help topic for details
    //developers.arcgis.com/en/javascript/jshelp/ags_proxy.html
    "proxyurl": "",
    //Example of a template specific property. If your template had several color schemes
    //you could define the default here and setup configuration settings to allow users to choose a different
    //color theme.
    "title": "FINDER Online Light",
    "summary": "<i>FINDER</i>  Online Light simplifies the way that Maryland's 2800+ tax maps and 2.2 million parcel records are searched and viewed. \
	<br><br>\
	In addition to making planning, environmental, and census data available, <i>FINDER</i> Online Light provides rapid access to comprehensive set of property related information. \
	Users can access information for Parcel, Sale, and CAMA data and locate specific properties by address, zip code, and municipality name. \
	<br><br>For more information on <i>FINDER</i> Online Tax Maps and Parcel Data, go to:\
	<a href='http://www.mdp.state.md.us/OurProducts/PropertyMapProducts/FinderOnlineProduct.shtml' target='_blank'><b>Property Map Products</b></a>\
	<br><br>Link to <a href='https://webapps.mdp.state.md.us/apps/finderOnline/finderonline.html' target='_blank'><i>FINDER</i> Online (Flex Version)</a>\
	<br><br><b>To search for a location</b>, type in the street address number, road name, and city. \
	<br><br><b><u>Please note:</u></b> <b>This site performs best using either <a href='https://www.google.com/chrome/browser/' target='_blank'>Chrome</a> or <a href='http://www.mozilla.org/en-US/firefox/new/' target='_blank'>Firefox</a> browsers.</b>",
	
    "defaultPanel": "layers",
	//diff
    "enableDialogModal": false,
    "dialogModalContent": "",
    "dialogModalTitle": "",
    //diff
	
	"enableSummaryInfo": true,
    "enableLegendPanel": true,
    "enableAboutPanel": true,
    "enableLayersPanel": true,
    "enableHomeButton": true,
    "enableLocateButton": true,
    "enableBasemapToggle": false,
    "enableShareDialog": false,
    "enableBookmarks": false,
    "enableOverviewMap": true,
    "openOverviewMap": false,
    "enableModifiedDate": false,
    "enableViewsCount": false,
    "enableMoreInfo": false,
	"enablePrintButton": false,
	"enableDrawarea":true,
	"enablelabels":true,
	"enabletaxlabels":false,
	"enableMeasure":true,
	"mapcoor":true,
	
	
    "defaultBasemap": "topo",
    "nextBasemap": "hybrid",
    "swipeType": "vertical",
    "swipeInvertPlacement": true,
    "hideNotesLayerPopups": true,
    "enableInstagram": false,
    "instagramVisible": false,
    "instagramTime": "",
    "enableFlickr": false,
    "flickrVisible": false,
    "flickrSearch": "",
    "flickrTime": "",
    "enableTwitter": false,
    "twitterVisible": false,
    "twitterSearch": "",
    "enableWebcams": false,
    "webcamsVisible": false,
    "enableYouTube": false,
    "youtubeVisible": false,
    "youtubeSearch": "",
    "youtubeTime": "all_time", // today, this_week, this_month, all_time
    "bitlyLogin": "esri",
    "bitlyKey": "R_65fd9891cd882e2a96b99d4bda1be00e",
    "twitterUrl": location.protocol + "//utility.arcgis.com/tproxy/proxy/1.1/search/tweets.json",
    "twitterSigninUrl": location.protocol + "//utility.arcgis.com/tproxy/signin",
    "flickr_key": "404ebea7d5bc27aa5251d1207620e99b",
    "webcams_key": "65939add1ebe8bc9cc4180763f5df2ca",
    "instagram_key": "288c36a1a42c49de9a2480a05d054619",
    "youtube_key": "AI39si5AmNrzX3VKNKo4Kcet9BVemrvyjl4B13ezBbNLsvKOlw9Vh3eL_57dZ2vC6M9PwV9i3bHm6emtZLr_BhQ8qtnTbvwzCw",
    /*
    "bannedUsersService": location.protocol + "//services.arcgis.com/QJfoC7c7Z2icolha/ArcGIS/rest/services/fai/FeatureServer/2",
    "bannedWordsService": location.protocol + "//tmservices1.esri.com/ArcGIS/rest/services/SharedTools/Filter/MapServer/1",
    "flagMailServer": location.protocol + "//tmappsevents.esri.com/Website/pim_fai/fai.php",
    */
    //Enter the url to your organizations bing maps key if you want to use bing basemaps
    "bingmapskey": "",
    //Defaults to arcgis.com. Set this value to your portal or organization host name.
    "sharinghost": location.protocol + "//" + "www.arcgis.com",
    //When true the template will query arcgis.com for default settings for helper services, units etc. If you 
    "units": null,
    "helperServices": {
        "geometry": {
            "url": null
        },
        "printTask": {
            "url": null
        },
        "elevationSync": {
            "url": null
        },
        "geocode": [{
            "url": "http://geodata.md.gov/imap/rest/services/GeocodeServices/MD_CompositeLocator/GeocodeServer",
			"singleLineFieldName": "SingleLine",
			"placeholder": "Search for an Address",
			"placefinding": true
           },
		   {  
      "url":"http://geodata.md.gov/imap/rest/services/GeocodeServices/MD_ParcelAccountNumberLocator/GeocodeServer",  
      "singleLineFieldName": "SingleLine",  
      "name": "MD Parcel Account Number Locator",  
      "placefinding":true,  
      "placeholder": "Find Acct ID"  
      }
		   
		   ]
    }
});
