/* This is the place to define your Web Map as a JSON object, if you do not want to do it in ArcGIS Online.
 See the following links for help and examples on defining a Web Map:
 http://help.arcgis.com/en/webapi/javascript/arcgis/jshelp/#intro_webmap
 http://resources.arcgis.com/en/help/arcgis-web-map-json/

 ***
 To enable the ability for users to save or share their map, generate a GUID for the webmap and specify as an "id" property
 in the JSON objects "item" property.

 Can use this website to generate a GUID- http://www.guidgenerator.com/online-guid-generator.aspx

 Also, set an id property for each operational layer, to enable saving and sharing.  The id does not need to be a GUID, just unique.
 ***

 Two properties are required for the web map: "item" and "itemData".  See the first link above for an example

 {
     "item": {
        "id": "5caf4ec5-4d38-42fd-bc94-c7a1a1cf3ddb",
         "title":"Soil Survey Map of USA",
         "snippet": "Detailed description of data",
         "extent": [[-139.4916, 10.7191],[-52.392, 59.5199]]
     },
     "itemData": {
         "operationalLayers": [{
             "url": "http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/Soil_Survey_Map/MapServer",
             "visibility": true,
             "opacity": 0.75,
             "title": "Soil Survey Map",
             "id": "204d94c9b1374de9a21574c9efa31164"
         }],
         "baseMap": {
             "baseMapLayers": [{
                 "opacity": 1,
                 "visibility": true,
                 "url": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer"
             },{
                 "isReference": true,
                 "opacity": 1,
                 "visibility": true,
                 "url": "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer"
             }],
             "title": "World_Terrain_Base"
         },
         "version": "1.1"
     }
 }
 */
{
"item": {
    "id": "5caf4ec5-4d38-42fd-bc94-c7a1a1cf3ddb",
        "title":"Marital Status in San Diego Neighborhoods",
        "snippet": "Detailed description of data",
        "extent": [[-117.45, 32.6],[-116.89, 32.93]]
}, "itemData": {
    "operationalLayers": [{
        "url": "http://servicesbeta.esri.com/ArcGIS/rest/services/SanDiego/Neighborhoods/MapServer/0",
        "id": "Neighborhoods_6067",
        "visibility": true,
        "opacity": 1,
        "mode": 1,
        "title": "Neighborhoods",
        "layerDefinition": {
            "drawingInfo": {"renderer": {
                "type": "simple",
                "symbol": {
                    "color": [
                        108,
                        151,
                        203,
                        0
                    ],
                    "outline": {
                        "color": [
                            108,
                            151,
                            203,
                            255
                        ],
                        "width": 2,
                        "type": "esriSLS",
                        "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                }
            }},
            "minScale": 0,
            "maxScale": 0
        },
        "popupInfo": {
            "title": "{NAME}",
            "fieldInfos": [
                {
                    "fieldName": "FID",
                    "label": "FID",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "Shape",
                    "label": "Shape",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "STATE",
                    "label": "STATE",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "COUNTY",
                    "label": "COUNTY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "CITY",
                    "label": "CITY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "NAME",
                    "label": "NAME",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "REGIONID",
                    "label": "REGIONID",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 2,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "TOTPOP_CY",
                    "label": "TOTPOP_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POPDENS_CY",
                    "label": "POPDENS_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 2,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "AVGFMSZ_CY",
                    "label": "AVGFMSZ_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 2,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "OWNER_CY",
                    "label": "OWNER_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "RENTER_CY",
                    "label": "RENTER_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "VACANT_CY",
                    "label": "VACANT_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POPU5_CY",
                    "label": "POPU5_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP5_CY",
                    "label": "POP5_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP10_CY",
                    "label": "POP10_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP15_CY",
                    "label": "POP15_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP20_CY",
                    "label": "POP20_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP25_CY",
                    "label": "POP25_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP30_CY",
                    "label": "POP30_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP35_CY",
                    "label": "POP35_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP40_CY",
                    "label": "POP40_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP45_CY",
                    "label": "POP45_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP50_CY",
                    "label": "POP50_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP55_CY",
                    "label": "POP55_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP60_CY",
                    "label": "POP60_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP65_CY",
                    "label": "POP65_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP70_CY",
                    "label": "POP70_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP75_CY",
                    "label": "POP75_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP80_CY",
                    "label": "POP80_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "POP85_CY",
                    "label": "POP85_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "MEDAGE_CY",
                    "label": "MEDAGE_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 2,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "MALES_CY",
                    "label": "MALES_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "FEMALES_CY",
                    "label": "FEMALES_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "RACEBASECY",
                    "label": "RACEBASECY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "WHITE_CY",
                    "label": "WHITE_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "BLACK_CY",
                    "label": "BLACK_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "AMERIND_CY",
                    "label": "AMERIND_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "ASIAN_CY",
                    "label": "ASIAN_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "PACIFIC_CY",
                    "label": "PACIFIC_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "OTHRACE_CY",
                    "label": "OTHRACE_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "RACE2UP_CY",
                    "label": "RACE2UP_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HISPPOP_CY",
                    "label": "HISPPOP_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "EDUCBASECY",
                    "label": "EDUCBASECY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "EDLT9_CY",
                    "label": "EDLT9_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "EDSMHS_CY",
                    "label": "EDSMHS_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "EDHSGRD_CY",
                    "label": "EDHSGRD_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "EDCOLL_CY",
                    "label": "EDCOLL_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "EDASSC_CY",
                    "label": "EDASSC_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "EDBACH_CY",
                    "label": "EDBACH_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "EDGRAD_CY",
                    "label": "EDGRAD_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "MARRBASECY",
                    "label": "MARRBASECY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "NEVMARR_CY",
                    "label": "Never married",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": true,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "MARRIED_CY",
                    "label": "Married",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": true,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "WIDOWED_CY",
                    "label": "Widowed",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": true,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "DIVORCD_CY",
                    "label": "Divorced",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": true,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINCBASECY",
                    "label": "HINCBASECY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC0_CY",
                    "label": "HINC0_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC10_CY",
                    "label": "HINC10_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC15_CY",
                    "label": "HINC15_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC20_CY",
                    "label": "HINC20_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC25_CY",
                    "label": "HINC25_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC30_CY",
                    "label": "HINC30_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC35_CY",
                    "label": "HINC35_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC40_CY",
                    "label": "HINC40_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC45_CY",
                    "label": "HINC45_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC50_CY",
                    "label": "HINC50_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC60_CY",
                    "label": "HINC60_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC75_CY",
                    "label": "HINC75_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC100_CY",
                    "label": "HINC100_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC125_CY",
                    "label": "HINC125_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC150_CY",
                    "label": "HINC150_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC200_CY",
                    "label": "HINC200_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC250_CY",
                    "label": "HINC250_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "HINC500_CY",
                    "label": "HINC500_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "MEDHINC_CY",
                    "label": "MEDHINC_CY",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "COUNT",
                    "label": "COUNT",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 2,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "INC_0_20",
                    "label": "INC_0_20",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "INC_20_35",
                    "label": "INC_20_35",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "INC_35_50",
                    "label": "INC_35_50",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "INC_50_75",
                    "label": "INC_50_75",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "INC_75_125",
                    "label": "INC_75_125",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                },
                {
                    "fieldName": "INC_125_UP",
                    "label": "INC_125_UP",
                    "isEditable": false,
                    "tooltip": "",
                    "visible": false,
                    "format": {
                        "places": 0,
                        "digitSeparator": true
                    },
                    "stringFieldOption": "textbox"
                }
            ],
            "description": null,
            "showAttachments": true,
            "mediaInfos": [{
                "title": null,
                "type": "piechart",
                "caption": "",
                "value": {"fields": [
                    "NEVMARR_CY",
                    "MARRIED_CY",
                    "WIDOWED_CY",
                    "DIVORCD_CY"
                ]}
            }]
        }
    }],
        "baseMap": {
        "baseMapLayers": [
            {
                "id": "World_Light_Gray_Base_7605",
                "opacity": 1,
                "visibility": true,
                "url": "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer"
            },
            {
                "id": "World_Light_Gray_Reference_5825",
                "isReference": true,
                "opacity": 1,
                "visibility": true,
                "url": "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer"
            }
        ],
            "title": "Light Gray Canvas"
    },
    "version": "2.3"
}
}