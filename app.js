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

/*
*
 常量	描述
 BMAP_TRANSIT_POLICY_LEAST_TIME	最少时间
 BMAP_TRANSIT_POLICY_LEAST_TRANSFER	最少换乘
 BMAP_TRANSIT_POLICY_LEAST_WALKING	最少步行
 BMAP_TRANSIT_POLICY_AVOID_SUBWAYS	不乘地铁

 * */

//导航
Map.prototype.navigation = function (currentPosition,destinationPosition) {

     //设置 公交路线查询
     var nav = new BMap.TransitRoute(this.map,{
         //呈现结果的选项
         renderOptions:{
             map:this.map,
             panel:"showResult"
         }
     });

    //开始搜索
    nav.search(currentPosition,destinationPosition);
};

//初始化应用程序的方法
function init() {

    //找到HTML中 第一个搜索栏
    var beginView = document.querySelector(".searchView :first-child");
    //找到HTML中 第二个搜索栏
    var endView = document.querySelector(".searchView :nth-child(2)");
    //找到HTML中 搜索按钮
    var searchButton = document.querySelector(".searchView :last-child");

    var map = new Map("mapContainer");
    map.addPanorama();

    //当点击搜索按钮的时候  开始搜索
    searchButton.onclick = function () {
        map.navigation(beginView.value,endView.value);
    };
}

init();