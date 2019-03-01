window.onload = function() {
    //Model层
    //5个地标
    var Positions = [{
        position: new AMap.LngLat(106.674318, 26.619642), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: '贵阳北站'
    }, {
        position: [106.673497, 26.443794],
        title: '贵州大学'
    }, {
        position: [106.751866, 26.546339],
        title: '贵阳市森林公园'
    }, {
        position: [106.802924, 26.536693],
        title: '贵阳龙洞堡国际机场'
    }, {
        position: [106.646981, 26.535541],
        title: '贵阳阿哈湖国家湿地公园'
    }];

    var markerPosition = function(position) {
        //封装地标
        //给观察对象提供地点名
        this.positionName = ko.observable(position.title)
        this.marker = ko.observable(new AMap.Marker(position))
    }


    //ViewModel层
    function ViewModel() {
        // 创建地图对象
        var map = new AMap.Map('container', {
            mapStyle: 'amap://styles/whitesmoke', //设置地图的显示样式
            center: [106.693925, 26.532250],
            zoom: 12,
        });
        map.plugin(["AMap.ToolBar"], function() {
            // 添加 工具条
            map.addControl(new AMap.ToolBar());
        });

        let self = this
        // this.positionList = ko.observableArray(Positions);
        // 初始化一个空数组,catList为观察者
        this.positionList = ko.observableArray([]);
        //遍历所有猫，并添加到catList数组，给单个猫各类属性添加计算监控对象
        Positions.forEach(function(item) {
            //向catList观察者数组内添加对象
            self.positionList.push(new markerPosition(item));
        });

        //遍历点标记添加事件
        let positionList = this.positionList()
        let markerList = []
        positionList.forEach(function(item) {
            // 取得地标对象内marker
            let marker = item.marker()
            // console.log(item.positionName());
            //生成单独的marker数组
            markerList.push(marker)
            //设置点标记的动画效果
            marker.setAnimation('AMAP_ANIMATION_DROP');
            //设置点标记可点击
            marker.setClickable(true);
            //绑定点击事件
            marker.on('click', function() {
                // console.log(marker);
                //移除其他跳动
                self.removeAnimation();

                //设置当前标记跳动
                marker.setAnimation('AMAP_ANIMATION_BOUNCE');
            });
        });
        //将5个地标添加进地图
        map.add(markerList);


        //列表点击监听,click对象参数默认为当前模型层对象,当前指的是搜索列表中的一个地点对象
        this.listPositionClick = function(position) {
            //移除其他跳动
            self.removeAnimation();

            let marker = position.marker()
            // console.log(position.positionName());
            //console.log(marker);
            //跳动当前地点
            marker.setMap(map);
            // 设置点标记的动画效果，此处为弹跳效果
            marker.setAnimation('AMAP_ANIMATION_BOUNCE');
        }

        //移除所有跳动
        this.removeAnimation=function() {
            positionList.forEach(function(item) {
                item.marker().setAnimation('AMAP_ANIMATION_NONE')
            })
        }
    }

    // Activates knockout.js
    ko.applyBindings(new ViewModel());
};
