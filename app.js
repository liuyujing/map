/**
 * Created by liuyujing on 2017/6/2.
 */

//地图的操作类
function Map(id) {
    this.map = new BMap.Map(id);
    //设置地图的中心点和缩放比例 初始化地图
    this.map.centerAndZoom("北京");

    //更新用户位置信息
    this.updateUserLocation();
}

//添加全景控件
Map.prototype.addPanorama = function () {

    var panorama = new BMap.PanoramaControl();

    this.map.addControl(panorama);
};

//定位
Map.prototype.currentPosition = function () {

    return new Promise(function (success) {

        var loc = new BMap.Geolocation();

        //获得当前的位置信息
        loc.getCurrentPosition(function (result) {

        //    result 获得到的定位之后的结果集

            success(result);
        });

    });

};

//更新用户位置信息
Map.prototype.updateUserLocation = function () {
    //result 定位到的位置信息
    //then这个函数   当success被调用的时候  then里面的函数 立刻调用
    this.currentPosition().then(function (result) {

        //创建 用户显示位置的  视图
        var marker = new BMap.Marker(result.point);

        //添加到地图上
        this.map.addOverlay(marker);

        //重新设置地图的中心点
        this.map.setCenter(result.point);
        
        //设置地图的缩放比例 1-18
        this.map.setZoom(15);
        
        //让地图 移动到 中心点的位置
        this.map.panTo(result.point);
        
    }.bind(this));
};

//初始化应用程序的方法
function init() {
    var map = new Map("mapContainer");
    map.addPanorama();
}

init();