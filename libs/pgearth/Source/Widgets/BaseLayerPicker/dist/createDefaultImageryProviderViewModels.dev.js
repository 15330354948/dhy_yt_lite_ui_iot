"use strict";

define(["../../Core/buildModuleUrl", "../../Scene/ArcGisMapServerImageryProvider", "../../Scene/IonWorldImageryStyle", "../../Scene/createOpenStreetMapImageryProvider", "../../Scene/createTileMapServiceImageryProvider", "../../Scene/createWorldImagery", "../../Scene/IonImageryProvider", "../../Scene/MapboxImageryProvider", "../../Scene/WebMapTileServiceImageryProvider", "../../Scene/UrlTemplateImageryProvider", "../BaseLayerPicker/ProviderViewModel"], function (t, r, a, n, i, o, s, l, c, p, m) {
  "use strict";

  return function () {
    var e = [];
    return e.push(new m({
      name: "谷歌影像",
      iconUrl: t("Widgets/Images/ImageryProviders/googleYX.png"),
      tooltip: "谷歌",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return new p({
          url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
        });
      }
    })), e.push(new m({
      name: "天地图全球影像",
      iconUrl: t("Widgets/Images/ImageryProviders/tiandituYX.jpg"),
      tooltip: "天地图，影像底图，经纬度，WMTS",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return new c({
          url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1d109683f4d84198e37a38c442d68311",
          layer: "tdtAnnoLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible"
        });
      }
    })), e.push(new m({
      name: "天地图电子地图",
      iconUrl: t("Widgets/Images/ImageryProviders/tiandituDZ.jpg"),
      tooltip: "天地图，影像底图，经纬度，WMTS",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return new c({
          url: "http://t0.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1d109683f4d84198e37a38c442d68311",
          layer: "tdtAnnoLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible"
        });
      }
    })), e.push(new m({
      name: "天地图矢量标注",
      iconUrl: t("Widgets/Images/ImageryProviders/tiandituBZ.jpg"),
      tooltip: "天地图，矢量中文注记，球面墨卡托，WMTS",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return new c({
          url: "http://t0.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=1d109683f4d84198e37a38c442d68311",
          layer: "tdtAnnoLayer",
          style: "default",
          format: "image/jpeg",
          tileMatrixSetID: "GoogleMapsCompatible"
        });
      }
    })), e.push(new m({
      name: "Bing Maps Aerial",
      iconUrl: t("Widgets/Images/ImageryProviders/bingAerial.png"),
      tooltip: "Bing Maps aerial imagery, provided by PGEarth ion",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return o({
          style: a.AERIAL
        });
      }
    })), e.push(new m({
      name: "Bing Maps Aerial with Labels",
      iconUrl: t("Widgets/Images/ImageryProviders/bingAerialLabels.png"),
      tooltip: "Bing Maps aerial imagery with labels, provided by PGEarth ion",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return o({
          style: a.AERIAL_WITH_LABELS
        });
      }
    })), e.push(new m({
      name: "Bing Maps Roads",
      iconUrl: t("Widgets/Images/ImageryProviders/bingRoads.png"),
      tooltip: "Bing Maps standard road maps, provided by PGEarth ion",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return o({
          style: a.ROAD
        });
      }
    })), e.push(new m({
      name: "Mapbox Satellite",
      tooltip: "Mapbox satellite imagery https://www.mapbox.com/maps/",
      iconUrl: t("Widgets/Images/ImageryProviders/mapboxSatellite.png"),
      category: "Other",
      creationFunction: function creationFunction() {
        return new l({
          mapId: "mapbox.satellite"
        });
      }
    })), e.push(new m({
      name: "Mapbox Streets",
      tooltip: "Mapbox streets imagery https://www.mapbox.com/maps/",
      iconUrl: t("Widgets/Images/ImageryProviders/mapboxTerrain.png"),
      category: "Other",
      creationFunction: function creationFunction() {
        return new l({
          mapId: "mapbox.streets"
        });
      }
    })), e.push(new m({
      name: "Mapbox Streets Classic",
      tooltip: "Mapbox streets basic imagery https://www.mapbox.com/maps/",
      iconUrl: t("Widgets/Images/ImageryProviders/mapboxStreets.png"),
      category: "Other",
      creationFunction: function creationFunction() {
        return new l({
          mapId: "mapbox.streets-basic"
        });
      }
    })), e.push(new m({
      name: "ESRI World Imagery",
      iconUrl: t("Widgets/Images/ImageryProviders/esriWorldImagery.png"),
      tooltip: "World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution satellite imagery worldwide.  The map includes NASA Blue Marble: Next Generation 500m resolution imagery at small scales (above 1:1,000,000), i-cubed 15m eSAT imagery at medium-to-large scales (down to 1:70,000) for the world, and USGS 15m Landsat imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in parts of Western Europe from DigitalGlobe. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, i-cubed Nationwide Prime, Getmapping, AeroGRID, IGN Spain, and IGP Portugal.  Additionally, imagery at different resolutions has been contributed by the GIS User Community.\nhttp://www.esri.com",
      category: "Other",
      creationFunction: function creationFunction() {
        return new r({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
          enablePickFeatures: !1
        });
      }
    })), e.push(new m({
      name: "ESRI World Street Map",
      iconUrl: t("Widgets/Images/ImageryProviders/esriWorldStreetMap.png"),
      tooltip: "This worldwide street map presents highway-level data for the world. Street-level data includes the United States; much of Canada; Japan; most countries in Europe; Australia and New Zealand; India; parts of South America including Argentina, Brazil, Chile, Colombia, and Venezuela; Ghana; and parts of southern Africa including Botswana, Lesotho, Namibia, South Africa, and Swaziland.\nhttp://www.esri.com",
      category: "Other",
      creationFunction: function creationFunction() {
        return new r({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
          enablePickFeatures: !1
        });
      }
    })), e.push(new m({
      name: "ESRI National Geographic",
      iconUrl: t("Widgets/Images/ImageryProviders/esriNationalGeographic.png"),
      tooltip: "This web map contains the National Geographic World Map service. This map service is designed to be used as a general reference map for informational and educational purposes as well as a basemap by GIS professionals and other users for creating web maps and web mapping applications.\nhttp://www.esri.com",
      category: "Other",
      creationFunction: function creationFunction() {
        return new r({
          url: "https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/",
          enablePickFeatures: !1
        });
      }
    })), e.push(new m({
      name: "Open­Street­Map",
      iconUrl: t("Widgets/Images/ImageryProviders/openStreetMap.png"),
      tooltip: "OpenStreetMap (OSM) is a collaborative project to create a free editable map of the world.\nhttp://www.openstreetmap.org",
      category: "Other",
      creationFunction: function creationFunction() {
        return n({
          url: "https://a.tile.openstreetmap.org/"
        });
      }
    })), e.push(new m({
      name: "Stamen Watercolor",
      iconUrl: t("Widgets/Images/ImageryProviders/stamenWatercolor.png"),
      tooltip: "Reminiscent of hand drawn maps, Stamen watercolor maps apply raster effect area washes and organic edges over a paper texture to add warm pop to any map.\nhttp://maps.stamen.com",
      category: "Other",
      creationFunction: function creationFunction() {
        return n({
          url: "https://stamen-tiles.a.ssl.fastly.net/watercolor/",
          credit: "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA."
        });
      }
    })), e.push(new m({
      name: "Stamen Toner",
      iconUrl: t("Widgets/Images/ImageryProviders/stamenToner.png"),
      tooltip: "A high contrast black and white map.\nhttp://maps.stamen.com",
      category: "Other",
      creationFunction: function creationFunction() {
        return n({
          url: "https://stamen-tiles.a.ssl.fastly.net/toner/",
          credit: "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA."
        });
      }
    })), e.push(new m({
      name: "Sentinel-2",
      iconUrl: t("Widgets/Images/ImageryProviders/sentinel-2.png"),
      tooltip: "Sentinel-2 cloudless by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2016 and 2017).",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return new s({
          assetId: 3954
        });
      }
    })), e.push(new m({
      name: "Blue Marble",
      iconUrl: t("Widgets/Images/ImageryProviders/blueMarble.png"),
      tooltip: "Blue Marble Next Generation July, 2004 imagery from NASA.",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return new s({
          assetId: 3845
        });
      }
    })), e.push(new m({
      name: "Earth at night",
      iconUrl: t("Widgets/Images/ImageryProviders/earthAtNight.png"),
      tooltip: "The Earth at night, also known as The Black Marble, is a 500 meter resolution global composite imagery layer released by NASA.",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return new s({
          assetId: 3812
        });
      }
    })), e.push(new m({
      name: "Natural Earth II",
      iconUrl: t("Widgets/Images/ImageryProviders/naturalEarthII.png"),
      tooltip: "Natural Earth II, darkened for contrast.\nhttp://www.naturalearthdata.com/",
      category: "PGEarth ion",
      creationFunction: function creationFunction() {
        return i({
          url: t("Assets/Textures/NaturalEarthII")
        });
      }
    })), e;
  };
});