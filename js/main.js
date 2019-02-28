window.onload = function() {
    //Model层
    //5个地标
    let Positons = [{
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

    let markerPosition = {
        //封装地标
        initPosition: function() {
            let markerArray = Positons.map(function(position) {
                return new AMap.Marker(position)
            })
            return markerArray
        }
    }

    //视图层View
    let View = {
        //初始化地标
        init: function() {
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

            // 视图层不直接与模型层交互，通过VM层取得多个点实例组成的数组
            var markerList = ViewModel.markerPosition()

            //遍历点标记添加事件
            markerList.forEach(function(marker) {
                //设置点标记的动画效果
                marker.setAnimation('AMAP_ANIMATION_DROP');
                //设置点标记可点击
                marker.setClickable(true);
                //绑定点击事件
                marker.on('click', function() {
                    console.log('test');
                    //点击后标记跳动
                    marker.setAnimation('AMAP_ANIMATION_BOUNCE');
                });
            });

            map.add(markerList);
        }
    }


    //ViewModel层
    var ViewModel = {
        markerPosition: function() {
            return markerPosition.initPosition()
        },
        initApp: function() {
            //生成地图
            View.init()
        }
    }

    //启动应用交互
    ViewModel.initApp()

    // Activates knockout.js
    //ko.applyBindings(new ViewModel());
};
