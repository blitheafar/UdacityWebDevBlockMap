function initMap() {
  // 创建地图对象
  var map = new AMap.Map('container', {
    center: [116.397428, 39.90923],
    zoom: 11
  });
  map.plugin(["AMap.ToolBar"], function() {
    // 添加 工具条
    map.addControl(new AMap.ToolBar());
  });
}
