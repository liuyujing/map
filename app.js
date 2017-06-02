/**
 * Created by liuyujing on 2017/6/2.
 */

//地图的操作类
function Map(id) {
    this.map = new BMap.Map(id);
    //设置地图的中心点和缩放比例 初始化地图
    this.map.centerAndZoom("北京");
}

Map.prototype.addPanorama = function () {

    var panorama = new BMap.PanoramaControl();

    this.map.addControl(panorama);
};


//初始化应用程序的方法
function init() {
    var map = new Map("mapContainer");
    map.addPanorama();
}

init();