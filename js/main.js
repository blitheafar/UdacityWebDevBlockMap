window.onload = function() {
  // 创建地图对象
  var map = new AMap.Map('container', {
    center: [106.693925,26.532250],
    zoom: 12
  });
  map.plugin(["AMap.ToolBar"], function() {
    // 添加 工具条
    map.addControl(new AMap.ToolBar());
  });


  // 创建一个 Marker 实例：
  var marker1 = new AMap.Marker({
    position: new AMap.LngLat(106.674318,26.619642), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    title: '贵阳北站'
  });

  var marker2 = new AMap.Marker({
    position: [106.673497,26.443794],
    title: '贵州大学'
  });

  var marker3 = new AMap.Marker({
    position: [106.751866,26.546339],
    title: '贵阳市森林公园'
  });

  var marker4 = new AMap.Marker({
    position: [106.802924,26.536693],
    title: '贵阳龙洞堡国际机场'
  });

  var marker5 = new AMap.Marker({
    position: [106.646981,26.535541],
    title: '贵阳阿哈湖国家湿地公园'
  });


  // 多个点实例组成的数组
  var markerList = [marker1, marker2, marker3, marker4, marker5];

  map.add(markerList);
};
